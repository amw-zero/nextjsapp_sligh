import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await prisma.favorite.deleteMany({});
  await prisma.counter.deleteMany({});

  res.status(200).end();
}