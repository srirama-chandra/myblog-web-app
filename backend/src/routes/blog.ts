import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { verify } from 'hono/jwt';
import { blogPostZodSchema , blogUpdateZodSchema } from '@sriramachandra/medium-common';


export const blogRouter = new Hono<{
    Bindings:{
        DATABASE_URL:string,
        JWT_SECRET:string
    },
    Variables:{
        userId:number
    }
}>();

blogRouter.use('/*',async (c,next)=>{

    const token = c.req.header("authorization") || "";

    try{
        
        const response =await verify(token,c.env.JWT_SECRET);

        c.set("userId",Number(response.userId));

        await next();
    }
    catch(e)
    {
        c.status(403);
        return c.json({msg:"Authentication Failed"});
    }
})

blogRouter.post('/', async (c) => {

    const prisma = new PrismaClient({
      datasourceUrl:c.env.DATABASE_URL
    }).$extends(withAccelerate());

    const body = await c.req.json();
    
    const { success } = blogPostZodSchema.safeParse(body);

    if(!success)
    {
      c.status(400);
      return c.json({msg:"Invalid Input"});
    }

    const authorId = c.get('userId');

    try {
      const response = await prisma.blog.create({
        data:{
          authorId:authorId,
          title:body.title,
          content:body.content
        }
      });
    
      return c.json({msg:`Post Created Successfully With Id - ${response.id}`});
      
    }
    catch(e)
    {
      c.status(500);
      return c.json({msg:"Something Went Wrong"});
    }
  })
  
blogRouter.put('/', async (c) => {
  
    const prisma = new PrismaClient({
      datasourceUrl:c.env.DATABASE_URL
    }).$extends(withAccelerate());
  
    const body = await c.req.json();
  
    const { success } = blogUpdateZodSchema.safeParse(body);

    if(!success)
    {
      c.status(400);
      return c.json({msg:"Invalid Input"});
    }

    try{
      const response = await prisma.blog.update({
      where:{
        id:body.id
      },
      data:{
        title:body.title,
        content:body.content
      }
    })
  
    return c.json({msg:`Updated Blog With Id - ${response.id}`});
    }
    catch(e)
    {
      c.status(500);
      return c.json({msg:"Something Went Wrong"});
    }
  })

blogRouter.get('/myblogs', async (c) => {
  
    const prisma = new PrismaClient({
      datasourceUrl:c.env.DATABASE_URL
    }).$extends(withAccelerate());
    
    try{
      const posts =await prisma.blog.findMany({
        where:{
          author:{
            id:Number(c.get("userId"))
          }
        },
        select:{
          author:{
            select:{
              name:true
            }
          },
          id:true,
          title:true,
          content:true,
          published:true,
          authorId:true,
          publishedDate:true
        }
      });
    
      return c.json({posts});
    }
    catch(e)
    {
      c.status(500);
      return c.json({msg:"Something Went Wrong"});
    }
  
})
 
blogRouter.get('/bulk', async (c) => {
  
    const prisma = new PrismaClient({
      datasourceUrl:c.env.DATABASE_URL
    }).$extends(withAccelerate());
    
    try{

      const posts = await prisma.blog.findMany({
        where:{
          author:{
            id:{
              not:Number(c.get("userId"))
            }
          }
        },
        select:{
          author:{
            select:{
              name:true
            }
          },
          id:true,
          title:true,
          content:true,
          published:true,
          authorId:true,
          publishedDate:true
        }
      });
    
      return c.json({posts});
    }
    catch(e)
    {
      c.status(500);
      return c.json({msg:"Something Went Wrong"});
    }
  
  })



blogRouter.get('/:id', async (c) => {
  
    const id = Number(c.req.param("id"));
  
    const prisma = new PrismaClient({
      datasourceUrl:c.env.DATABASE_URL
    }).$extends(withAccelerate());
  
    try{
    
      const post = await prisma.blog.findFirst({
        where:{
            id:id
        },
        select:{
          author:{
            select:{
              name:true
            }
          },
          id:true,
          title:true,
          content:true,
          published:true,
          authorId:true
        }
      })
  
    return c.json({post});
    }
    catch(e)
    {
      c.status(500);
      return c.json({msg:"Something Went Wrong"});
    }
  })
