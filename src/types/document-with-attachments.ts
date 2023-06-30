import { Document } from "mongoose";
import { ObjectWithAttachments } from './object-with-attachments'

export type DocumentWithAttachments<T> = {

  createAttachments: (buffers: Buffer[]) => Promise<void>

  /**
   * Load external entities
  */
  loadAttachments: () => Promise<ObjectWithAttachments<T>>

  /**
   * Delete external entities
  */
  deleteAttachments: () => Promise<void>

} & Document