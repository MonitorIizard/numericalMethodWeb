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

type Data = {
	name: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	const linearData = await prisma.root_of_equation.findMany();
	console.log(linearData);
	res.status(200).json({ name: 'John Doe' });
}
