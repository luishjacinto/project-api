import { uploadFileAWS } from './aws'

export async function uploadFile(path: string, content: any, contentType: string): Promise<string> {
  return await uploadFileAWS(path, content, contentType)
}