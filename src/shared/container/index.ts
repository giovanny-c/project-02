import { container } from "tsyringe";

import "./providers/index"

import { UsersRepository } from "../../modules/accounts/repositories/implementations/UsersRepository";
import { IUsersRepository } from "../../modules/accounts/repositories/IUsersRepository";


container.registerSingleton<IUsersRepository>(
    "UsersRepository",
    UsersRepository
)