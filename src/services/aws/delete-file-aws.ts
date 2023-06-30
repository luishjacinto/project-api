import { BucketName } from 'aws-sdk/clients/appflow';
import AWS from 'aws-sdk'
import { ifInstanceOfErrorThrowLogThenAgain } from '../../utilities/if-instance-of-error-throw-log-then-throw-again'
import { removeAWSDomainFromUrl } from './removeAWSDomainFromUrl'
import { consoleLogOnBlue } from '../../utilities/console-log-on-color'

export async function deleteFileAWS(KeyOrUrl: string): Promise<void> {
  try {
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

    KeyOrUrl = removeAWSDomainFromUrl(KeyOrUrl)

    const s3 = new AWS.S3({ apiVersion: '2006-03-01', region: process.env.AWS_REGION });

    await s3.deleteObject({
        Bucket: process.env.AWS_S3_BUCKET as BucketName,
        Key: decodeURIComponent(KeyOrUrl),
    }).promise();

    consoleLogOnBlue(`Object deleted on AWS S3: ${KeyOrUrl}`)

  } catch (error) {
    ifInstanceOfErrorThrowLogThenAgain(error, `AWS S3 Error][${KeyOrUrl}`)
  }
}
