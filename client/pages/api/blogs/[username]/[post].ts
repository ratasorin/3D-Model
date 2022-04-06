import { NextApiRequest, NextApiResponse } from 'next';

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { username, post } = req.query;
  const body = req.body;
  console.log(username, post, body, 'POST');
}
