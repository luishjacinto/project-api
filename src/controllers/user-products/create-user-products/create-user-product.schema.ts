import { JSONSchemaType } from '../../../types/json-types'

export type CreateUserProductBody = {
  name: string
  barcode: string
  quantity: number
  quantityUsed: number
  quantityDiscarded: number
  observation?: string
  expiresAt?: number
  images?: string[]
}

export const createUserProductSchema: JSONSchemaType<CreateUserProductBody> = {
  type: 'object',
  properties: {
    name: {
      type: 'string'
    },
    barcode: {
      type: 'string'
    },
    quantity: {
      type: 'integer'
    },
    quantityUsed: {
      type: 'integer'
    },
    quantityDiscarded: {
      type: 'integer'
    },
    observation: {
      type: 'string',
      nullable: true
    },
    expiresAt: {
      type: 'integer',
      nullable: true
    },
    images: {
      type: 'array',
      uniqueItems: true,
      maxItems: 3,
      nullable: true,
      items: {
        type: "string"
      }
    }
  },
  required: [
    'name',
    'barcode',
    'quantity',
    'quantityDiscarded',
    'quantityUsed'
  ]
}
