// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const {id}  = req.query;
  console.log(`id = ${id}`);

  try {
    const data = await prisma.regression.findMany({
      where: {
        id : Number(id)
      }
    });  
    console.log(data);
	  return res.status(200).json({ data : data });
  } catch(e) {
    console.log(e);
    return res.status(400).json({ data : "error there is no list"});    
  }
}
