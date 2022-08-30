import { useCallback, useEffect, useRef, useState } from 'react'
import { board_start } from '../__tests__/fixture/Board_Arr2D'
import {
  Board2,
  Train_Head,
  Cell,
  Chances
} from '@/types'

import {
  create_board,
  get_train_heads,
  helper_get_trainbody,
  helper_move_trainbody,
  train_walk,
  is_f2f,
  f2f_in_board,
  f2f_in_boards,
  find_all_chances
} from '../libs/lib_base'

import { shuffleCards2 } from '../helpers'

export default function useGameModel () {
  const [curBoard, setCurBoard] = useState<Board2>(shuffleCards2()) // 当前盘面,带初始化函数.
  const [status, setStatus] = useState()
  const [chances, setChances] = useState<Chances>(null)

  // const create_board1 = useCallback(() => create_board(), [])
  // const create_board2 = useCallback(create_board, [])

  // useEffect(() => {
  //   const abc = create_board2()
  //   setCurBoard(abc)
  // }, [])

  return {
    curBoard,
    setCurBoard,
    chances,
    setChances,
    board_start
  }
}
