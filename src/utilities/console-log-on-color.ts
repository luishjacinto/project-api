function consoleLogOnColor(log: string, color: string) {
  console.error(`${color}${log}\x1b[0m`)
}

export function consoleLogOnRed(log: string) {
  consoleLogOnColor(log, '\x1b[31m')
}

export function consoleLogOnBlue(log: string) {
  consoleLogOnColor(log, '\x1b[34m')
}