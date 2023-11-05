// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const data = JSON.parse(req.body);
  
  const inpA = [...data.matrixA];
  const inpB =  [...data.matrixB];
  const inpX = [...data.matrixX];
  console.log( data );

	const selectData = await prisma.linear_algebra.findMany({
		where : {
      dimension : data.dimension,
      error_criteria : data.error || null,
      type : data.type
		}
	})

  const selDataL = selectData.length;

  for(let i = 0; i < selDataL; i++) {
    const selData = selectData[i];
    const selA = selData.matrixA;
    const selB = selData.matrixB;
    const selX = selData.matrixX;
    if (JSON.stringify(inpA) == JSON.stringify(selA) && JSON.stringify(inpB) == JSON.stringify(selB) && JSON.stringify(inpX) == JSON.stringify(selX) && data.errorCriteria == selData.error_criteria) {
      return res.status(200).json({ data : "duplicate" });
    }
  }


  try {
    console.log(data.errorCriteria);
    await prisma.linear_algebra.create({
    data : {
      dimension : data.dimension,
      matrixA : data.matrixA,
      matrixB : data.matrixB,
      matrixX : data.matrixX,
      error_criteria : data.errorCriteria || null,
      result : data.result,
      type : data.type,
    }
  })
  } catch (error) {
    console.log(error);
    return res.status(400).json({ data : "error" });
  }
  
	return res.status(200).json({ data : "ok" });
}
