import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const body = JSON.parse(req.body);
    const favorite = await prisma.favorite.delete({
        where: {
            name: body.name,
        }
    });

    if (!favorite) {
        res.status(400).end();
    }

    res.status(200).json(favorite);
}