import { NextApiRequest, NextApiResponse } from 'next';
import parse from 'utils/parse';
import prisma from 'utils/prisma';

export default async function like(req: NextApiRequest, res: NextApiResponse) {
  const { blogID, userID, monument } = req.query as {
    blogID: string;
    userID: string;
    monument: string;
  };

  const likes = JSON.parse(req.body);
  console.log(blogID, userID, monument);
  console.log(likes);
  const updateBlog = await prisma.blogs.update({
    where: {
      blogId_userId_monument: {
        blogId: blogID,
        monument: parse(monument),
        userId: userID,
      },
    },
    data: {
      likes,
    },
  });
  res.send('ok');
}
