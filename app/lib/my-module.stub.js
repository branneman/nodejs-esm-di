import { stringAlphabetical } from 'app/util/sort'

export default function MyModule() {
  const s = ['foo', 'baz'].sort(stringAlphabetical)
  return `Mapped to stub! (${s})`
}
