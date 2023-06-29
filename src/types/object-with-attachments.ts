import { Attachment } from './attachment'

export type ObjectWithAttachments<T> = T & { attachments: Attachment[] }