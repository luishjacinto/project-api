import { Base64String } from 'aws-sdk/clients/wellarchitected';
import { BucketName } from 'aws-sdk/clients/appflow';
import AWS from 'aws-sdk'
import { ifInstanceOfErrorThrowLogThenAgain } from '../../utilities/if-instance-of-error-throw-log-then-throw-again'

function removeAWSDomainFromUrl(KeyOrUrl: string) {
  const {
    AWS_REGION,
    AWS_S3_BUCKET
  } = process.env

  return KeyOrUrl.replace(`https://${AWS_S3_BUCKET}.s3.${AWS_REGION}.amazonaws.com/`, '')
}

export async function readFileAWS(KeyOrUrl: string): Promise<Base64String | undefined> {
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

    const result = await s3.getObject({
        Bucket: process.env.AWS_S3_BUCKET as BucketName,
        Key: decodeURIComponent(KeyOrUrl),

    }).promise();

    if (result.Body) {
      return result.Body?.toString('base64')
    }

    throw new Error('Could not get object data from S3')
  } catch (error) {
    ifInstanceOfErrorThrowLogThenAgain(error, `AWS S3 Error][${KeyOrUrl}`)
  }
}
