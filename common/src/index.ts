import {z} from 'zod'

export const signupZodSchema = z.object({
    name:z.string(),
    username:z.string().email(),
    password:z.string().min(8)
})

export const signinZodSchema = z.object({
    username:z.string().email(),
    password:z.string().min(8)
})

export const blogPostZodSchema = z.object({
    title:z.string(),
    content:z.string()
}) 

export const blogUpdateZodSchema = z.object({
    id:z.number(),
    title:z.string(),
    content:z.string()
})

export type signInType = z.infer<typeof signinZodSchema>

export type signUpType = z.infer<typeof signupZodSchema>

export type blogPostType = z.infer<typeof blogPostZodSchema>

export type blogUpdateType = z.infer<typeof blogUpdateZodSchema>
