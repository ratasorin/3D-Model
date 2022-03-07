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
  //   const destinationFolder = path.join(
  //     process.cwd(),
  //     'uploads',
  //     slugify(filename, {
  //       lower: true,
  //       replacement: '_',
  //     })
  //   );
  //   try {
  //     const fileNames = await fs.readdir(destinationFolder);
  //     const files = await Promise.all(
  //       fileNames.map(async (filename) => {
  //         const image = await fs.readFile(
  //           path.join(destinationFolder, filename),
  //           'base64'
  //         );
  //         const finalImage = 'data:image/png;base64,' + image;
  //         return { fileSRC: finalImage, filename };
  //       })
  //     );
  //     res.json(files);
  //   } catch (e) {
  //     res.json({
  //       error: true,
  //       Error: `${e}`,
  //     });
  //   }
}
