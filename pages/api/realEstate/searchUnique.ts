
import type { NextApiRequest, NextApiResponse } from 'next'

import prisma from '../../../lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,

) {

    // const user = await prisma.agentInterface.findMany({
    //     where: {
    //       agencyId : req.body.agencyId
    //     },
    //     select:{
    //       userId: true,
    
    //     }
    //   });
  
    //   let userAgency = new Array();
    //   user.forEach(function (value, i) {
    //     userAgency.push(value.userId) 
        
    //   });
  
    //   userAgency.push(req.body.agencyManagerId) 
   
  
    //   const userReal = await prisma.realEstate.findMany({
    //     where : {
    //       userId: {
    //         in: userAgency
    //       }
    //     },
    //       select: {
    //         id: true,
    //         name: true,
    //         phoneNumber: true,
    //         description: true,
    //         roomCount: true,
    //         meter: true,
    //         estateImage: true,
    //         assignmentType: true,
    //         type: true,
    //         price: true,
    //         latitude: true,
    //         longitude: true,
    //         createdAt: true,
    //         isActive: true,
    //         AdStatus: true,
    //         cityArea: {
    //           select: {
    //             name: true,
    //           },
    //         },
    //         city: {
    //           select: {
    //             name: true,
    //           },
    //         },
    //         agency: {
    //           select: {
    //             name: true,
    //             agencyImage: true,
    //           },
    //         },
    //       },
    //       orderBy: {
    //         createdAt: "desc",
    //       },
    
    //     });




    let obj;
    if (req.method === "POST") {

        const user = await prisma.agentInterface.findMany({
            where: {
              agencyId : req.body.agencyId
            },
            select:{
              userId: true,
        
            }
          });
      
          let userAgency = new Array();
          user.forEach(function (value, i) {
            userAgency.push(value.userId) 
            
          });
      
          userAgency.push(req.body.agencyManagerId) 
       

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

       list = Object.assign(list, {   userId: {
        in: userAgency
      }});

         obj = await prisma.realEstate.findMany({
            where:list,
            select: {
                id: true,
                name: true,
                phoneNumber: true,
                description: true,
                roomCount: true,
                meter: true,
                estateImage: true,
                assignmentType: true,
                type: true,
                price: true,
                latitude: true,
                longitude: true,
                createdAt: true,
                isActive: true,
                AdStatus: true,
                cityArea: {
                  select: {
                    name: true,
                  },
                },
                city: {
                  select: {
                    name: true,
                  },
                },
                agency: {
                  select: {
                    name: true,
                    agencyImage: true,
                  },
                },
              },
              orderBy: {
                createdAt: "desc",
              },
        
        })
      }
 
    res.status(200).json(obj);
}
