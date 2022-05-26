import { inject, injectable } from "tsyringe";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { hash } from "bcryptjs";
import { IMailProvider } from "../../../../shared/container/providers/mailProvider/IMailProvider";
import { IUsersTokensRepository } from "../../repositories/IUsersTokensRepository";

import { resolve } from "path";
import { v4 as uuidV4 } from "uuid"
import { IDateProvider } from "../../../../shared/container/providers/dateProvider/IDateProvider";

@injectable()
class CreateUserUseCase {

    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository,
        @inject("MailProvider")
        private mailProvider: IMailProvider,
        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider,
        @inject("UsersTokensRepository")
        private usersTokensRepository: IUsersTokensRepository
    ) {

    }


    async execute({ name, email, password }: ICreateUserDTO): Promise<void> {
        //pegar os dados por form no front (multer e erc)
        //hash de senha 
        try {
            const UserExists = await this.usersRepository.findByEmail(email)

            if (UserExists) {
                throw new Error("This user already exists")//fazer middleware de error
            }

            const passwordHash = await hash(password, 8)

            await this.usersRepository.create({ name, email, password: passwordHash })

        } catch (error) {
            throw new Error("There was not possible to create a user, please try again. If the error persists contact the suport")
        }

        //envia link de confirmação de email (logar o user no usecase de confirmaçao)

        const user = await this.usersRepository.findByEmail(email)

        const templatePath = resolve(__dirname, "..", "..", "..", "..", "..", "views", "accounts", "emails", "confirmateRegister.hbs")
        const token = uuidV4()

        const expires_date = this.dateProvider.addOrSubtractTime("add", "hours", 3)

        await this.usersTokensRepository.create({
            refresh_token: token,
            user_id: user.id,
            expires_date
        })

        const variables = {
            name: user.name,
            link: `${process.env.CONFIRMATION_MAIL_URL}${token}`
        }

        await this.mailProvider.sendMail(
            user.email,
            "Confirmação de cadastro",
            variables,
            templatePath
        )

    }

}

export { CreateUserUseCase }