import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt'
import { signupZodSchema, signinZodSchema} from '@sriramachandra/medium-common'

export const userRouter = new Hono<{
    Bindings:{
        DATABASE_URL:string,
        JWT_SECRET:string,
    }
}>();

userRouter.post('/signup', async (c) => {

    const prisma = new PrismaClient({
      datasourceUrl:c.env.DATABASE_URL
    }).$extends(withAccelerate());
  
    const body = await c.req.json();

    const {success} =signupZodSchema.safeParse(body);

    if(!success)
    {
      c.status(400);
      return c.json({msg:"Invalid Input"});
    }

    try{
      
      const isUserPresent = await prisma.user.findFirst({
        where:{
          username:body.username
        }
      })

      if(isUserPresent)
      {
         c.status(400);
         return c.json({msg:"User Already Exists"})
      }

      const response =await prisma.user.create({
        data:{
          name:body.name,
          username:body.username,
          password:body.password,
        }
      })
    
      const token = await sign({userId:response.id},c.env.JWT_SECRET);

      return c.json({token,});
      
    }
    catch(e)
    {
      c.status(500);
      return c.json({msg:"Something Went Wrong!! Please Try Again Later"});
    }
  
  })
  
userRouter.post('/signin', async (c) => {
  
    const prisma = new PrismaClient({
      datasourceUrl:c.env.DATABASE_URL
    }).$extends(withAccelerate());
  
  
    const body = await c.req.json();

    const { success } = signinZodSchema.safeParse(body);

    if(!success)
    {
      c.status(400);
      return c.json({msg:"Invalid Input"});
    }
  
    try {
      const user = await prisma.user.findFirst({
      where:{
        username:body.username,
        password:body.password
      }
    });
  
    if(!user)
    {
      const user = await prisma.user.findFirst({
        where:{
          username:body.username,
        }
      });
      if(user)
      {
        c.status(400);
        return c.json({"msg":"Incorrect Password"})
      }
      c.status(400);

      return c.json({msg:"User Not Found"});
    }
  
    const token = await sign({userId:user.id},c.env.JWT_SECRET);
    
    return c.json({token,});
  
    }
    catch(e)
    {
      c.status(500);
      return c.json({msg:"Internal Error"});
    }
  
  })
