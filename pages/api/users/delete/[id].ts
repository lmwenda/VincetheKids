import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

type Data = {
  message: string,
  payload: {
    user: {} | null
  }
}

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>){
  if(req.method === "DELETE"){
    const { id } = req.query;
    const deleteUser = await prisma.user.delete({
        where: {
          id: Number(id) 
        },
    });

    res.json({ message: "Successfully Deleted your Account", payload: { user: deleteUser } })
  }
}
