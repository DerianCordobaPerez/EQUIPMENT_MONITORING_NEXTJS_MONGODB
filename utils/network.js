/**
 * It returns true if the value is the first instance of that value in the array.
 * @param value - the current element being processed in the array
 * @param index - The index of the current element being processed in the array.
 * @param self - The array that filter was called upon.
 * @returns The index of the first occurrence of the value in the array.
 */
function onlyUnique(value, index, self) {
  return self.indexOf(value) === index
}

/**
 * It takes an object with an `ip` property, and returns the third octet of the IP address
 * @returns The third octet of the IP address.
 */
function getNetworkIp({ ip }) {
  const [, , network] = ip.split('.')

  return network
}

/**
 * It takes an array of IP addresses and returns an object where the keys are the network IP addresses
 * and the values are arrays of IP addresses that belong to that network
 * @returns An object with network IPs as keys and an array of IPs as values.
 */
function getIpsForNetwork({ ips }) {
  const result = {}

  ips.forEach((ip) => {
    const network = getNetworkIp({ ip })
    result[network] ??= []
    result[network].push(ip)
    result[network] = result[network].filter(onlyUnique)
    result[network].sort()
  })

  return result
}

/**
 * > Given a list of IPs, return a list of IPs that are in the same network
 * @returns The function getNetworkTopology is being returned.
 */
export function getNetworkTopology({ ips }) {
  return getIpsForNetwork({ ips })
}
