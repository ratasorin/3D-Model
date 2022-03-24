import { createReadStream } from 'fs';
import fs from 'fs/promises';
import { NextApiRequest, NextApiResponse } from 'next';
import path from 'path/posix';
import slugify from 'slugify';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { foldername, filename } = req.query as { [key: string]: string };
  console.log(foldername, filename);
  const file = path.join(
    process.cwd(),
    'uploads',
    foldername,
    slugify(filename, {
      lower: true,
      replacement: '_',
    })
  );
  try {
    const { size } = await fs.stat(file);
    res.setHeader('Content-Type', 'image/jpeg');
    res.setHeader('Content-Length', size);
    const stream = createReadStream(file);
    stream.pipe(res);
  } catch (e) {
    res.json({
      error: true,
      Error: `${e}`,
    });
  }
}
