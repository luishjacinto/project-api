import { Attachment } from '../types/attachment'
import { readFile } from '../services/read-file'

export async function getAttachment(url: string): Promise<Attachment> {
  return {
    url,
    base64: await readFile(url)
  }
}
