// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const { id } = req.query;
  console.log(id);
  const data = await prisma.root_of_equation.findMany({
    where : {
      id : Number(id)
    }
  });
  console.log(data);
  return res.status(200).json({ data : data });
}
