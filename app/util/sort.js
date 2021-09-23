/**
 * Sort predicate function
 * @param {Number} a
 * @param {Number} b
 * @returns {Number} -1, 0 or 1, for use in [].sort()
 */
export function numberAscending(a, b) {
  return a - b
}

/**
 * Returns a sort predicate function
 * @example ['réservé', 'RESERVE'].sort(stringAlphabetical('fr'))
 * @see RFC 5646, BCP 47: {@link https://tools.ietf.org/html/rfc5646}
 * @param {String} locale - BCP 47 language tag (e.g. `gb`, `en-US`, `zh-yue-HK`)
 * @returns {Function(String, String): Number} -1, 0 or 1, for use in [].sort()
 */
export function stringAlphabetical(locale) {
  return (a, b) => a.localeCompare(b, locale, { sensitivity: 'base' })
}
