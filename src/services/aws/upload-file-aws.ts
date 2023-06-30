import AWS from 'aws-sdk'
import { consoleLogOnBlue } from '../../utilities/console-log-on-color'
import { removeAWSDomainFromUrl } from './removeAWSDomainFromUrl'

export async function uploadFileAWS(Key: string, Body: any, ContentType: string) {

  const {
    AWS_REGION,
    AWS_S3_BUCKET
  } = process.env

  if (!AWS_REGION) {
    throw new Error("No AWS_REGION on environment variables")
  }

  if (!AWS_S3_BUCKET) {
    throw new Error("No AWS_S3_BUCKET on environment variables")
  }

  const s3 = new AWS.S3({ apiVersion: '2006-03-01', region: process.env.AWS_REGION });

  const data = await s3.upload({
      Bucket: AWS_S3_BUCKET,
      Key: decodeURIComponent(Key),
      Body,
      ContentType,
  }).promise();

  consoleLogOnBlue(`Object created on AWS S3: ${removeAWSDomainFromUrl(data.Location)}`)

  return data.Location;
}