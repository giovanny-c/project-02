import { container } from "tsyringe";
import { Request, Response } from "express";
import { CreateUserUseCase } from "./CreateUserUseCase";


class CreateUserController {

    async handle(req: Request, res: Response): Promise<Response> {

        const { name, email, password } = req.body

        const createUser = container.resolve(CreateUserUseCase)

        createUser.execute({ name, email, password })

        return res.status(200).send()
    }


}

export { CreateUserController }