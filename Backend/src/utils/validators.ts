import { body, ValidationChain, validationResult } from "express-validator";
import {Request,Response,NextFunction} from 'express';


export const validate = (validations:ValidationChain[])=>{
    return async (req:Request,res:Response,next:NextFunction)=>{
        for(let validation of validations){
            const result = await validation.run(req);
            if(!result.isEmpty()) break;
        }
        const errors = validationResult(req);
        if(errors.isEmpty()){
            return next();
        }
        return res.status(422).json({errors:errors.array()});
    }
} 
//validationResult() and ValidationChain[] are the functions predefined in express-validator package.

export const loginValidator = [
    body("email").trim().isEmail().withMessage("Email is Required"),
    body("password").trim().isLength({min: 6}).withMessage("Password must atleast 6 characters ")
];


export const signupValidator = [
    body("name").notEmpty().withMessage("Name is Required"),
    body("email").trim().isEmail().withMessage("Invalid Email"),
    body("password").trim().isLength({ min: 6 }).withMessage("Password must be atleast 6 characters")
]

