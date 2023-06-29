import axios, { AxiosResponse, HttpStatusCode } from 'axios'

import { consoleLogOnRed } from '../utilities/console-log-on-red'

type GetProductFromCosmosApiByBarcodeResponseData = {
  description: string
  barcode: number
  thumbnail?: string
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

export async function getProductFromCosmosApiByBarcode(barcode: string): Promise<GetProductFromCosmosApiByBarcodeResponseData> {
  const COSMOS_TOKEN = process.env.COSMOS_TOKEN

  if (!COSMOS_TOKEN) {
      consoleLogOnRed("No COSMOS_TOKEN on environment variables")
      throw new Error("Error on getting information about Barcode in external API")
  }

  const response: AxiosResponse<GetProductFromCosmosApiByBarcodeResponseData> =
    await axios
      .get(`https://api.cosmos.bluesoft.com.br/gtins/${barcode}`, {
        headers: {
          "X-Cosmos-Token": COSMOS_TOKEN,
        },
      })

  if (response.status !== HttpStatusCode.Ok) {
    return null
  }

  return response.data
}
