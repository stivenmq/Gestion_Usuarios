import { token } from "morgan";
import { response } from "../helpers/response.js";
import { userModel } from "../models/user.model.js";
import bcrypt from "bcryptjs"
import { createAccessToken } from "../helpers/jwt.js";


const loginCrtl = {};


loginCrtl.login = async (req, res) => {
    const {email, password} =  req.body;
    try {

        const userFound = await userModel.findOne({ email });
        if(!userFound){
            return response(res, 400, false, "", "usuario no encontrado");
        }
        const ismatch = await bcrypt.compare(password, userFound.password);
        if(!ismatch){
            return response(res, 400, false, "", "clave incorrecta");
        }
        
        const token = await createAccessToken({id: userFound._id});   
            res.cookie("token", token)
            res.json({
                message: "Bienvenido"
            });
         
    } 
    catch (error) {
        return response(res, 500, false, "", error.message);
    }
};
export default loginCrtl;