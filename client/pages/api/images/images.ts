import { NextApiRequest, NextApiResponse } from 'next';
import busboy from 'busboy';
import { ErrorResponse, SuccessResponse, UploadInfo } from 'types/server';
import normalizePaths from 'utils/normalize-path';
import s3, { Bucket, joinPath } from './aws/s3';

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
    const standardizedFilename = Buffer.from(info.filename, 'latin1').toString(
      'utf8'
    );
    const [folder, filename] = normalizePaths(
      standardizedFoldername,
      standardizedFilename
    );
    const id = joinPath('uploads', folder, filename);
    try {
      const response = await s3
        .upload({
          Bucket,
          Body: stream,
          Key: id,
        })
        .promise();

      res.send({
        error: false,
        payload: { data: response, mimetype: info.mimeType },
      } as SuccessResponse<UploadInfo>);
    } catch (e) {
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
