import { readdirSync } from 'fs'

export function getDirectory({ path }) {
  return readdirSync(path)
}

export function getDirectories({ path }) {
  return readdirSync(path).filter((file) => {
    return readdirSync(`${path}/${file}`).length > 0
  })
}

export function getFiles({ path }) {
  return readdirSync(path, { withFileTypes: true })
    .filter((file) => file.isFile())
    .map((file) => file.name)
}
