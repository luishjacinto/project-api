import { JSONSchemaType } from '../../../../types/json-types'

export type UseUserProductBody = {
  quantity?: number
}

export const useUserProductSchema: JSONSchemaType<UseUserProductBody> = {
  type: 'object',
  properties: {
    quantity: {
      type: 'integer',
      nullable: true
    },
  }
}
