import { Blogs } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'utils/prisma';
import { FailResponse, SuccessResponse } from '../../church-info/[church]';

export default async function getBlogs(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { monument } = req.query as { monument: string };
  try {
    const blogs = await prisma.blogs.findMany({
      where: {
        monument,
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
    } as FailResponse);
  }
}
