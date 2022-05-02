import { NextApiRequest, NextApiResponse } from 'next';
import { ErrorResponse } from 'types/server';
import parse from 'utils/normalize-path';
import prisma from 'utils/prisma';

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { username, title } = req.query as {
      username: string;
      title: string;
    };
    console.log('TITLE IS:', title);
    const blog = JSON.parse(req.body) as {
      content: string;
      id: string;
      monument: string;
    };
    const user = await prisma.user.findFirst({
      where: {
        name: username,
      },
    });

    if (user)
      await prisma.blogs.create({
        data: {
          content: blog.content,
          title: title,
          userId: user.id,
          blogId: blog.id + 'xyz',
          monument: parse(blog.monument)[0],
        },
      });
    else {
      res.send({
        error: true,
        payload: 'Trebuie sa fii logat ca sa poti posta ',
      } as ErrorResponse);
      return;
    }

    res.send({
      error: false,
      payload: 'Totul este perfect !',
    });
    console.log(username, title, 'POST', parse(blog.monument));
  }
}
