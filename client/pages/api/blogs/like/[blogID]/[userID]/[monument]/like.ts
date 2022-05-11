import { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'utils/prisma';

export default async function like(req: NextApiRequest, res: NextApiResponse) {
  const { blogID, userID } = req.query as {
    blogID: string;
    userID: string;
    monument: string;
  };

  const { likes } = JSON.parse(req.body) as {
    likes: number;
  };

  await prisma.blogs.update({
    where: {
      blogId: blogID,
    },
    data: {
      likeCount: likes,
      likes: {
        upsert: {
          where: {
            userId_blogsBlogId: {
              blogsBlogId: blogID,
              userId: userID,
            },
          },
          create: {
            userId: userID,
          },
          update: {
            userId: userID,
          },
        },
      },
    },
  });
  res.send('ok');
}
