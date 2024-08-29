import { z } from 'zod'

export const zodCategotySchema = z.object({
    body: z.object({
        title: z.string()
    })
})