import { IUserProductDocument } from './users-products.types'

export function howManyLeft(this: IUserProductDocument): number {
  return this.quantity - (this.quantityUsed + this.quantityDiscarded)
}

export async function use(this: IUserProductDocument, quantity: number = 1): Promise<void> {
  if (this.howManyLeft() < quantity) {
    throw new Error("The amount intended to be used is greater than the amount left over")
  }

  this.quantityUsed += quantity
  await this.save()
}

export async function disuse(this: IUserProductDocument, quantity: number = 1): Promise<void> {
  if ((this.quantityUsed - quantity) < 0) {
    throw new Error("No amount of product was used")
  }

  this.quantityUsed -= quantity
  await this.save()
}

export async function discard(this: IUserProductDocument, quantity: number = 1): Promise<void> {
  if (this.howManyLeft() < quantity) {
    throw new Error("The amount intended to discard is greater than the amount left over")
  }

  this.quantityDiscarded += quantity
  await this.save()
}

export async function reiterate(this: IUserProductDocument, quantity: number = 1): Promise<void> {
  if ((this.quantityDiscarded - quantity) < 0) {
    throw new Error("No amount of product was discarded")
  }

  this.quantityDiscarded -= quantity
  await this.save()
}