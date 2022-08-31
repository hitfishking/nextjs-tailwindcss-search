/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { shuffleBoard, shuffleBoard2 } from '../helpers/hlp_yiyikan_shuffle'
test('Testing shuffleCards()', () => {
  const result = shuffleBoard()
  console.log(result[135])
  // const abc = [136, 137, 138, 139].map((val) => {
  //   console.log(result[val])
  //   return 0
  // })
  console.log(result.length)
  expect(result.length).toBe(140)
  expect(result[140]).toBeUndefined()
  expect(result[135].name).not.toBe('Blank')
  expect(result[136].name).toBe('Blank')
})

test('Testing shuffleCards2()', () => {
  const result = shuffleBoard2()
  console.log(result.length)
})
