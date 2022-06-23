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
    if(req.method === "GET"){
        const { id } = req.query;
        const user = await prisma.user.findUnique({
            where: {
              id: Number(id)
            }
        })

        res.json({ message: "Retrieved your account details...", payload: { user: user } })
    }
}
