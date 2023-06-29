export async function getMimeTypeAndExtFromBuffer(buffer: Buffer): Promise<{
  mime: string
  ext: string
}> {
  const { fileTypeFromBuffer } = await (eval('import("file-type")') as Promise<typeof import('file-type')>);

  const type = await fileTypeFromBuffer(buffer)

  if (!type) {
    throw new Error("Could not get mime type of base64 string")
  }

  const { ext, mime } = type

  return {
    mime,
    ext
  }
}
