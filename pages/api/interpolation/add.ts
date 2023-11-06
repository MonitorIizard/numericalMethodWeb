// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const data = JSON.parse(req.body);
  
  const inpX = data.x;
  const inpY = data.y;
  const xFind = data.xToFind;
  const type = data.type;
  const answer = data.answer;

  console.log(`data in add :`);
  console.log(data);

  if ( data.answer == null || data.answer == undefined || data.answer == "" ) { return res.status(400).json({ data : "no answer" }); }

	const selectData = await prisma.interpolation.findMany({
		where : {
       numberOfPoint : data.numberOfPoint,
       xToFind : xFind,
      type : type,
		}
	})

  const selDataL = selectData.length;

  for(let i = 0; i < selDataL; i++) {
    const selData = selectData[i];
    const selX = selData.x;
    const selY = selData.y;
    const selXfind = selData.xToFind;
    const selAns = selData.answer;
    if (JSON.stringify(inpX) == JSON.stringify(selX) && JSON.stringify(inpY) == JSON.stringify(selY) && xFind.toFixed(4) == selXfind.toFixed(4) && selAns.toFixed(4) == answer.toFixed(4)) {
      return res.status(200).json({ data : "duplicate no add" });
    }
  }

  console.log(`data : ${data}`);
  try {
    await prisma.interpolation.create({
    data : {
      numberOfPoint : data.numberOfPoint,
      x : inpX,
      y : inpY,
      xToFind : Number(xFind.toFixed(4)),
      answer : Number(answer.toFixed(4)),
      graph : data.graph,
      type : data.type,
    }
  })
  } catch (error) {
    console.log(error);
    return res.status(400).json({ data : "error" });
  }
  
	return res.status(200).json({ data : "ok" });
}
