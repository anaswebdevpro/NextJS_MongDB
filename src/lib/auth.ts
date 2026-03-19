/* eslint-disable prefer-const */
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connectDb from "./db";
import User from "@/model/user.model";
import bcrypt from "bcryptjs";



const authOptions:NextAuthOptions = {
    providers:[
        CredentialsProvider({
            name:"credentials",
            credentials:{
                email:{label:"email",type:"text"},
                password:{label:"password",type:"password"}
            },
            async authorize(credentials, req) {
                let email = credentials?.email
                let password = credentials?.password
                if(!email || !password){
                   throw new Error("Email and password are required")
                }

                await connectDb()
                let user = await User.findOne({email})

                if(!user){
                    throw new Error("User not found")
                }

               const isMatch = await bcrypt.compare(password, user.password)

                if(!isMatch){
                    throw new Error("Invalid password")
                }
                return {id:user._id.toString(),
                    name:user.name,
                    email:user.email,
                    image:user.image}
                
            },
        })
       
    ], 
    callbacks:{ 
      async jwt(token,user) {
        if(user){
            token.id = user.id
                token.name = user.name
                token.email = user.email
                token.image = user.image
        }
          return token
      },

    },
    session:({session,token}){
        if(session.user){
            session.user.id = token.id
            session.user.name = token.name
            session.user.email = token.email
            session.user.image = token.image
        }
    }
    pages:{ 

    },
    secret="asdfasdfsdf", 


    
}

export default authOptions;



//flow for sign in with credentials provider
//1. user submits email and password
//2. next auth calls the authorize function with the credentials
//3. authorize function checks the credentials against the database
//4. if the credentials are valid, return the user object
//5. if the credentials are invalid, return null

//email- password 
//check -email exists in database
//if email exists, check if password is correct
//if password is correct, return user object
//if password is incorrect, return null