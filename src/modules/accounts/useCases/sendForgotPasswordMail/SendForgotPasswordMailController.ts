import { Request, Response } from "express";
import { container } from "tsyringe";
import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";


class SendForgotPasswordMailController {


    async handle(req: Request, res: Response): Promise<Response> {

        const { email } = req.body

        const sendForgotPasswordMail = container.resolve(SendForgotPasswordMailUseCase)

        await sendForgotPasswordMail.execute(email)

        return res.status(200).send()

    }
}

export { SendForgotPasswordMailController }