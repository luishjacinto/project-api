import { getAttachment } from '../../utilities/get-attachment'
import { ObjectWithAttachments } from '../../types/object-with-attachments'
import { createObjectWithAttachmentsFromDocument } from '../../utilities/create-object-with-attachments-from-document'
import { IProduct, IProductDocument } from './products.types'
import { ifInstanceOfErrorThrowAgain } from '../../utilities/if-instance-of-error-throw-again'
import { deleteFile } from '../../services/delete-file'
import { uploadFile } from '../../services/upload-file'
import { getMimeTypeAndExtFromBuffer } from '../../utilities/get-mime-type-and-ext-from-buffer'

export async function createAttachments(this: IProductDocument, buffers: Buffer[]): Promise<void> {
  if (buffers.length) {
    const [buffer] = buffers

    const { mime, ext } = await getMimeTypeAndExtFromBuffer(buffer)
    this.thumbnail = await uploadFile(`products/${this.barcode}.${ext}`, buffer, mime)

    try {
      await this.save()
    } catch (error) {
      await this.deleteOne()

      try {
        await this.deleteAttachments()
      } catch (_) {}

      ifInstanceOfErrorThrowAgain(error, 'Could not create product attachment')
    }
  }
}

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

export async function deleteAttachments(this: IProductDocument): Promise<void> {
  if (this.thumbnail) {
    try {
      await deleteFile(this.thumbnail)
    } catch (error) {
      ifInstanceOfErrorThrowAgain(error, `Error on deleting attachment from product(${this.id})`)
    }
  }
}
