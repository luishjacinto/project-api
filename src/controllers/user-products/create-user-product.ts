import { Request, Response } from 'express'

import {
  type RequestParamsWithId,
  handleResponseError
} from '../../utilities'
import { Product } from '../../database/products'

import { UserProduct } from '../../database/users-products'
import { ResponseLocalsWithUser } from '../../types/routes'
import { uploadFile } from '../../services/upload-file'
import { getMimeTypeAndExtFromBuffer } from '../../utilities/get-mime-type-and-ext-from-buffer'

type CreateUserProductBody = {
  name: string
  barcode: string
  quantity: number
  quantityUsed: number
  quantityDiscarded: number
  observation?: string
  expiresAt?: string,
  images?: string[]
}

export async function createUserProduct(
  req: Request<RequestParamsWithId, any, CreateUserProductBody>,
  res: Response<{}, ResponseLocalsWithUser>
) {
  try {
    const {
      name,
      barcode,
      quantity,
      quantityUsed,
      quantityDiscarded,
      observation,
      expiresAt,
      images
    } = req.body

    const userProduct = new UserProduct()

    const { user } = res.locals

    userProduct.userId = user.id

    userProduct.name = name
    userProduct.barcode = barcode
    userProduct.quantity = quantity
    userProduct.quantityUsed = quantityUsed || 0
    userProduct.quantityDiscarded = quantityDiscarded || 0

    if (observation) {
      userProduct.observation = observation
    }

    if (expiresAt) {
      if(Number.isNaN(Date.parse(expiresAt))) {
        throw new Error("Invalid format of expiresAt")
      }

      userProduct.expiresAt = new Date(expiresAt)
    }

    const product = await Product.findByBarcode(barcode)

    userProduct.images = []

    if (images) {
      const imagesUrl = await Promise.all(
        images.map(async image => {
          const buffer = Buffer.from(image, 'base64')

          const { mime, ext } = await getMimeTypeAndExtFromBuffer(buffer)

          return await uploadFile(`user_products/${user.id}/${barcode}/${new Date().getTime()}.${ext}`, buffer, mime)
        })
      )

      userProduct.images = imagesUrl
    }

    if (product) {
      userProduct.productId = product.id

      if (product.thumbnail && !userProduct.images.length) {
        userProduct.images = [product.thumbnail]
      }
    }

    await userProduct.save()

    const id = userProduct.id

    res.status(201).json({ id }).end()
  } catch (error) {
    handleResponseError(res, 400, error)
  }
}
