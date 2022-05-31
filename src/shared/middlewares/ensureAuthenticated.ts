import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { userInfo } from "os";
import auth from "../../config/auth";
import { dataSource } from "../../database";


interface IPayload {
    sub: string
    exp: number
}

export async function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
    //se o token tiver expirado fazer logica do refresh token
    const authHeader = req.headers.authorization
    //como pegar os tokens?

    const t = req.headers['x-access-token']//?['refresh_token']

    console.log(t)



    if (!authHeader) {
        throw new Error("Token missing")
    }

    const [, token, /*refresh_token*/] = authHeader.split(" ")
    //separar os tokens com espaço

    try {
        const { sub: user_id } = verify(
            token,
            auth.secret_token, //palavra-chave

        ) as IPayload

        req.user = {
            id: user_id
        }

        // verify(
        //     refresh_token,
        //     auth.secret_refresh_token
        // )
        //logica do refresh token aqui


    } catch (error) {
        throw new Error("Invalid token, 400")
    }



    //next()



}