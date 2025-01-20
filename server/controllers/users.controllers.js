import Users from "../models/users.model.js";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


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

export const login = async (req , res) => {
  const { email , password } = req.body;
  
  if(!email || !password){
    return res.status(400).json({
      success: false,
      message: "Please fill all the fields"
    });
  }
  
  try{
    const user = await Users.findOne({ email });
    
    if(!user){
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }
    
    const isPasswordCorrect = await bcrypt.compare(password , user.password);
    
    if(!isPasswordCorrect){
      return res.status(401).json({
        success: false,
        message: "Invalid Credentials"
      });
    }
    
    const token = jwt.sign({
      email: user.email,
      id: user._id
    } , process.env.JWT_SECRET , {
      expiresIn: "12h"
    })
    
    res.status(200).json({
      success: true,
      message: "Login Successful",
      data: {
        username: user.username
      },
      token: token
    });
  }catch{
    console.log("Error during Login: " + err.message);
    res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
}