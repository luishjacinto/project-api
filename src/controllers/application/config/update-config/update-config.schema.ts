import { JSONSchemaType } from '../../../../types/json-types'

export type UpdateConfigBody = {
  underMaintenance?: boolean
}

export const updateConfigSchema: JSONSchemaType<UpdateConfigBody> = {
  type: 'object',
  properties: {
    underMaintenance: {
      type: 'boolean',
      nullable: true
    },
  }
}
