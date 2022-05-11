import { NextApiRequest, NextApiResponse } from 'next';
import { ErrorResponse, ServerResponse } from 'types/server';
import normalizePaths from 'utils/normalize-path';
import s3, { Bucket, joinPath } from '../aws/s3';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { foldername: defaultFoldername } = req.query as {
    [key: string]: string;
  };
  const [foldername] = normalizePaths(defaultFoldername);
  const Prefix = joinPath('uploads', foldername);
  try {
    s3.listObjects(
      {
        Prefix,
        Bucket,
      },
      async (err, data) => {
        if (err) {
          res.send({
            error: true,
            payload: err.message,
          } as ErrorResponse);
          return;
        }
        if (!data.Contents) return;

        const images: string[] = [];
        for await (const S3Object of data.Contents) {
          const Key = S3Object.Key as string;
          const image = await s3.getSignedUrlPromise('getObject', {
            Bucket,
            Key,
          });
          images.push(image);
        }
        res.send({
          error: false,
          payload: images,
        } as ServerResponse<string[]>);
      }
    );
  } catch (e) {
    res.json({
      error: true,
      payload: e,
    } as ErrorResponse);
  }
}
