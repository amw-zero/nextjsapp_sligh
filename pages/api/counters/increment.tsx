import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const body = JSON.parse(req.body);
    const counter = await prisma.counter.findFirst({ where: { name: body.name }});
    if (!counter) {
        res.status(404).end();
        return;
    }

    const nextCounter = await prisma.counter.update({
        where: {
            name: counter?.name,
        }, data: {
            value: counter.value + 1,
        }
    });

    res.status(200).json(nextCounter);
}