import { z } from 'zod'

export const zodSessionSchema = z.object({
    body: z.object({
        email: z.string().email("Invalid Email"),
        password: z.string()
    })
})