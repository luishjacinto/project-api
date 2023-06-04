export function consoleLogOnRed(log: unknown) {
  console.error(`\x1b[31m${log}\x1b[0m`)
}