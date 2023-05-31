import { IProductDocument } from "./products.types";

export async function setLastUpdated(this: IProductDocument): Promise<void> {
  const now = new Date();
  if (!this.lastUpdated || this.lastUpdated < now) {
    this.lastUpdated = now;
    await this.save();
  }
}
