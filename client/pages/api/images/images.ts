import { NextApiRequest, NextApiResponse } from 'next';
import busboy from 'busboy';
import path from 'path/posix';
import { ErrorResponse, SuccessResponse } from 'types/server';
import normalizePaths from 'utils/normalize-path';
import { ManagedUpload } from 'aws-sdk/clients/s3';
import s3, { Bucket } from './aws/s3';
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
