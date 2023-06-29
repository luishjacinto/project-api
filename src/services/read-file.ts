import { readFileAWS } from './aws'

export async function readFile(url: string) {
  return await readFileAWS(url)
}
