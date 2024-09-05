import jwt from "jsonwebtoken"
import { TOKEN_SECRET } from "../config.js";
import { response } from "express";


export const autenticacionRequeridad = (req, res, next) => {
    const {token} = req.cookies;
    
    if(!token){
        return response(res, 401, false, "", " no token, autorizacion denegada");
    }
    jwt.verify(token,TOKEN_SECRET, (err, user) => {
        if(err){
            return response(res, 401, false, "", "el token no es valido");
        }
        req.user = user
        
        next();
    })
   

};