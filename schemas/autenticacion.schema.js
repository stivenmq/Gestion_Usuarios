import {z} from "zod"

export const registroSchema = z.object({
    username: z.string({
        required_error: "Username es requerido"
    }),
    email: z.string({
        required_error: "Email es requerido"
    })
    .email({
        message: "Email invalido"
    }),
    password: z.string({
        required_error: "Password es requeridad"
    })
    .min(6,{
        message: "Password debe ser minimo de 6 caracteres"
    }),
});


export const loginSchema = z.object({
    email: z.string({
        required_error: "Email es requerido"
    })
    .email({
        message: "Email invalido"
    }),
    password: z.string({
        required_error: "Password es requeridad"
    })
    .min(6,{
        message: "Password debe ser minimo de 6 caracteres"
    }),
});