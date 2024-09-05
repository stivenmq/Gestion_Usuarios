import { token } from "morgan";
import { response } from "../helpers/response.js";
import { userModel } from "../models/user.model.js";
import bcrypt from "bcryptjs"
import { createAccessToken } from "../helpers/jwt.js";



const userCrtl = {};

userCrtl.Listar = async (req, res) => {
        try {
            const usuario = await userModel.find({}).select('username email')
            return response(res, 200, true, usuario, "lista de usuarios");
        } 
        catch (error) {
            return response(res, 500, false, "", error.message);
        }  
    };


userCrtl.registro = async (req, res) => {
    const {email, password, username} =  req.body;
    try {
        const passwordHash = await bcrypt.hash(password, 10);
        
        const newUser = new userModel({
            username,
            email,
            password: passwordHash,
        });
        
        const userSaved = await newUser.save()
        const token = await createAccessToken({id: userSaved._id});   
            res.cookie("token", token)
            res.json({
                message: "usuario creado"
            });
         
    } 
    catch (error) {
        return response (res, 500, false, "", error.message);
    }


};
userCrtl.delete = async (req, res) =>{
    try {
        const { email } = req.params
        const usuario = await userModel.findOneAndDelete({email});
            if(!usuario) {
            return response(res, 404, false, "", " usuario no encontrado ");
              }

        await usuario.deleteOne();
        return response(res, 200, true, "", " usuario eliminado ");
    } 
    catch (error) {
        return response(res, 500, false, "", error.message)
    }
};



export default userCrtl;



