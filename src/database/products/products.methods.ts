import { getAttachment } from '../../utilities/get-attachment'
import { ObjectWithAttachment } from '../../types/object-with-attachment'
import { IProduct, IProductDocument } from './products.types'
import { ifInstanceOfErrorThrowAgain } from '../../utilities/if-instance-of-error-throw-again'
import { deleteFile } from '../../services/delete-file'
import { uploadFile } from '../../services/upload-file'
import { getMimeTypeAndExtFromBuffer } from '../../utilities/get-mime-type-and-ext-from-buffer'
import { createObjectWithAttachmentFromDocument } from '../../utilities/create-object-with-attachment-from-document'

export async function createAttachment(this: IProductDocument, buffer: Buffer): Promise<string | undefined> {

  const { mime, ext } = await getMimeTypeAndExtFromBuffer(buffer)

  this.thumbnail = await uploadFile(`products/${this.barcode}.${ext}`, buffer, mime)

  try {
    await this.save()

    return this.thumbnail
  } catch (error) {
    try {
      await this.deleteAttachment()
    } catch (_) {}

    ifInstanceOfErrorThrowAgain(error, 'Could not create product thumbnail')
  }
}

export async function loadAttachment(this: IProductDocument): Promise<ObjectWithAttachment<IProduct>> {
  const productWithAttachment = createObjectWithAttachmentFromDocument(this)

  if (productWithAttachment.thumbnail) {
    try {
      const attachment = await getAttachment(productWithAttachment.thumbnail)

      if (attachment) {
        productWithAttachment.attachment = attachment
      }
    } catch (error) {
      ifInstanceOfErrorThrowAgain(error, `Error on loading thumbnail from product(${this.id})`)
    }
  }

  return productWithAttachment
}

export async function deleteAttachment(this: IProductDocument): Promise<void> {
  if (this.thumbnail) {
    try {
      await deleteFile(this.thumbnail)

      if (!this.$isDeleted()) {
        delete this.thumbnail

        await this.save()
      }
    } catch (error) {
      ifInstanceOfErrorThrowAgain(error, `Error on deleting thumbnail from product(${this.id})`)
    }
  }
}
