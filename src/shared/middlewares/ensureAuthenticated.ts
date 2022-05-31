import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import auth from "../../config/auth";
import { TokenExpiredError } from "jsonwebtoken";


//para tratar o erro
const catchError = (err, res) => {
    if (err instanceof TokenExpiredError) { //se o token tiver expirado

        //throw new Error("")
        return res.status(401).redirect("/refresh-token")
    }
    //outro tipo de error
    return res.status(401).send({ message: "Unauthorized!" });
}

export async function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
    //se o token tiver expirado fazer logica do refresh token
    const authHeader = req.headers.authorization
    //como pegar os tokens?


    // const t = req.headers['x-access-token']//?['refresh_token']

    // console.log(t)



    if (!authHeader) {
        throw new Error("Token missing")
    }

    const [, token] = authHeader.split(" ")
    //separar os tokens com espaço

    verify(token, auth.secret_token, (err, decoded) => {

        if (err) {
            return catchError(err, res)
        }

        req.user = {
            id: decoded.sub as string
        }

        next()
    })






}