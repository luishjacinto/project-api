import { Document } from "mongoose";

export type ModelWithLoad<T> = {
  load: () => Promise<T>
} & Document