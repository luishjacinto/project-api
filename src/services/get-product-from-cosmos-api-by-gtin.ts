import axios, { AxiosResponse, HttpStatusCode } from 'axios'

import { consoleLogOnRed } from '../utilities/console-log-on-red'

type GetProductFromCosmosApiByGTINReturn = {
  description: string
  gtin: number
  thumbnail: string
  width: number | null
  height: number | null
  length: number | null
  net_weight: number | null
  gross_weight: number | null
  created_at: Date
  updated_at: Date
  brand: {
    name: string
    picture: string
  }
  ncm: {
    code: string
    description: string
    full_description: string
  }
} | null

export async function getProductFromCosmosApiByGTIN(gtin: string): Promise<GetProductFromCosmosApiByGTINReturn> {
  const COSMOS_TOKEN = process.env.COSMOS_TOKEN

  if (!COSMOS_TOKEN) {
      consoleLogOnRed("No COSMOS_TOKEN on environment variables")
      throw new Error("Error on getting information about GTIN in external API")
  }

  const response: AxiosResponse =
    await axios
      .get(`https://api.cosmos.bluesoft.com.br/gtins/${gtin}`, {
        headers: {
          "X-Cosmos-Token": COSMOS_TOKEN,
        },
      })

  if (response.status !== HttpStatusCode.Ok) {
    return null
  }

  return response.data
}
