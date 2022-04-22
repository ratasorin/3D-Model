import fs from 'fs/promises';
import { NextApiRequest, NextApiResponse } from 'next';
import { ErrorResponse, SuccessResponse } from 'pages/types/response';
import path from 'path/posix';
import slugify from 'slugify';

export interface Image {
  src: string;
  filename: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { foldername } = req.query as { [key: string]: string };
  const destinationFolder = path.join(
    process.cwd(),
    'uploads',
    slugify(foldername, {
      lower: true,
      replacement: '_',
    })
  );
  try {
    const fileNames = await fs.readdir(destinationFolder);
    const files = await Promise.all(
      fileNames.map(async (filename) => {
        const image = await fs.readFile(
          path.join(destinationFolder, filename),
          'base64'
        );
        const finalImage = 'data:image/png;base64,' + image;
        return { src: finalImage, filename } as Image;
      })
    );
    res.json({ error: false, payload: files } as SuccessResponse<Image[]>);
  } catch (e) {
    res.json({
      error: true,
      payload: e,
    } as ErrorResponse);
  }
}
