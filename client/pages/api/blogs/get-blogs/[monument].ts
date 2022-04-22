import { Blogs } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import parse from 'utils/parse';
import prisma from 'utils/prisma';
import { ErrorResponse, SuccessResponse } from 'pages/types/response';

export default async function getBlogs(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { monument: rawMonument } = req.query as { monument: string };
  const monument = parse(rawMonument);
  try {
    const blogs = await prisma.blogs.findMany({
      where: {
        monument,
      },
      orderBy: {
        likeCount: 'desc',
      },
    });

    res.send({
      error: false,
      payload: blogs,
    } as SuccessResponse<Blogs[]>);
  } catch (e) {
    res.send({
      error: true,
      payload:
        'Blogurile nu au putut fi incarcate, va rugam incercati din nou mai tarziu',
    } as ErrorResponse);
  }
}
