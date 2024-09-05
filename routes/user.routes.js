import { Router } from "express";
import userCrtl from "../controllers/user.controller.js"
import loginCrtl from "../controllers/login.controller.js";
import { autenticacionRequeridad } from "../middlewares/validate.token.js";
import profileCrtl from "../controllers/profile.controller.js";
import {validacionSchema} from "../middlewares/validacion.middleware.js";
import {registroSchema,loginSchema} from "../schemas/autenticacion.schema.js";

const route = Router();



route.post("/registro", validacionSchema(registroSchema),userCrtl.registro)
route.post("/login", validacionSchema(loginSchema),loginCrtl.login)
route.get("/profile",autenticacionRequeridad,profileCrtl.profile)
route.get("/",userCrtl.Listar)
route.delete("/:email",userCrtl.delete)


export default route;