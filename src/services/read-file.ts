import { readFileAWS } from './aws'

export async function readFile(url: string) {
  try {
    return await readFileAWS(url)
  } catch (error) {
    throw new Error('Could not read file')
  }
}
