import request from 'supertest'
import dotenv from 'dotenv'
import app from '../../app'

import { database } from '../.././database'
import { validateJson } from '../../utilities/validate-json'
import { signInResponseSchema } from './sign-in.schema'

dotenv.config()

beforeEach(async () => {
  await database.connect()
});

afterEach(async () => {
  await database.close()
});

const signInEndpoint = '/signin'

describe('POST /signin', () => {

  const payload = {
      "email": "luishjacinto98@gmail.com",
      "password": "ls102030"
  }

  it('responds with user', async () => {
    const res =
      await request(app)
        .post(signInEndpoint)
        .send(payload)

    expect(validateJson(signInResponseSchema, res.body)).toBe(true)
  })
})
