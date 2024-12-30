import Users from "../models/users.model.js";
import mongoose from "mongoose";
import bcrypt from "bcrypt";


//signup function
export const signup = async (req , res) => {
    const { username , email , password } = req.body;
    

    //checking if all fields are present
    if(!username || !email || !password){
        return res.status(400).json({
            success: false,
            message: "Please fill all the fields"
        });
    }

    try {

        //checking for existing user
        const existingUser = await Users.findOne({email});
        if(existingUser){
            return res.status(409).json({
                success: false,
                message: "User already exists"
            });
        }


        //check for existing username
        const existingUsername = await Users.findOne({username});

        if(existingUsername){
            return res.status(409).json({
                success: false,
                message: "Username already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password , 12); //hashing password

        //creating new user
        const newUser = new Users({
            username,
            email,
            password: hashedPassword
        });

        await newUser.save();

        res.status(201).json({
            success: true,
            message: "Signup Successful. Please Login",
            data: {
                username: username
            }
        })

    } catch (err) {
        console.log("Error during Signup: " + err.message);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}