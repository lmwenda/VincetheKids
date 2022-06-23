import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import ValidateUser from '../../../utils/AuthenticateUser';

type Data = {
  message: string,
  payload: {
    user: {}
  }
}

const prisma = new PrismaClient();

export default async function handler( req: NextApiRequest, res: NextApiResponse<Data> )
{
  if(req.method === "POST") {
    const { email, password } = req.body;
    const { error } = ValidateUser(req.body);
    if(error) return res.status(400).json({ message: error.details[0].message, payload: { user: {} } });

    const _user = await prisma.user.findUnique(
      {
        where:
        {
          email: email,
        }
      }
   );
    if (_user) return res.status(400).json({ message: "Email already used...", payload: { user: {} } })

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await prisma.user.create({
        data:{
          email: email,
          password: hashedPassword
        }
    })
    res.json({ message: "Successfully Created a new user...", payload: { user }})
  }
}
