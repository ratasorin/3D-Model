import { NextApiRequest, NextApiResponse } from 'next';
import slugify from 'slugify';
import { createWriteStream } from 'fs';
import busboy from 'busboy';
import path from 'path/posix';
import S3, { ManagedUpload } from 'aws-sdk/clients/s3';
import { ErrorResponse, SuccessResponse } from 'types/server';
import normalizePaths from 'utils/normalize-path';

const s3 = new S3({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  },
});

const Bucket = process.env.AWS_BUCKET_NAME as string;
export interface FileUploadError {
  ok: false;
  error: string;
  file: string;
}

export interface FileUploadSuccess {
  ok: true;
  message: string;
  file: undefined;
}

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function imagesHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const busBoyParser = busboy({
    headers: req.headers,
  });

  busBoyParser.on('file', async (name, stream, info) => {
    const standardizedFoldername = Buffer.from(name, 'latin1').toString('utf8');
    const [folder, filename] = normalizePaths(
      standardizedFoldername,
      info.filename
    );
    const id = path.join('uploads', folder, filename);

    try {
      // console.log('THE S3 is', s3);
      const response = await s3
        .upload({
          Bucket,
          Body: stream,
          Key: id,
        })
        .promise()
        .then((e) => {
          console.log('THE RESPONSE IS:', e);
          return e;
        })
        .catch((e) => {
          console.log('THE ERROR IS:', e);
          return e;
        });
      console.log('THE RESPONSE IS:', response);
      res.send({
        error: false,
        payload: response,
      } as SuccessResponse<ManagedUpload.SendData>);
    } catch (e) {
      console.log('ERROR IS:', e);
      res.send({
        error: true,
        payload:
          'O eroare a aparut in sistem, va rugam incercati din nou mai tarziu',
      } as ErrorResponse);
    }
  });
  busBoyParser.on('error', () => {
    res.send({
      error: true,
      payload:
        'O eroare a aparut in sistem, va rugam incercati din nou mai tarziu',
    } as ErrorResponse);
  });
  req.pipe(busBoyParser);
}
