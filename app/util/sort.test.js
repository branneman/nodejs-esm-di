import factory from './sort.js'

const { numberAscending, stringAlphabetical } = factory()

describe('numberAscending()', () => {
  it('subtracts arg1 from arg2', () => {
    const result = [
      numberAscending(10, 5),
      numberAscending(5, 10),
      numberAscending(5, 5),
    ]

    expect(result).toEqual([5, -5, 0])
  })

  it('sorts ascending', () => {
    const result = [5, -5, 0].sort(numberAscending)

    expect(result).toEqual([-5, 0, 5])
  })
})

describe('stringAlphabetical()', () => {
  it('en-US: sorts sensibly', () => {
    const locale = 'en-US'
    const predicate = stringAlphabetical(locale)

    const result = [
      predicate('foo', 'bar'),
      predicate('réservé', 'reserve'),
      predicate('reserve', 'réservé'),
      predicate('equal', 'equal'),
    ]

    expect(result).toEqual([1, 0, 0, 0])
  })

  it('zh: sorts sensibly', () => {
    const locale = 'zh'
    const predicate = stringAlphabetical(locale)

    const result = [predicate('一', '二'), predicate('二', '一')]

    expect(result).toEqual([1, -1])
  })
})
