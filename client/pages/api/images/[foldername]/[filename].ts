import { NextApiRequest, NextApiResponse } from 'next';
import path from 'path/posix';
import normalizePaths from 'utils/normalize-path';
import s3, { Bucket } from '../aws/s3';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { foldername: defaultFoldername, filename: defaultFilename } =
    req.query as { [key: string]: string };
  console.log(defaultFoldername, defaultFilename);

  const [foldername, filename] = normalizePaths(
    defaultFoldername,
    defaultFilename
  );

  const id = path.join('uploads', foldername, filename);
  console.log('THE ID IS:', id);

  const stream = s3
    .getObject({
      Key: id,
      Bucket,
    })
    .createReadStream();
  try {
    res.setHeader('Content-Type', 'image/jpeg');
    stream.pipe(res);
  } catch (e) {
    res.json({
      error: true,
      Error: `${e}`,
    });
  }
}
