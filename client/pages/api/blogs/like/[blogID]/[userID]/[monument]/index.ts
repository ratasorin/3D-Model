import { NextApiRequest, NextApiResponse } from 'next';
import { SuccessResponse } from 'types/server';
import prisma from 'utils/prisma';

export default async function hasLiked(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { blogID } = req.query as {
    blogID: string;
    userID: string;
    monument: string;
  };

  const hasLiked = !!(await prisma.like.findFirst({
    where: {
      blogsBlogId: blogID,
    },
  }));

  res.send({
    error: false,
    payload: hasLiked,
  } as SuccessResponse<boolean>);
}
