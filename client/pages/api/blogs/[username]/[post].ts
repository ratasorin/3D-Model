import { NextApiRequest, NextApiResponse } from 'next';
import { ChurchInfoFailResponse } from 'pages/api/church-info/[church]';
import prisma from 'utils/prisma';

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { username, post } = req.query as { username: string; post: string };
    const blog = req.body as string;
    const date = Date.now().toLocaleString();
    const user = await prisma.user.findFirst({
      where: {
        name: username,
      },
    });

    if (user)
      await prisma.blogs.create({
        data: {
          content: blog,
          createdAt: date,
          likes: 0,
          title: post,
          userId: user.id,
        },
      });
    else {
      res.send({
        error: true,
        message: 'Trebuie sa fii logat ca sa poti posta ',
      } as ChurchInfoFailResponse);
      return;
    }

    res.send({
      error: false,
      message: 'Totul este perfect !',
    });
    console.log(username, post, 'POST');
  }
}
