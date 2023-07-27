import { Document } from "mongoose";
import { ObjectWithAttachment } from './object-with-attachment'

export type DocumentWithAttachment<T> = {

  /**
   * Create external entity
  */

  createAttachment: (buffer: Buffer) => Promise<string | undefined>

  /**
   * Load external entity
  */
  loadAttachment: () => Promise<ObjectWithAttachment<T>>

  /**
     * Delete external entity
  */
  deleteAttachment: () => Promise<void>


} & Document
