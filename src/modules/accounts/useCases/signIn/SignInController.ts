import { Request, Response } from "express";


class SignInController {

    handle(req: Request, res: Response): any {

        return res.render("views/accounts/signIn.njk")
    }

}

export { SignInController }