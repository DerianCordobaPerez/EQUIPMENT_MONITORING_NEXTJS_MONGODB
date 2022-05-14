import info from 'info.json'

function getKeyValues(key) {
  const values = info[key]
  return Object.keys(values).map((key) => ({
    label: `${key.charAt(0).toUpperCase()}${key.slice(1)}`,
    value: key,
  }))
}

export function getCommands() {
  return getKeyValues('commands')
}

export function getRoles() {
  return getKeyValues('roles')
}
