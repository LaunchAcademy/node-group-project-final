import express from "express"
import clientRouter from "./clientRouter.js"
import petTypesRouter from "./api/v1/petTypesRouter.js"

const rootRouter = new express.Router()

rootRouter.use("/", clientRouter)
rootRouter.use("/api/v1/pet-types", petTypesRouter)

export default rootRouter
