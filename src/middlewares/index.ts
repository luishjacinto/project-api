import { setUserOnResponseLocalsByJWT } from './set-user-on-response-locals-by-jwt'

export const rootMiddlewares = { setUserOnResponseLocalsByJWT }
export * as productsMiddlewares from './products'
export * as userProductsMiddlewares from './user-products'
export * as draftsMiddlewares from './drafts'