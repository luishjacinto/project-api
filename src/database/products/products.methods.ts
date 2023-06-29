import { readFile } from '../../services/read-file'
import { IProduct } from './products.types'


export async function load(this: IProduct): Promise<IProduct> {
  if (this.thumbnail) {
    this.thumbnail = await readFile(this.thumbnail)
  }

  return this
}
