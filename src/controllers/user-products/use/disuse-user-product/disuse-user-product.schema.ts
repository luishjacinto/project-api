import { JSONSchemaType } from '../../../../types/json-types'

export type DisuseUserProductBody = {
  quantity?: number
}

export const disuseUserProductSchema: JSONSchemaType<DisuseUserProductBody> = {
  type: 'object',
  properties: {
    quantity: {
      type: 'integer',
      nullable: true
    },
  }
}
