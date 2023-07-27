import { JSONSchemaType } from '../../../../types/json-types'

export type DeleteUserProductImageBody = {
  url: string
}

export const deleteUserProductImageSchema: JSONSchemaType<DeleteUserProductImageBody> = {
  type: 'object',
  properties: {
    url: {
      type: 'string',
    }
  },
  required: [
    'url'
  ]
}
