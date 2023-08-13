import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma';
import { Counter } from '@prisma/client';

interface DBState {
  counters?: Counter[];
  favorites?: string[];
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const dbState: DBState = JSON.parse(req.body);
  if (dbState.counters) {
    await prisma.counter.createMany({
      data: dbState.counters,
    });
  }

  if (dbState.favorites) {
    const favData = dbState.favorites.map((favorite) => ({ name: favorite }));
    await prisma.favorite.createMany({
      data: favData
    })
  }

  res.status(200).end();
} 