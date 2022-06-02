import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { IUsersTokensRepository } from "../../repositories/IUsersTokensRepository";
import { verify } from "jsonwebtoken";
import auth from "../../../../config/auth";


@injectable()
class LogOutUseCase {

    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository,
        @inject("UsersTokensRepository")
        private usersTokensRepository: IUsersTokensRepository
    ) {

    }

    async execute(user_id: string): Promise<void> {

        await this.usersTokensRepository.setTokenFamilyAsInvalid(user_id)


    }


}

export { LogOutUseCase }