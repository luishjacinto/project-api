import { JSONSchemaType } from '../../../types/json-types'

export type UpdateUserProductBody = {
  name: string
  quantity: number
  quantityUsed: number
  quantityDiscarded: number
  observation?: string
  expiresAt?: number
}

export const updateUserProductSchema: JSONSchemaType<UpdateUserProductBody> = {
  type: 'object',
  properties: {
    name: {
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
    }
  },
  required: [
    'name',
    'quantity',
    'quantityDiscarded',
    'quantityUsed'
  ]
}
