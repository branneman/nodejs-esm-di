import { jest } from '@jest/globals'
import MyModule from './my-module'
import factory from '../util/sort'

const sortModule = factory()

describe('numberAscending()', () => {
  it('1', () => {
    const result = MyModule(sortModule)
    expect(result).toEqual(`Not mapped, loaded default! (foo,bar)`)
  })

  it('2', () => {
    const mockSortModule = jest
      .spyOn(sortModule, 'stringAlphabetical')
      .mockImplementation(() => -1)

    const result = MyModule(sortModule)
    expect(result).toEqual(`Not mapped, loaded default! (bar,foo)`)

    mockSortModule.mockRestore()
  })
})
