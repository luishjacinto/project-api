import { consoleLogOnRed } from './console-log-on-red'

export function ifInstanceOfErrorThrowLogThenAgain(error: unknown, prefixLogMessage: string) {
  if (error instanceof Error) {
    consoleLogOnRed(`[${prefixLogMessage}] ${error.message}`)
    throw new Error(error.message)
  }
}