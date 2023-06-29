import { getAttachment } from '../../utilities/get-attachment'
import { ObjectWithAttachments } from '../../types/object-with-attachments'
import { createObjectWithAttachmentsFromDocument } from '../../utilities/create-object-with-attachments-from-document'
import { IProduct, IProductDocument } from './products.types'
import { ifInstanceOfErrorThrowAgain } from '../../utilities/if-instance-of-error-throw-again'

export async function loadAttachments(this: IProductDocument): Promise<ObjectWithAttachments<IProduct>> {
  const productWithAttachments = createObjectWithAttachmentsFromDocument(this)

  if (productWithAttachments.thumbnail) {
    try {
      const attachment = await getAttachment(productWithAttachments.thumbnail)

      if (attachment) {
        productWithAttachments.attachments.push(attachment)
      }
    } catch (error) {
      ifInstanceOfErrorThrowAgain(error, `Error on loading attachment from product(${this.id})`)
    }
  }

  return productWithAttachments
}
