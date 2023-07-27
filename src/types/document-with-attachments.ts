import { Document } from "mongoose";
import { ObjectWithAttachments } from './object-with-attachments'

export type DocumentWithAttachments<T> = {

  /**
   * Create external entity
  */

  createAttachment: (buffer: Buffer) => Promise<string | undefined>

  /**
   * Load external entities
  */
  loadAttachments: () => Promise<ObjectWithAttachments<T>>

  /**
     * Delete external entity
  */
  deleteAttachment: (url: string) => Promise<void>

  /**
     * Delete external entities
  */
  deleteAttachments: () => Promise<void>


} & Document
