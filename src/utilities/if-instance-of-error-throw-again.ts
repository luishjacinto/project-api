export function ifInstanceOfErrorThrowAgain(error: unknown, prefixMessage?: string) {
  if (error instanceof Error) {
    throw new Error(prefixMessage ? `${prefixMessage}: ${error.message}` : error.message)
  }
}