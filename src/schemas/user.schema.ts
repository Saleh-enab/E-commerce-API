import { z } from 'zod'

export const zodUserSchema = z.object({
    body: z.object({
        email: z.string().email("Invalid Email"),
        name: z.string(),
        password: z.string().min(6, "Password must be more than 6 characters"),
        passwordConfirmation: z.string()
    }).refine((data) => data.password === data.passwordConfirmation, {
        message: "Passwords doesn't match",
        path: ["confirmation password"]
    })
})