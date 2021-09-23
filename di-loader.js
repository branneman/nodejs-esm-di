import { readFile } from 'fs/promises'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

// Load DI mapping configuration JSON
const diMapping = JSON.parse(
  await readFile(new URL('./di-mapping.json', import.meta.url))
)
const __dirname = dirname(fileURLToPath(import.meta.url))

/**
 * Module Loaders hook: resolve
 *  The resolve hook returns the resolved file URL.
 *
 * @param {String} specifier
 * @param {{
 *   conditions: !Array<String>,
 *   parentURL: !(String | undefined),
 * }} context
 * @param {Function} defaultResolve
 * @returns {Promise<{ url: String }>}
 */
export function resolve(specifier, context, defaultResolve) {
  // Resolve: ./app/lib/my-module.js
  const isSrcFile = specifier.startsWith(`file://${__dirname}`)
  if (isSrcFile) {
    return { url: mapper(specifier) }
  }

  // Resolve: app/lib/my-lib
  const isApp = specifier.startsWith('app/')
  if (isApp) {
    return { url: `file://${__dirname}/${mapper(specifier)}.js` }
  }

  // Defer to Node.js for all other specifiers.
  return defaultResolve(specifier, context, defaultResolve)
}

/**
 *
 * @param {String} specifier
 * @returns {String}
 */
export function mapper(specifier) {
  if (diMapping[specifier]) return diMapping[specifier]
  return specifier
}
