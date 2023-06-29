import { IUserProduct, IUserProductDocument } from './users-products.types'
import { IProductDocument, Product } from '../products'
import { IUserDocument, User } from '../users'
import { ObjectWithAttachments } from '../../types/object-with-attachments'
import { createObjectWithAttachmentsFromDocument } from '../../utilities/create-object-with-attachments-from-document'
import { getAttachment } from '../../utilities/get-attachment'
import { ifInstanceOfErrorThrowAgain } from '../../utilities/if-instance-of-error-throw-again'

export async function user(this: IUserProductDocument): Promise<IUserDocument | null> {
  return await User.findById(this.userId)
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

export async function loadAttachments(this: IUserProductDocument): Promise<ObjectWithAttachments<IUserProduct>> {
  const userProductWithAttachments = createObjectWithAttachmentsFromDocument(this)

  if (userProductWithAttachments.images) {
    for (const index in userProductWithAttachments.images) {
      try{
        const attachment = await getAttachment(userProductWithAttachments.images[index])

        if (attachment) {
          userProductWithAttachments.attachments.push(attachment)
        }
      } catch (error) {
        ifInstanceOfErrorThrowAgain(error, `Error on loading attachments from user product(${this.id})`)
      }
    }
  }

  return userProductWithAttachments
}

export async function loadFirstImage(this: IUserProductDocument): Promise<ObjectWithAttachments<IUserProduct>> {
  const userProductWithAttachments = createObjectWithAttachmentsFromDocument(this)

  if (userProductWithAttachments.images) {
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
