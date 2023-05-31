import { IUserProductDocument } from "./users-products.types";

export async function setLastUpdated(this: IUserProductDocument): Promise<void> {
  const now = new Date();
  if (!this.lastUpdated || this.lastUpdated < now) {
    this.lastUpdated = now;
    await this.save();
  }
}
