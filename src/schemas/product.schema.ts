import { z } from 'zod'

export const zodProductSchema = z.object({
    body: z.object({
        title: z.string(),
        category: z.string(),
        description: z.string(),
        price: z.number().gt(0),
        image: z.string()
    })
})