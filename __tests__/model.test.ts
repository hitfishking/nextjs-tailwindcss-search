/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { renderHook, act } from '@testing-library/react-hooks'
import useGameModel from '../models/useGameModel'

test('Show the starter borad', () => {
  const { result } = renderHook(() => useGameModel())
  // console.log(result.current.board_start)
})
