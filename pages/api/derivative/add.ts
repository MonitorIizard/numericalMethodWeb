// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const data = JSON.parse(req.body);
  
  const equation = data.equation;
  const xToFind = Number(data.xToFind);
  const derivativeOrder = data.derivativeOrder;
  const direction = data.direction;
  const accuracy = data.accuracy;
  const stepSize = Number(data.stepSize);
  const errorValue = Number(data.errorValue);
  const estimateAnswer = Number(data.calAnswer);
  const exactFunc = data.exactFunc;
  const realValue = Number(data.realValue);
  const type = data.type;

  console.log(data);

	const selectData = await prisma.derivative.findMany({
		where : {
      equation : equation,
      xToFind : Number(xToFind),
      derivativeOrder : derivativeOrder,
      direction : direction,
      stepSize : stepSize,
      accuracy : accuracy,
      error : errorValue,
      calAnswer : estimateAnswer,
      derivativeEquation : exactFunc,
      realAnswer : realValue,
      type : type
		}
	})

  const selDataL = selectData.length;

  if ( selDataL > 0 ) { return res.status(400).json({ data : "already have this data" }); }

  try {
    await prisma.derivative.create({
    data : {
      equation : equation,
      derivativeEquation : exactFunc,
      xToFind : xToFind,
      derivativeOrder : derivativeOrder,
      direction : direction,
      accuracy : accuracy,
      stepSize : stepSize,
      error : errorValue,
      calAnswer : estimateAnswer,
      realAnswer : realValue,
      type : type
      }
    })
    console.log("write record success");
    
  } catch (error) {
    console.log(error);
    return res.status(400).json({ data : "error" });
  }
  
	return res.status(200).json({ data : "ok" });
}
