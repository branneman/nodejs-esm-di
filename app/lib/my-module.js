import { stringAlphabetical } from 'app/util/sort'

export default function MyModule() {
  const s = ['foo', 'bar'].sort(stringAlphabetical)
  return `Not mapped, loaded default! (${s})`
}
