import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import auth from "../../config/auth";
import { TokenExpiredError } from "jsonwebtoken";


//para tratar o erro
const catchError = (err, res, refresh_token) => {
    if (err instanceof TokenExpiredError) { //se o token tiver expirado

        //throw new Error("")
        return res.status(400).send({ message: "token expired (go to /refresh-token), Please Log-in again" })
    }
    //outro tipo de error
    return res.status(400).redirect("/accounst/log-in");
}

export async function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
    //se o token tiver expirado fazer logica do refresh token
    const authHeader = req.headers.authorization


    //como pegar os tokens?
    const url = `${req.protocol}://${req.headers.host}${req.originalUrl}`

    // const t = req.headers['x-access-token']//?['refresh_token']

    console.log(url)



    if (!authHeader) {
        throw new Error("Token missing")
    }

    const [, token] = authHeader.split(" ")
    //separar os tokens com espaço

    verify(token, auth.secret_token, (err, decoded) => {

        if (err) {
            const refresh_token = "1232"
            return catchError(err, res, refresh_token)
        }

        req.user = {
            id: decoded.sub as string
        }

        next()
    })






}