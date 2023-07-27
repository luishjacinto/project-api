import { Attachment } from './attachment'

export type ObjectWithAttachment<T> = T & { attachment?: Attachment }