
import Router from "express";

import { CreateUserController } from "../modules/accounts/useCases/createUser/CreateUserController";
import { SignInController } from "../modules/accounts/useCases/signIn/SignInController";
import { ConfirmateRegisterController } from "../modules/accounts/useCases/confirmateRegister/ConfirmateRegisterController"
import { AuthenticateUserController } from "../modules/accounts/useCases/authenticateUser/AuthenticateUserController";
import { GetProfileController } from "../modules/accounts/useCases/getProfile/GetProfileController";

import { ensureAuthenticated } from "../shared/middlewares/ensureAuthenticated";
import { RefreshTokenController } from "../modules/accounts/useCases/refreshToken/RefreshTokenController";
import { LogOutController } from "../modules/accounts/useCases/logout/LogOutController";

const accountRoutes = Router()

const createUserController = new CreateUserController()
const signInController = new SignInController()
const confirmateRegisterController = new ConfirmateRegisterController()
const authenticateUserController = new AuthenticateUserController()
const getProfileController = new GetProfileController()
const refreshTokenController = new RefreshTokenController()
const logOutController = new LogOutController()

accountRoutes.post("/sign-in", createUserController.handle)
accountRoutes.get("/sign-in", signInController.handle)
accountRoutes.post("/confirmation", confirmateRegisterController.handle)

//se der problema com sendMail pode ser por causa do // baseUrl: (no tsconfig)

accountRoutes.post("/log-in", authenticateUserController.handle)
accountRoutes.post("/refresh-token", refreshTokenController.handle)

accountRoutes.get("/profile", ensureAuthenticated, getProfileController.handle)

accountRoutes.post("/log-out", ensureAuthenticated, logOutController.handle)

// como passar o bearer token automaticamente para todas as rotas
//como mandar do ensureAuthenticated para /refresh-token?
export { accountRoutes }