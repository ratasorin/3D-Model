import { NextApiRequest, NextApiResponse } from 'next';
import { SuccessResponse } from 'types/server';
import parse from 'utils/normalize-path';
import prisma from 'utils/prisma';

export default async function hasLiked(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { blogID, userID, monument } = req.query as {
    blogID: string;
    userID: string;
    monument: string;
  };

  const hasLiked = !!(await prisma.like.findFirst({
    where: {
      blogsBlogId: blogID,
    },
  }));

  console.log('FROM FIND IF USER HAS LIKED:', blogID, userID, monument);
  res.send({
    error: false,
    payload: hasLiked,
  } as SuccessResponse<boolean>);
}
