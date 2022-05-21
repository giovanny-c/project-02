
import Router from "express";
import { CreateUserController } from "../modules/accounts/useCases/createUser/CreateUserController";

const accountRoutes = Router()

const createUserController = new CreateUserController()

accountRoutes.post("/sign-in", createUserController.handle)
accountRoutes.post("/log-in", (request, response) => {
    return response.json("hello")
})


export { accountRoutes }