import { getAttachment } from '../../utilities/get-attachment'
import { ObjectWithAttachments } from '../../types/object-with-attachments'
import { createObjectWithAttachmentsFromDocument } from '../../utilities/create-object-with-attachments-from-document'
import { IProduct, IProductDocument } from './products.types'

export async function loadAttachments(this: IProductDocument): Promise<ObjectWithAttachments<IProduct>> {
  const productWithAttachments = createObjectWithAttachmentsFromDocument(this)

  if (productWithAttachments.thumbnail) {
    productWithAttachments.attachments.push(await getAttachment(productWithAttachments.thumbnail))
  }

  return productWithAttachments
}
