import { useCallback, useEffect, useRef, useState } from 'react'
import { board_start } from '../__tests__/fixture/Board_Arr2D'
import {
  Board2,
  Head,
  Cell,
  Chances,
  GAME_STATUS
} from '../types/I_YiYiKan'

import {
  get_trainheads,
  get_trainbody,
  move_trainbody,
  train_roam,
  is_f2f,
  f2f_in_board,
  f2f_in_boards,
  find_all_chances
} from '../helpers/hlp_yiyikan_backend'

import { shuffleBoard2 } from '../helpers/hlp_yiyikan_shuffle'

export default function useGameModel () {
  const [curBoard, setCurBoard] = useState<Board2>(shuffleBoard2()) // 当前盘面,带初始化函数.
 	const [lastCard, setLastCard] = useState<Cell>()
  const [chances, setChances] = useState<Chances>(null)
  const [gameStatus, setGameStatus] = useState(GAME_STATUS.READY)

  // ----------------------------
  // 游戏宏观状态
  const reset = useCallback(() => {
    setGameStatus(GAME_STATUS.READY)
    setCurBoard(shuffleBoard2())
  }, [])

  const startGame = useCallback(() => {
    setGameStatus(GAME_STATUS.PLAYING)
  }, [])

  const endGame = useCallback(() => {
    setGameStatus(GAME_STATUS.PASS)
  }, [])

  // ----------------------------
  // playing状态中的子状态
  const is_train_movable = useCallback(() => {

  }, [])

  const move_train = useCallback(() => {

  }, [])

  const is_f2f = useCallback(() => {

  }, [])

  const remove_f2f_cards = useCallback(() => {

  }, [])

  return {
    board_start,
    curBoard,
    setCurBoard,
    chances,
    setChances
  }
}
