import { Repository } from "typeorm";
import { dataSource } from "../../../../database";
import { ICreateUserTokenDTO } from "../../dtos/ICreateUserTokenDTO";
import { UsersTokens } from "../../entities/UsersTokens";
import { IUsersTokensRepository } from "../IUsersTokensRepository";

class UsersTokensRepository implements IUsersTokensRepository {

    private repository: Repository<UsersTokens>

    constructor() {
        this.repository = dataSource.getRepository(UsersTokens)
    }


    async create({ expires_date, refresh_token, user_id, is_valid, was_used, token_family }: ICreateUserTokenDTO): Promise<UsersTokens> {
        const userToken = this.repository.create({
            expires_date,
            refresh_token,
            user_id,
            is_valid,
            was_used,
            token_family
        })

        await this.repository.save(userToken)

        return userToken
    }
    async findByUserIdAndRefreshToken({ user_id, refresh_token }: ICreateUserTokenDTO): Promise<UsersTokens> {

        const userToken = await this.repository.findOne({
            where: { user_id, refresh_token }
        })

        return userToken
    }

    async findByRefreshToken(refresh_token: string): Promise<UsersTokens> {

        const userToken = await this.repository.findOne({ where: { refresh_token } })

        return userToken

    }
    async deleteById(id: string): Promise<void> {
        await this.repository.delete(id)
    }

    async deleteByUserId(user_id: string): Promise<void> {
        await this.repository.delete(user_id)
    }

    async setTokenAsInvalidAndUsed(id: string): Promise<void> {

        const token = this.repository.create({
            id,
            is_valid: false,
            was_used: true
        })

        await this.repository.save(token)
    }

    async setTokenFamilyAsInvalid(uuid: string): Promise<void> {

        const tokens = await this.repository.find(
            {
                where: [
                    { token_family: uuid },
                    // OR
                    { user_id: uuid }
                ]
            })


        tokens.forEach(token => {
            token.is_valid = false
        });

        console.log(tokens)

        await this.repository.save(tokens)
    }

}

export { UsersTokensRepository }