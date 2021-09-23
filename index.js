// Enforce working dir to current folder
import { dirname } from 'path'
import { fileURLToPath } from 'url'
process.chdir(dirname(fileURLToPath(import.meta.url)))

// Load package.json
import { readFile } from 'fs/promises'
const pkg = JSON.parse(
  await readFile(new URL('./package.json', import.meta.url))
)

// Enforce the specified Node.js version
const version = `v${pkg.engines.node}`
if (process.version !== version) {
  console.error(
    'Error: Node.js version mismatch!\n' +
      ` Required ${version}\n Detected ${process.version}`
  )
  process.exit(1)
}

// Supports sorthand syntax for `app/`-prefixed strings:
import fn from 'app/lib/my-module'
console.log(fn())

// Supports relative paths:
import { numberAscending } from './app/util/sort.js'
console.log('answer:', numberAscending(50, 8))
