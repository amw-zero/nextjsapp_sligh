import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const counters = await prisma.counter.findMany();
    res.status(200).json(counters);
  } catch (e) {
    console.log(e);
    res.status(500).end();
  }
}