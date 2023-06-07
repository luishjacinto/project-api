import { setUserOnResponseLocalsByJWT } from './set-user-on-response-locals-by-jwt'
import { verifyIfApplicationIsNotUnderMaintenance } from './verify-if-application-is-not-under-maintenance'

export const rootMiddlewares = { setUserOnResponseLocalsByJWT, verifyIfApplicationIsNotUnderMaintenance }
export * as productsMiddlewares from './products'
export * as userProductsMiddlewares from './user-products'
export * as draftsMiddlewares from './drafts'
