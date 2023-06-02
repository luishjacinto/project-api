import { model } from "mongoose";

import { IDraftDocument, IDraftModel } from "./drafts.types";

import DraftSchema from "./drafts.schema";

export const Draft = model<IDraftDocument, IDraftModel>("drafts", DraftSchema);
