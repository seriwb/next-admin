import { S3Client } from "@aws-sdk/client-s3";
import { SESClient } from "@aws-sdk/client-ses";

export const s3Client = new S3Client({
  // credentials: {
  //   accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
  //   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  // },
  region: process.env.AWS_S3_RESION,
  endpoint: process.env.AWS_S3_ENDPOINT,
  forcePathStyle: true,
});

export const sesClient = new SESClient({
  region: process.env.AWS_SES_REGION || "us-east-1",
  ...(process.env.AWS_SES_ENDPOINT ? { endpoint: process.env.AWS_SES_ENDPOINT } : {}),
});
