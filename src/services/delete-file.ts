import { deleteFileAWS } from './aws/delete-file-aws'

export async function deleteFile(url: string) {
  try {
    return await deleteFileAWS(url)
  } catch (error) {
    throw new Error('Could not delete file')
  }
}
