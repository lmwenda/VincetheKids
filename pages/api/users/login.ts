import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

type Data = {
  message: string,
  payload: {
    jwt_token: string | null
    user: {} 
  }
}

const prisma = new PrismaClient();

export default async function handler ( req: NextApiRequest, res: NextApiResponse<Data> ) {
  if(req.method === "POST"){
    const { email, password } = req.body;


    // CHECK IF EMAIL IS VALID 
    const _user = await prisma.user.findUnique(
      { 
        where: { 
          email: email 
        }
      }
    );
    if(!_user) return res.status(400).json(
      {
        message: "Invalid Email or Password", 
        payload: {
          jwt_token: null,
          user: {}
        } 
      }
    );
    
    // CHECK IF PASSWORD IS VALID

    const validPassword = bcrypt.compare(password, _user.password);
    if(!validPassword) return res.status(400).json(
      {
        message: "Invalid Email or Password", 
        payload:  {
          jwt_token: null,
          user: {}
        }
      }
    );

    // EVERTHING THING IS CORRECT AND SIGNS THE USER IN

    const token = jwt.sign({ _id: _user.id }, String(process.env.SECRET_TOKEN));
    res.json(
      {
        message: "Succesfully Signed into your Account...", 
        payload: {
          jwt_token: token,
          user: _user
        }
      }
    );
    res.setHeader("vtc-token", token);
  }
}
