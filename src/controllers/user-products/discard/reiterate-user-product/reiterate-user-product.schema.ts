import { JSONSchemaType } from '../../../../types/json-types'

export type ReiterateUserProductBody = {
  quantity?: number
}

export const reiterateUserProductSchema: JSONSchemaType<ReiterateUserProductBody> = {
  type: 'object',
  properties: {
    quantity: {
      type: 'number',
      nullable: true
    },
  }
}