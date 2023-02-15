
    import type { NextApiRequest, NextApiResponse } from 'next'

    import prisma from '../../../lib/prisma';
    
    export default async function handler(
      req: NextApiRequest,
      res: NextApiResponse,
    
    ) {
        let obj;
        if (req.method === "POST") {
            let list={};
           if(req.body.type){
            list = {
                type: req.body.type,
            }
           }
           if(req.body.roomCount){
             list = Object.assign(list, {roomCount : req.body.roomCount});
           }
           if(req.body.cityId){
             list = Object.assign(list, {cityId : req.body.cityId});
           }
           if(req.body.cityAreaId){
             list = Object.assign(list, {cityAreaId : req.body.cityAreaId});
           }
           if(req.body.meter){
             list = Object.assign(list, {meter :  req.body.meter});
           }
           if(req.body.assignmentType){
             list = Object.assign(list, {assignmentType: req.body.assignmentType});
           }

             obj = await prisma.realEstate.findMany({
                // where:{
                    // city :      req.body.city,
                    // cityArea : req.body.cityArea,
                    // type:       req.body.type,
                    // roomCount : req.body.roomCount,
                    // meter :     req.body.meter,
                    // assignmentType: req.body.assignmentType,
                    // price: req.body.price,
                 
                // },
                where:list
            })
          }
     
        res.status(200).json(obj);
    }
    