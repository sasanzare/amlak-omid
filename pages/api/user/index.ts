
   
    import type { NextApiRequest, NextApiResponse } from 'next'

    import prisma from '../../../lib/prisma';
    const jwt = require('jsonwebtoken');
    
 
    export default async function handler(
      req: NextApiRequest,
      res: NextApiResponse,
    
    ) {
        if(req.method === "GET"){
            get(req,res)
        }
        else if (req.method === "POST"){
             upsert(req,res)
        }   
        else if (req.method === "DELETE"){
              remove(req,res)
        }else{
            throw new Error(
                `The HTTP ${req.method} method is not supported at this route.`
              )
        }
    }
    //schema.definitions[table].properties[current]
    async  function get(req,res) {
            let obj = await prisma.user.findMany({
                where: {
                    firstName : { contains : req.query.firstName },
lastName : { contains : req.query.lastName },
name : { contains : req.query.name },
email : { contains : req.query.email },
phoneNumber : { contains : req.query.phoneNumber },
nationalCode : { equals : req.query.nationalCode },
address : { contains : req.query.address },
role : { equals : req.query.role },
isActive : { equals : req.query.isActive },

                },
                // orderBy: [
                //     {
                //         createdAt: req.query.dateSort , //'desc',
                //     },
                    
                //   ],
                skip: 0,
                take: 20,
              });
            res.status(200).json(obj);
    }

    async function upsert(req,res) {
        let id = req.body.id || '';
        delete req.body.id;
        let obj = await prisma.user.upsert({
            where: {
              id,
            },
            update: {
                ...req.body
            },
            create: {
                ...req.body
            },
        });
          res.status(200).json(obj);
    }

    async function remove(req,res) {
        let obj = await prisma.user.delete({ where: { id:req.query.id } });
        res.status(200).json(obj);
    }
    