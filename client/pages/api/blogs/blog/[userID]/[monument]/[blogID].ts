import { NextApiRequest } from 'next';
// import { ErrorResponse } from 'types/server';
// import parse from 'utils/normalize-path';
import prisma from 'utils/prisma';

export default async function (req: NextApiRequest) {
  const blogID = req.query.blogID as string;
  try {
    await prisma.blogs.delete({
      where: {
        blogId: blogID,
      },
    });
  } catch (e) {
    console.log(e);
  }
}
