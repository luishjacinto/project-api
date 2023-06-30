export function removeAWSDomainFromUrl(url: string) {
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

  return url.replace(`https://${AWS_S3_BUCKET}.s3.${AWS_REGION}.amazonaws.com/`, '')
}