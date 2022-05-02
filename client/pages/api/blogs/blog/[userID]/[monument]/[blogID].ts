import { NextApiRequest, NextApiResponse } from 'next';
import { normalizePath } from 'utils/normalize-path';
// import { ErrorResponse } from 'types/server';
// import parse from 'utils/normalize-path';
import prisma from 'utils/prisma';

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const blogID = req.query.blogID as string;
  const monument = req.query.monument as string;
  const userID = req.query.userID as string;
  console.log(blogID, normalizePath(monument), userID);
  await prisma.blogs.delete({
    where: {
      blogId_userId_monument: {
        blogId: blogID,
        monument: normalizePath(monument),
        userId: userID,
      },
    },
  });
}
