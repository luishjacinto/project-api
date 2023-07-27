import { IUserProduct, IUserProductDocument } from './users-products.types'
import { IProductDocument, Product } from '../products'
import { IUserDocument, User } from '../users'
import { ObjectWithAttachments } from '../../types/object-with-attachments'
import { createObjectWithAttachmentsFromDocument } from '../../utilities/create-object-with-attachments-from-document'
import { getAttachment } from '../../utilities/get-attachment'
import { ifInstanceOfErrorThrowAgain } from '../../utilities/if-instance-of-error-throw-again'
import { deleteFile } from '../../services/delete-file'
import { getMimeTypeAndExtFromBuffer } from '../../utilities/get-mime-type-and-ext-from-buffer'
import { uploadFile } from '../../services/upload-file'

export async function user(this: IUserProductDocument): Promise<IUserDocument> {
  const user = await User.findById(this.userId)

  if (user) {
    return user
  }

  throw new Error(`Could not find user from user product(${this.id})`)
}

export async function product(this: IUserProductDocument): Promise<IProductDocument | null> {
  if (this.productId) {
    return await Product.findById(this.productId)
  }

  return null
}

export function howManyLeft(this: IUserProductDocument): number {
  return this.quantity - (this.quantityUsed + this.quantityDiscarded)
}

export async function use(this: IUserProductDocument, quantity: number = 1): Promise<void> {
  if (this.howManyLeft() < quantity) {
    throw new Error("The amount intended to be used is greater than the amount left over")
  }

  this.quantityUsed += quantity
  await this.save()
}

export async function disuse(this: IUserProductDocument, quantity: number = 1): Promise<void> {
  if (this.quantityUsed === 0) {
    throw new Error("No amount of product was used")
  }

  if (quantity > this.quantityUsed) {
    throw new Error("The amount intended to be disuse is greater than the amount used")
  }

  this.quantityUsed -= quantity
  await this.save()
}

export async function discard(this: IUserProductDocument, quantity: number = 1): Promise<void> {
  if (this.howManyLeft() < quantity) {
    throw new Error("The amount intended to discard is greater than the amount left over")
  }

  this.quantityDiscarded += quantity
  await this.save()
}

export async function reiterate(this: IUserProductDocument, quantity: number = 1): Promise<void> {
  if (this.quantityDiscarded === 0) {
    throw new Error("No amount of product was discarded")
  }

  if (quantity > this.quantityDiscarded) {
    throw new Error("The amount intended to reiterate is greater than the amount discarded")
  }

  this.quantityDiscarded -= quantity
  await this.save()
}

export async function createAttachment(this: IUserProductDocument, buffer: Buffer): Promise<string | undefined> {
  const user = await this.user()

  const imagesLength = (this.images?.length || 0) + 1

  if (imagesLength > 3) {
    throw new Error('Limit of 3 images per user product')
  }

  const { mime, ext } = await getMimeTypeAndExtFromBuffer(buffer)

  const imageUrl = await uploadFile(`users_products/${user.id}/${this.id}/${new Date().getTime()}.${ext}`, buffer, mime)

  if (this.images) {
    this.images = [...this.images, imageUrl]
  } else {
    this.images = [imageUrl]
  }

  try {
    await this.save()

    return imageUrl
  } catch (error) {
    await this.deleteAttachment(imageUrl);

    ifInstanceOfErrorThrowAgain(error, 'Could not create user product image')
  }
}

export async function loadAttachments(this: IUserProductDocument): Promise<ObjectWithAttachments<IUserProduct>> {
  const userProductWithAttachments = createObjectWithAttachmentsFromDocument(this)

  if (userProductWithAttachments.images) {
    try{
      for (const index in userProductWithAttachments.images) {
          if (!userProductWithAttachments.images[index]) {
            continue
          }

          const attachment = await getAttachment(userProductWithAttachments.images[index])

          if (attachment) {
            userProductWithAttachments.attachments.push(attachment)
          }
        }
      } catch (error) {
        ifInstanceOfErrorThrowAgain(error, `Error on loading images from user product(${this.id})`)
      }
    }

  return userProductWithAttachments
}

export async function deleteAttachments(this: IUserProductDocument): Promise<void> {
  if (this.images) {

    const product = await this.product()

    try{
       for (const index in this.images) {
        const currentImage: string = this.images[index]
        if (!this.images[index]) {
          continue
        }

        const hasToDeleteFile = !product || (product && currentImage !== product?.thumbnail)

        if (hasToDeleteFile) {
          await deleteFile(currentImage)
        }

        if (!this.$isDeleted()) {
          this.images = this.images.filter(v => v !== currentImage)

          if (!this.images.length) {
            delete this.images
          }

          await this.save()
        }
      }
    } catch (error) {
      ifInstanceOfErrorThrowAgain(error, `Error on deleting images from user product(${this.id})`)
    }
  }
}

export async function loadFirstImage(this: IUserProductDocument): Promise<ObjectWithAttachments<IUserProduct>> {
  const userProductWithAttachments = createObjectWithAttachmentsFromDocument(this)

  if (userProductWithAttachments.images && userProductWithAttachments.images[0]) {
    try {
      const attachment = await getAttachment(userProductWithAttachments.images[0])

      if (attachment) {
        userProductWithAttachments.attachments.push(attachment)
      }
    } catch (error) {
      ifInstanceOfErrorThrowAgain(error, `Error on loading first image from user product(${this.id})`)
    }
  }

  return userProductWithAttachments
}

export async function deleteAttachment(this: IUserProductDocument, url: string): Promise<void> {
  if (this.images) {

    const product = await this.product()

    try {
      if (this.images.includes(url) && url) {

        const hasToDeleteFile = !product || (product && url !== product?.thumbnail)

        if (hasToDeleteFile) {
          await deleteFile(url)
        }

        if (!this.$isDeleted()) {
          this.images = this.images.filter(v => v !== url)

          if (!this.images.length) {
            delete this.images
          }

          await this.save()
        }
      } else {
        throw new Error('The image informed is not present on user product')
      }
    } catch (error) {
      ifInstanceOfErrorThrowAgain(error, `Error on deleting image from user product(${this.id})`)
    }
  }

}
