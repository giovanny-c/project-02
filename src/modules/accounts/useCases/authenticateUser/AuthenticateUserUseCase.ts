import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";
import auth from "../../../../config/auth";
import { IDateProvider } from "../../../../shared/container/providers/dateProvider/IDateProvider";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { IUsersTokensRepository } from "../../repositories/IUsersTokensRepository";
import { v4 as uuidV4 } from "uuid"

interface IResponse {
    user: {
        email: string
    }
    token: string
    refresh_token: string

}

@injectable()
class AuthenticateUserUseCase {

    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository,
        @inject("UsersTokensRepository")
        private usersTokensRepository: IUsersTokensRepository,
        @inject("DayjsDateProvider")
        private DateProvider: IDateProvider
    ) {

    }

    async execute(email: string, password: string): Promise<IResponse> {

        const user = await this.usersRepository.findByEmail(email)

        const { expires_refresh_token_days, secret_refresh_token, expires_in_refresh_token, secret_token, expires_in_token } = auth

        if (!user) {
            throw new Error("email or password incorrect")
        }

        const passwordMatch = await compare(password, user.password)

        if (!passwordMatch) {
            throw new Error("email or password incorrect")
        }


        await this.usersRepository.markUserAsLogged(user.id)

        //deleta todos os tokens de outros logins
        await this.usersTokensRepository.deleteByUserId(user.id)

        //bearer token/ id token
        const token = sign({ email }, secret_token, {
            subject: user.id,
            expiresIn: expires_in_token
        })

        //refresh token
        const refresh_token = sign({}, secret_refresh_token, {
            subject: user.id,
            expiresIn: expires_in_refresh_token
        })

        //cria a familia do refresh token
        const token_family = uuidV4()

        const refresh_token_expires_date = this.DateProvider.addOrSubtractTime("add", "day", expires_refresh_token_days)

        await this.usersTokensRepository.create({
            refresh_token: refresh_token,
            expires_date: refresh_token_expires_date, //30d
            user_id: user.id,
            is_valid: true,
            was_used: false,
            token_family
        })


        const tokenReturn: IResponse = {

            user: {
                email
            },
            token,
            refresh_token
        }

        return tokenReturn

    }

}

export { AuthenticateUserUseCase }