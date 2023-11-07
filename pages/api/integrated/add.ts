// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const data = JSON.parse(req.body);
  
  const equation = data.equation;
  const xStart = data.x_start;
  const xEnd = data.x_end;
  const n = data.n;
  const realAnswer = data.realAnswer;
  const calAnswer = data.calAnswer;
  const error = data.error;

  if ( data.calAnswer == null || data.calAnswer == undefined || data.calAnswer == "" ) { 
    console.log("no calAnswer"); 
    return res.status(400).json({ data : "no answer" }); 
  }

	const selectData = await prisma.integrated.findMany({
		where : {
       equation : equation,
       x_start : Number(xStart),
      x_end : Number(xEnd),
      n : n,
      realAnswer : Number(realAnswer),
      calAnswer : Number(calAnswer),
      error : error,
		}
	})

  const selDataL = selectData.length;

  if ( selDataL > 0 ) { return res.status(400).json({ data : "already have this data" }); }

  try {
    const type = req.query.type as string;
    await prisma.integrated.create({
    data : {
      equation : data.equation,
      x_start : data.x_start,
      x_end : data.x_end,
      n : data.n,
      realAnswer : data.realAnswer,
      calAnswer : data.calAnswer[0],
      error : data.error,
      graph : data.graph,
      type : data.type
      }
    })
    console.log("write record success");
    
  } catch (error) {
    console.log(error);
    return res.status(400).json({ data : "error" });
  }
  
	return res.status(200).json({ data : "ok" });
}
