import { getDirectory, getDirectories, getFiles } from 'utils/files'

/**
 * It takes a directory name as a query parameter, gets all the files in that directory and all the
 * subdirectories, and returns them in a JSON response
 * @param req - The request object
 * @param res - The response object.
 */
export default function handle(req, res) {
  const {
    query: { directory },
    method,
  } = req

  switch (method) {
    case 'GET':
      try {
        const dir = getDirectory({ path: `./${directory}` })
        const subDirectories = getDirectories({ path: `./${directory}` })

        if (!subDirectories || !dir) {
          res.status(404).json({ success: false })
        }

        const parentDirFiles = getFiles({ path: `./${directory}` })

        const subDirectoriesFiles = subDirectories.map((subDirectory) => {
          return getFiles({ path: `./${directory}/${subDirectory}` })
        })

        if (!subDirectoriesFiles || !parentDirFiles) {
          res.status(404).json({ success: false })
        }

        res.status(200).json({
          success: true,
          data: [
            {
              name: directory,
              files: parentDirFiles,
            },
            ...subDirectoriesFiles.map((subDirectoryFiles, index) => {
              return {
                name: subDirectories[index],
                files: subDirectoryFiles,
              }
            }),
          ],
        })
      } catch (e) {
        res.status(400).json({ success: false, error: e.message })
      }
      break
  }
}
