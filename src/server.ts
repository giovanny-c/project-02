import "reflect-metadata"
import express from "express"


import { accountRoutes } from "./routes/account.routes"


import "./database"
import "./shared/container"

const app = express()

app.use(express.json())

app.use(accountRoutes)

app.listen(3333, () => console.log("Server runing on port 3333"))

