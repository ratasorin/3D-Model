import { NextApiRequest, NextApiResponse } from 'next';
import { RequestResponse } from 'pages/api/church-info/[church]';
import parse from 'utils/parse';
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
      userId: userID,
      blogsMonument: parse(monument),
    },
  }));

  console.log('FROM FIND IF USER HAS LIKED:', blogID, userID, monument);
  res.send({
    error: false,
    payload: hasLiked,
  } as RequestResponse<boolean>);
}
