import { Attachment } from '../types/attachment'
import { readFile } from '../services/read-file'

export async function getAttachment(url: string): Promise<Attachment | undefined> {
  try {
    const base64 = await readFile(url)

    if (base64){
      return {
        url,
        base64
      }
    }
  } catch (error) {
    throw new Error('Could not get attachment')
  }
}
