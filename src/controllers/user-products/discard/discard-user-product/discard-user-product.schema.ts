import { JSONSchemaType } from '../../../../types/json-types'

export type DiscardUserProductBody = {
  quantity?: number
}

export const discardUserProductSchema: JSONSchemaType<DiscardUserProductBody> = {
  type: 'object',
  properties: {
    quantity: {
      type: 'number',
      nullable: true
    },
  }
}
