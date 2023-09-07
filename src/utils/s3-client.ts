import { S3Client, S3ClientConfig } from '@aws-sdk/client-s3'
import dotenv from 'dotenv'

dotenv.config()

const awsConfig: S3ClientConfig = {
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY || '',
    secretAccessKey: process.env.AWS_SECRET_KEY || '',
  },
  region: process.env.AWS_REGION,
}

const s3 = new S3Client(awsConfig)

export default s3
