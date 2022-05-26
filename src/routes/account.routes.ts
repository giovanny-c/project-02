
import Router from "express";
import { CreateUserController } from "../modules/accounts/useCases/createUser/CreateUserController";
import { SignInController } from "../modules/accounts/useCases/signIn/SignInController";

const accountRoutes = Router()

const createUserController = new CreateUserController()
const signInController = new SignInController()

accountRoutes.post("/sign-in", createUserController.handle)
accountRoutes.get("/sign-in", signInController.handle)
//accountRoutes.post("/confirmation", )

// accountRoutes.post("/log-in", (request, response) => {
//     return response.json("hello")
// })


export { accountRoutes }