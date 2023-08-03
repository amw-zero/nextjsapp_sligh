import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const body = JSON.parse(req.body);
    const counter = await prisma.counter.create({
        data: {
            name: body.name,
            value: 0,
        }
    });

    if (!counter) {
        res.status(400).end();
    }

    res.status(200).json(counter);
}