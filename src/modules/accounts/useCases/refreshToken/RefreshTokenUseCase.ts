import { verify } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";
import auth from "../../../../config/auth";
import { UsersTokens } from "../../entities/UsersTokens";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { IUsersTokensRepository } from "../../repositories/IUsersTokensRepository";

@injectable()
class RefreshTokenUseCase {

    constructor(
        @inject("UsersTokensRepository")
        private usersTokensRepository: IUsersTokensRepository,
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) {

    }

    async execute(refresh_token: string): Promise<UsersTokens> {

        const refreshTokenExists = await this.usersTokensRepository.findByRefreshToken(refresh_token)

        if (!refreshTokenExists) {
            throw new Error("Invalid refresh token")
        }

        try {

            verify(refresh_token, auth.secret_refresh_token)

        } catch (error) {
            throw new Error("Invalid token. Please Log-in again. 400")
        }

        //verificar se o token foi usado ou invalido
        //se sim, 
        //invalida todos os tokens da mesma familia
        //desloga usuario (user tem que logar dnv para gerar um novo token de outra familia)


        //se nao
        //marcar rf token como usado
        //e cria outro rf token da mesma familia
        //e retorna





        return
    }

}