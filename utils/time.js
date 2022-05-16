export const calculateTimeCallback = (callback, args) => {
  const start = process.hrtime()
  const output = callback(args)
  const end = process.hrtime(start)

  const seconds = `${end[0] > 0 ? `${end[0]}s` : ''}`
  const miliseconds = `${(end[1] / 1000000).toString().slice(0, 5)}ms`

  return {
    output,
    time: `${seconds} ${miliseconds}`,
  }
}
