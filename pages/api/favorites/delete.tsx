import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const body = JSON.parse(req.body);
  try {
    const favorite = await prisma.favorite.delete({
      where: {
        name: body.name,
      }
    });

    res.status(200).json(favorite);
  } catch (e: any){
    if (e instanceof PrismaClientKnownRequestError && e.code === "P2025") {
      res.status(200).json({message: "not_found"});
    }

    res.status(500).end();
  } 
}