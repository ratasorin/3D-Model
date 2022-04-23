import S3 from 'aws-sdk/clients/s3';

const s3 = new S3({
  region: process.env.AWS_REGION_NAME,
  credentials: {
    accessKeyId: process.env.AWS_S3_ACCESS_KEY as string,
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY as string,
  },
});

export const Bucket = process.env.AWS_BUCKET_NAME as string;

export default s3;
