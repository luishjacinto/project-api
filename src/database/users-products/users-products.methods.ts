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

/**
 * Create attachments for user product.
 * If buffers array is empty and the product base exists and has a thumbnail, the thumbnail will be added.
 * This method only includes attachments without removing any existing one
*/
export async function createAttachments(this: IUserProductDocument, buffers: Buffer[]): Promise<void> {
  const user = await this.user()

  const imagesUrl = await Promise.all(
    buffers.map(async buffer => {
      const { mime, ext } = await getMimeTypeAndExtFromBuffer(buffer)

      return await uploadFile(`users_products/${user.id}/${this.id}/${new Date().getTime()}.${ext}`, buffer, mime)
    })
  )

  if (this.images) {
    this.images = [...this.images, ...imagesUrl]
  } else {
    this.images = imagesUrl
  }


  const product = await this.product()

  if (!this.images.length && product && product.thumbnail) {
    this.images = [product.thumbnail]
  }

  try {
    await this.save()
  } catch (error) {
    for (const index in imagesUrl) {
      const currentImage = imagesUrl[index]

      if (product && currentImage == product?.thumbnail) {
        continue
      }

      try {
        await this.deleteImage(currentImage)
      } catch (_) {}
    }

    ifInstanceOfErrorThrowAgain(error, 'Could not create user product attachments')
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
        ifInstanceOfErrorThrowAgain(error, `Error on loading attachments from user product(${this.id})`)
      }
    }

  return userProductWithAttachments
}

export async function deleteAttachments(this: IUserProductDocument): Promise<void> {
  if (this.images) {
    try{
       for (const index in this.images) {
        const currentImage: string = this.images[index]
        if (!this.images[index]) {
          continue
        }

        await deleteFile(currentImage)

        if (!this.$isDeleted) {
          this.images = this.images.filter(v => v !== currentImage)

          if (!this.images.length) {
            delete this.images
          }

          await this.save()
        }
      }
    } catch (error) {
      ifInstanceOfErrorThrowAgain(error, `Error on deleting attachments from user product(${this.id})`)
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
      ifInstanceOfErrorThrowAgain(error, `Error on loading first attachment from user product(${this.id})`)
    }
  }

  return userProductWithAttachments
}

export async function deleteImage(this: IUserProductDocument, image: string): Promise<void> {
  if (this.images) {
    try {
      if (this.images.includes(image) && image) {
        await deleteFile(image)

        this.images = this.images.filter(v => v !== image)

        if (!this.$isDeleted) {
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
