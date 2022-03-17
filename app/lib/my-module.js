export default function MyModule({ stringAlphabetical }) {
  const s = ['foo', 'bar'].sort(stringAlphabetical)
  return `Not mapped, loaded default! (${s})`
}
