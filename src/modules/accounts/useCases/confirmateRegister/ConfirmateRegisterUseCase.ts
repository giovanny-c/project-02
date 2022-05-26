import { inject, injectable } from "tsyringe";


import { IUsersTokensRepository } from "../../../../modules/accounts/repositories/IUsersTokensRepository"
import { IDateProvider } from "../../../../shared/container/providers/dateProvider/IDateProvider";
import { UsersRepository } from "../../repositories/implementations/UsersRepository";




@injectable()
class ConfirmateRegisterUseCase {

    constructor(
        @inject("UsersTokensRepository")
        private usersTokensRepository: IUsersTokensRepository,
        @inject("UsersRepository")
        private usersRepository: UsersRepository,
        @inject("DayjsDateProvider")
        private DateProvider: IDateProvider
    ) {

    }

    async execute(confirmationToken: string): Promise<void> {

        const token = await this.usersTokensRepository.findByRefreshToken(confirmationToken)

        if (!token) {
            throw new Error("Invalid Token")
        }

        //se a data de expiração 
        if (this.DateProvider.compareIfBefore(token.expires_date, this.DateProvider.dateNow())) {
            throw new Error("Token expired")
        }

        const user = await this.usersRepository.findById(token.user_id)

        user.is_confirmed = true

        const teste = await this.usersRepository.create(user)
        console.log(teste)

        await this.usersTokensRepository.deleteById(token.id)

    }

}

export { ConfirmateRegisterUseCase }