import { token } from "morgan";
import { response } from "../helpers/response.js";
import { userModel } from "../models/user.model.js";
import bcrypt from "bcryptjs"
import { createAccessToken } from "../helpers/jwt.js";


const profileCrtl = {};

profileCrtl.profile = async (req, res) => {
    try {
        const userFound = await userModel.findById(req.user.id)

    if(!userFound){
        return response(res, 400, false, "", "usuario no encontrado")
    }


    return res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email
    });



    } 
    catch (error) {
        return response(res, 500, false, "", error.message);
    }
};
export default profileCrtl;