import type { NextFunction , Request , Response } from "express";
import jwt from "jsonwebtoken"
import userModel from "../models/userModel.ts";
import type{ ExtendRequest } from "../types/extendedRequest.ts";



const validateJWT=(req:ExtendRequest ,res:Response ,next:NextFunction)=>{

    const authorizationHeader=req.get('authorization')
    if(!authorizationHeader){
        res.status(403).send('authorization header is not provided')
        return
    }
    const token=authorizationHeader.split(" ")[1]

    if(!token){
        res.status(403).send('bearer token not found')
        return
    }

    jwt.verify( token ,process.env.JWT_SECRET || '',async(err , payload)=>{
        if(err){
            res.status(403).send('invalid token')
            return
        }
        if(!payload){
            res.send(403).send('invalid token payload')
            return

        }
        const userpayload=payload as {email:string ,firstname:string , lastname:string}
        //fetch user from database based on the payload
        const user=await userModel.findOne({email:userpayload.email})

         req.user=user

        next()



    })
}
export default validateJWT