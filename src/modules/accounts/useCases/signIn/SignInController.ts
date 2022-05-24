import { Request, Response } from "express";


class SignInController {

    async handle(req: Request, res: Response): Promise<any> {


        return res.status(200).render("accounts/signIn")
    }

}

export { SignInController }