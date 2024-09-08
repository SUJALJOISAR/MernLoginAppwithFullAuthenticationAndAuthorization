import UserModel from "../models/UserModel";
import {compare, hash} from 'bcrypt';
import { createToken } from "../utils/token-manager";
import {COOKIE_NAME} from '../utils/constants';

export const getAllUsers = async (req,res) =>{
    try{
        //get all users
        const users = await UserModel.find({});
        return res.status(200).json({msg:"Users Fetched Successfully",users});
    }catch(error){
        return res.status(400).json({msg:"Some Error Occured in Fetching Users",error});
    }
}
//http:localhost:5000/api/users to get all the users

export const userSignup = async (req, res) => {
    try {
        console.log("Signup function called");
        const { name, email, password } = req.body;
        console.log("Request body:", req.body);

        console.log("Checking for existing user...");
        const existingUser = await UserModel.findOne({ $or: [{ name }, { email }] });
        console.log("Existing user:", existingUser);

        if (existingUser) {
            console.log("User already exists");
            return res.status(400).json({ msg: "User with this name or email already exists" });
        }
        console.log("No existing user found");

        const hashedPassword = await hash(password, 10);
        const newUser = new UserModel({ name, email, password: hashedPassword });
        await newUser.save();
        console.log("New user saved:", newUser);

        // Clear any existing cookies
        res.clearCookie(COOKIE_NAME, {
            path: "/",
            httpOnly: true,
            sameSite: 'None',
            secure: true,
            signed: true,
        });

        // Create and store token
        const token = createToken(newUser._id.toString(), newUser.email, "7d");
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);

        // Send the token as a cookie
        res.cookie(COOKIE_NAME, token, {
            path: "/",
            expires,
            httpOnly: true,
            secure: true,
            sameSite: 'None',
            signed: true,
        });

        console.log("User signed up successfully");
        return res.status(200).json({
            msg: "User SignedUp Successfully!!",
            name: newUser.name,
            email: newUser.email,
            id: newUser._id.toString()
        });
    } catch (error) {
        console.error("Error during user signup:", error);
        return res.status(500).json({ msg: "Some error occurred during user signup", error });
    }
};


export const userLogin = async (req,res)=>{
    try {
        // Destructure name, email, and password from the request body
        const { email, password } = req.body;  
        const User = await UserModel.findOne({email});
        if(!User){
          return res.status(400).json({msg:"No User Exists"});
        }
          const isPasswordCorrect = await compare(password,User.password);
          if(!isPasswordCorrect){
              return res.status(400).json({msg:"Password is Incorrect"});
          }
  
          res.clearCookie(COOKIE_NAME,{
              path:"/",
              httpOnly:true,
              sameSite: 'None',
              secure:true,
              signed:true,
          });
  
          const token= createToken(User._id.toString(),User.email , "7d");
          const expires = new Date();//current date  
          expires.setDate(expires.getDate() + 7);
          res.cookie(COOKIE_NAME,token,{ //to send the cookie from backend to frontend we use "cookie-parser "package
              path:"/", //inside the root directory cookies will store
              expires,
              httpOnly:true,
              sameSite:'None',
              secure:true,
              signed:true,
          })
          
           return res.status(200).json({msg:"User loggedIn Successfully!!",name:User.name,email:User.email,id:User._id.toString()});
      } catch (error) {
        return res.status(500).json({ msg: "Some error occurred during user signup", error });
      }
}

// export const verifyUser = async(req,res) =>{
//     try {
//         const User = await UserModel.findById(res.locals.jwtData.id);
//         if(!User){
//             return res.status(400).json({msg:"User Not Found"});
//         }
//         if(User._id.toString() !== res.locals.jwtData.id){
//             return res.status(400).json({msg:"User Not Authenticated"});
//         }
//         return res.status(200).json({msg:"User loggedIn Successfully!!",name:User.name,email:User.email,id:User._id.toString()});
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({ msg: "Some error occurred during user signup", error });
//     }
// }