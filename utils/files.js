import { readdirSync } from 'fs'

/**
 * "Get the contents of a directory."
 *
 * The function takes a single argument, an object with a single property, `path`. The function returns
 * an array of strings, the contents of the directory
 * @returns An array of the files in the directory
 */
export function getDirectory({ path }) {
  return readdirSync(path)
}

/**
 * It returns an array of directories that contain files
 * @returns An array of directories that have files in them.
 */
export function getDirectories({ path }) {
  return readdirSync(path).filter((file) => {
    return readdirSync(`${path}/${file}`).length > 0
  })
}

/**
 * It returns an array of file names in a given directory
 * @returns An array of file names
 */
export function getFiles({ path }) {
  return readdirSync(path, { withFileTypes: true })
    .filter((file) => file.isFile())
    .map((file) => file.name)
}
