import { NextApiRequest, NextApiResponse } from 'next';
import { ErrorResponse, Image, SuccessResponse } from 'types/server';
import path from 'path/posix';
import normalizePaths from 'utils/normalize-path';
import S3 from 'aws-sdk/clients/s3';

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
  const { foldername: defaultFoldername } = req.query as {
    [key: string]: string;
  };
  const [foldername] = normalizePaths(defaultFoldername);
  const Prefix = path.join('uploads', foldername);
  console.log(Prefix);
  try {
    s3.listObjects(
      {
        Prefix,
        Bucket,
      },
      async (err, data) => {
        if (err) {
          console.log('THE ERROR IS:', err);
          res.send({
            error: true,
            payload: err.message,
          } as ErrorResponse);
          return;
        }
        if (!data.Contents) return;

        const images: Image[] = [];
        for await (const S3Object of data.Contents) {
          const Key = S3Object.Key as string;
          const response = await s3
            .getObject({
              Key,
              Bucket,
            })
            .promise();
          const filename = S3Object.Key?.replace(Prefix + '/', '');
          console.log(filename);
          const image = response.Body?.toString('base64');
          const finalImage = 'data:image/png;base64,' + image;
          images.push({ src: finalImage, filename } as Image);
        }

        res.send({
          error: false,
          payload: images,
        } as SuccessResponse<Image[]>);
      }
    );
  } catch (e) {
    res.json({
      error: true,
      payload: e,
    } as ErrorResponse);
  }
}
