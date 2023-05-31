import jwt from 'jsonwebtoken'

import { consoleLogOnRed } from './console-log-on-red'

function getJWTSecret() {
  const JWT_SECRET = process.env.JWT_SECRET
  if (!JWT_SECRET) {
    consoleLogOnRed("No JWT_SECRET on environment variables")
    throw new Error("Trouble with authentication")
  }

  return JWT_SECRET
}

export function jwtSign(payload: object): string {
  const token = jwt.sign(
    payload,
    getJWTSecret(),
    { expiresIn: '5m' }
  )

  return token
}

export function jwtVerify(token: string): jwt.JwtPayload {
  const payload = jwt.verify(
    token,
    getJWTSecret(),
  )

  if (typeof payload === 'string') {
    throw new Error('Invalid token payload')
  }

  return payload
}