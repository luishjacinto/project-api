import { type IDraftDocument } from '../../../database'
import { type ResponseLocalsWithUser } from '../response-locals-with-user'

export type ResponseLocalsWithDraft = {
  draft: IDraftDocument
} & ResponseLocalsWithUser