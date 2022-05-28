import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { userInfo } from "os";
import auth from "../../config/auth";


interface IPayload {
    sub: string
}

export async function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
    //se o token tiver expirado fazer logica do refresh token
    const authHeader = req.headers.authorization

    console.log(authHeader)

    if (!authHeader) {
        throw new Error("Token missing")
    }

    const [, token] = authHeader.split(" ")

    try {
        const { sub: user_id } = verify(
            token,
            auth.secret_token //palavra-chave
        ) as IPayload

        req.user = {
            id: user_id
        }


        next()
    } catch (error) {
        throw new Error("Invalid token, 400")
    }




}