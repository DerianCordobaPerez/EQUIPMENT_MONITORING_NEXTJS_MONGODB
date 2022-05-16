function onlyUnique(value, index, self) {
  return self.indexOf(value) === index
}

function getNetworkIp({ ip }) {
  const [, , network] = ip.split('.')

  return network
}

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

export function getNetworkTopology({ ips }) {
  return getIpsForNetwork({ ips })
}
