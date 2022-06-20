import { NextFunction, Request, Response } from "express";
import { JwtPayload, verify } from "jsonwebtoken";

import auth from "../../config/auth";
import { errorHandler } from "../errors/ErrorHandler";


export async function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
    //se o token tiver expirado fazer logica do refresh token
    const authHeader = req.headers.authorization

    //como pegar os tokens?
    // const url = `${req.protocol}://${req.headers.host}${req.originalUrl}`

    // const t = req.headers['x-access-token']//?['refresh_token']

    if (!authHeader) {
        throw new Error("Token missing")
    }

    const [, token] = authHeader.split(" ")
    //separar os tokens com espaço

    verify(token, auth.secret_token, (err, decoded: string | JwtPayload) => {

        if (err) {

            //ver se vai chamar o middleware de errorHandler
            throw err
        }

        req.user = {
            id: decoded.sub as string
        }


        next()
    })






}