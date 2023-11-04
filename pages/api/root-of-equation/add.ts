// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// main()
//   .then(async () => {
//     await prisma.$disconnect()
//   })
//   .catch(async (e) => {
//     console.error(e)
//     await prisma.$disconnect()
//     process.exit(1)
//   })

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {

	const data = req.body;

	const checkDuplicate = await prisma.root_of_equation.findMany({
		where : {
			equation : data.equation,
			answer : data.answer,
			type : data.type,
			x_end : data.x_end,
			tolerance : data.tolerance,
			isOpenMethod : data.isOpenMethod
		}
	})

	if ( checkDuplicate.length == 0 ) {
		await prisma.root_of_equation.create({
			data : {
				equation : data.equation,
				answer : data.answer,
				graph : JSON.parse(data.graph),
				type : data.type,
				x_start : JSON.parse(data.x_start),
				x_end : data.x_end,
				result : JSON.parse(data.result),
				tolerance : data.tolerance,
				isOpenMethod : data.isOpenMethod
			}
		})
	}
		// console.log(typeof JSON.parse(data.graph));
		
	return res.status(200).json({ data : "ok" });
}
