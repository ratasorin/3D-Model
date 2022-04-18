import { User } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { FailResponse, SuccessResponse } from 'pages/api/church-info/[church]';
import prisma from 'utils/prisma';

export default async function getUser(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const userID = req.query.username as string;
  try {
    const user = await prisma.user.findFirst({
      where: {
        id: userID,
      },
    });

    res.send({
      error: false,
      payload: user,
    } as SuccessResponse<User>);
  } catch (e) {
    res.send({
      error: true,
      payload: 'UPS! Ceva nu a mers',
    } as FailResponse);
  }
}
