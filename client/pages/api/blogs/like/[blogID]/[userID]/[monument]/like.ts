import { NextApiRequest, NextApiResponse } from 'next';
import { normalizePath } from 'utils/normalize-path';
import prisma from 'utils/prisma';

export default async function like(req: NextApiRequest, res: NextApiResponse) {
  const { blogID, userID, monument } = req.query as {
    blogID: string;
    userID: string;
    monument: string;
  };

  const { likes } = JSON.parse(req.body) as {
    likes: number;
  };

  console.log(blogID, userID, monument);

  const updateBlog = await prisma.blogs.update({
    where: {
      blogId_userId_monument: {
        blogId: blogID,
        monument: normalizePath(monument),
        userId: userID,
      },
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
