import info from 'info.json'

/**
 * It takes a key, finds the values for that key, and returns an array of objects with a label and
 * value property
 * @param key - The key of the info object that we want to get the values for.
 * @returns An array of objects with a label and value property.
 */
function getKeyValues(key) {
  const values = info[key]
  return Object.keys(values).map((key) => ({
    label: `${key.charAt(0).toUpperCase()}${key.slice(1)}`,
    value: key,
  }))
}

/**
 * It returns an array of objects, each object containing a key and a value
 * @returns An array of objects with the key and value of the commands object.
 */
export function getCommands() {
  return getKeyValues('commands')
}

/**
 * It returns the values of the `roles` key in the `keyValues` object
 * @returns An array of objects with the key and value properties.
 */
export function getRoles() {
  return getKeyValues('roles')
}

/**
 * It returns an array of objects with a label and value property
 * @returns An array of objects with a label and value property.
 */
export function getServices() {
  const keys = ['dhcp', 'bind', 'web', 'snmp']

  return keys.map((key) => ({
    label: `${key.charAt(0).toUpperCase()}${key.slice(1)}`,
    value: key,
  }))
}
