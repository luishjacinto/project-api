import { signIn } from './sign-in'
import { signUp } from './sign-up'

export const rootControllers = { signIn, signUp }
export * as productsControllers from './products'
export * as userProductsControllers from './user-products'
export * as userProductsImagesControllers from './user-products/images'
export * as userProductsUseControllers from './user-products/use'
export * as userProductsDiscardControllers from './user-products/discard'
export * as applicationConfigControllers from './application/config'
