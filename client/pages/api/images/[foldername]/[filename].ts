import { NextApiRequest, NextApiResponse } from 'next';
import normalizePaths from 'utils/normalize-path';
import s3, { Bucket, joinPath } from '../aws/s3';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { foldername: defaultFoldername, filename: defaultFilename } =
    req.query as { [key: string]: string };

  const utf8Filename = Buffer.from(defaultFilename).toString('utf8');

  console.log(defaultFoldername, utf8Filename);

  const [foldername, filename] = normalizePaths(
    defaultFoldername,
    utf8Filename
  );

  const id = joinPath('uploads', foldername, filename);
  console.log('THE ID IS:', id);

  try {
    const stream = s3
      .getObject({
        Key: id,
        Bucket,
      })
      .createReadStream();
    stream.pipe(res);
  } catch (e) {
    res.json({
      error: true,
      Error: `${e}`,
    });
  }
}
