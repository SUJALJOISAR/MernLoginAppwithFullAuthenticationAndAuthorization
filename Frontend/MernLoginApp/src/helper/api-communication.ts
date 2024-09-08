import axios from "axios";
import { auth } from "../firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

export const loginUser = async(email:string,password:string)=>{
    try {
        const res=await axios.post("/login",{email,password});
        if(res.status!==200){
            throw new Error("Failed to login");
        }
        return res.data;
    } catch (error) {
        console.log("Login error:",error);
        throw error;
    }
}


export const registerUser = async (name:string,email:string,password:string)=>{
    try {
        // Register in Firebase
        const firebaseUser = await createUserWithEmailAndPassword(auth, email, password);

        const res=await axios.post("/register",{name,email,password,firebaseId: firebaseUser.user.uid, });// Store Firebase UID in MongoDB
        if(res.status!== 200){
            throw new Error("Failed to Register");
        }
        return {firebaseUser, data:res.data };
    } catch (error) {
    console.error("Login error:", error);
    throw error; // Re-throw error to be caught in the calling function
    }
}