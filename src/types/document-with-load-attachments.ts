import { Document } from "mongoose";
import { ObjectWithAttachments } from './object-with-attachments'

export type DocumentWithLoadAttachments<T> = {

  /**
   * Load external entities
  */
  loadAttachments: () => Promise<ObjectWithAttachments<T>>

} & Document