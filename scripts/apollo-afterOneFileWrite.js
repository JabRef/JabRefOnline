/* eslint-disable no-console */
import fs from 'fs'

// Get the file path from the command line arguments
const filePath = process.argv[2]

// Read the file
fs.readFile(filePath, 'utf8', function (err, data) {
  if (err) {
    return console.log(err)
  }

  // Fix ts error
  const result = data.replace(
    /import { TypedDocumentNode as DocumentNode }/g,
    'import type { TypedDocumentNode as DocumentNode }',
  )

  // Write the result back to the file
  fs.writeFile(filePath, result, 'utf8', function (err) {
    if (err) return console.log(err)
  })
})
