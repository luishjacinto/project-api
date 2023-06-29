export async function urlToBuffer(url: string): Promise<Buffer> {
  const response = await fetch(url)

  const blob = await response.arrayBuffer()

  return Buffer.from(blob)
}
