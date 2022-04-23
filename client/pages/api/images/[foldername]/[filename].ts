import S3 from 'aws-sdk/clients/s3';
import { NextApiRequest, NextApiResponse } from 'next';
import path from 'path/posix';
import normalizePaths from 'utils/normalize-path';

const s3 = new S3({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  },
});

const Bucket = process.env.AWS_BUCKET_NAME as string;

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
