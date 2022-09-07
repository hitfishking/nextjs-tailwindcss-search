import { useCallback, useEffect, useRef, useState } from 'react'
import {
  Board2,
  Head,
  Cell,
  AllChances,
  GAME_STATUS
} from '../types/I_YiYiKan'

import {
  get_trainheads,
  get_trainbody,
  is_movable,
  is_boardcleared,
  move_trainbody,
  move_trainhead,
  train_roam,
  is_f2f,
  rm_f2f_pair,
  rm_samename_pair,
  f2f_in_board,
  f2f_in_boards,
  find_all_chances
} from '../helpers/hlp_yiyikan_backend'
import { shuffleBoard2 } from '../helpers/hlp_yiyikan_shuffle'

// import { board_2cardsleft } from '../__tests__/fixture/Board_Arr2D'

type ThreeChoiceType = {
	typeId: 0|1|2|3;
	left: number
}

// [注意]:存储useGameModel()中各状态槽的fiber其实是<Provider>下的<Executor>的fiber;
//       <Card>组件的fiber中存储的是<Executor>的fiber中的状态槽的子集的指针.
export default function useGameModel () {
  const [curBoard, setCurBoard] = useState<Board2>(shuffleBoard2()) // 当前盘面,带初始化函数.
 	const [lastCell, setLastCell] = useState<Cell>(null)
  const [chances, setChances] = useState<AllChances>(find_all_chances(curBoard))
  const [gameStatus, setGameStatus] = useState(GAME_STATUS.READY)
  const [showPanel, setShowPanel] = useState(true)
  const [lastActType, setLastActType] = useState<'Init'|'Move'|'F2Fed'>('Init')
  const [threeChoiceType, setThreeChoiceType] = useState<ThreeChoiceType>({ typeId: 0, left: 8 })
  // ----------------------------
  // 用户动作
  // [注意]: useCallbck()存在闭包问题，故依赖的变量变化，fiber中存储的cb()函数也要相应更新，闭包中的变量才一致.
  const selectCell = useCallback((cell:Cell) => {
    if (!cell) return
    switch (threeChoiceType.typeId) {
      case 0: // 正常模式
        // 以下是接收左牌的逻辑...
        if (lastCell === null) {
          if (cell.name === 'Blank') return // 左牌不允许是Blank
          else {
            setLastCell(cell); console.log('setted A: ' + cell.name); console.log(lastCell)
            // Executor中的setState()，会导致Executor的状态变化，并当即将新状态update到dispatcher中，后者引发<UserComp>render。  本例实验证明：<UserComp>(<Card>)调用Executor中Model的selectCell()槽函数，改变Model状态，改变Executor中Model状态，update到dispatcher，并引发<Card>渲染，引发其中useEffect()中的setState(),引发<Card>重绘。
            // ?? 为什是先运行useEffect(),调用了setState()后，才会render <Card>?
            return
          }
        }

        // 以下是接收右牌的逻辑...
        if (lastCell === cell) return // 点击同一个cell无任何操作
        if (cell.name === 'Blank') {
          if (lastActType !== 'F2Fed') { alert('要先消除一对牌，才能移动！'); setLastCell(null); return }
          if (is_movable(lastCell, cell, curBoard)) { // 字-空，且可move
            // alert('movable!')
            setLastCell(null) // console.log('setted null 1-1.')
            setLastActType('Move') // 记录上一步的动作
            const newBoard:Board2 = move_trainbody(lastCell, cell, curBoard) // !! 将body移动到cell处..
            setCurBoard(newBoard)
            const newChances:AllChances = find_all_chances(newBoard)
            setChances(newChances)
            return
          } else { // 字-空，但不可move
            setLastCell(null) // console.log('setted null 1-2.')
            return
          }
        }
        if (lastCell.name === cell.name) {
          if (is_f2f(cell, lastCell, curBoard)) { // 字-字，且对脸
            // alert('face to face!')
            setLastCell(null) // console.log('setted null 2-1.')
            setLastActType('F2Fed') // 记录上一步的动作
            // 下面就是从board中消除此二card.
            const newBoard = rm_f2f_pair(lastCell, cell, curBoard)
            if (is_boardcleared(newBoard)) { setGameStatus(GAME_STATUS.PASS) } // 只改变状态，后续逻辑继续进行

            setCurBoard(newBoard)
            const newChances:AllChances = find_all_chances(newBoard)
            setChances(newChances)
            return
          } else {
            setLastCell(null) // console.log('setted B: ' + cell.name)
            return
          }
        }
        if (lastCell.name !== cell.name) { // 剩余情况都在这个分支中. 非move，非对脸，直接清空.
          setLastCell(null) // console.log('other branch... ')
        }
        break

      case 1: // 雷霆猛击
        // 以下是接收左牌的逻辑...
			  if (lastCell === null) {
          if (cell.name === 'Blank') return // 左牌不允许是Blank
          else {
            setLastCell(cell); console.log('setted A: ' + cell.name); console.log(lastCell)
          }
        }

		  	// 以下是接收右牌的逻辑...
        if (lastCell === cell) return // 点击同一个cell无任何操作
        if (lastCell.name !== cell.name) { return } // 2个cell名称不同，不做任何处理.
        if (lastCell.name === cell.name) {
          setLastCell(null)
          setThreeChoiceType({ typeId: 0, left: threeChoiceType.left })
          setLastActType('F2Fed') // 记录上一步的动作
          const newBoard = rm_samename_pair(lastCell, cell, curBoard)
 					if (is_boardcleared(newBoard)) { setGameStatus(GAME_STATUS.PASS) } // 只改变状态，后续逻辑继续进行

          setCurBoard(newBoard)
          const newChances:AllChances = find_all_chances(newBoard)
          setChances(newChances)
        }
        break

      case 2: // 愤然前行
			  // 以下是接收左牌的逻辑...
			  if (lastCell === null) {
          if (cell.name === 'Blank') return // 左牌不允许是Blank
          else {
            setLastCell(cell); console.log('setted A: ' + cell.name); console.log(lastCell)
          }
        }

        // 以下是接收右牌的逻辑...
        if (lastCell === cell) return // 点击同一个cell无任何操作
        if (cell.name !== 'Blank') { return } // 第二个cell应该是Blank，否则不做任何处理.
        if (cell.name === 'Blank') {
          if (is_movable(lastCell, cell, curBoard)) { // 字-空，且可move
            // alert('movable!')
            setLastCell(null)
            setThreeChoiceType({ typeId: 0, left: threeChoiceType.left })
            setLastActType('Move') // 记录上一步的动作
            const newBoard:Board2 = move_trainbody(lastCell, cell, curBoard) // 将body移动到cell处..
            setCurBoard(newBoard)
            const newChances:AllChances = find_all_chances(newBoard)
            setChances(newChances)
          } else { // 字-空，但不可move
            setLastCell(null)
          }
        }
        break

      case 3: // 单枪匹马
        // 以下是接收左牌的逻辑...
			  if (lastCell === null) {
          if (cell.name === 'Blank') return // 左牌不允许是Blank
          else {
            setLastCell(cell); console.log('setted A: ' + cell.name); console.log(lastCell)
          }
        }

        // 以下是接收右牌的逻辑...
        if (lastCell === cell) return // 点击同一个cell无任何操作
        if (cell.name !== 'Blank') { return } // 第二个cell应该是Blank，否则不做任何处理.
        if (cell.name === 'Blank') {
          if (is_movable(lastCell, cell, curBoard)) { // 字-空，且可move
            // alert('movable!')
            setLastCell(null)
            setThreeChoiceType({ typeId: 0, left: threeChoiceType.left })
            setLastActType('Move') // 记录上一步的动作
            const newBoard:Board2 = move_trainhead(lastCell, cell, curBoard) // 将body移动到cell处..
            setCurBoard(newBoard)
            const newChances:AllChances = find_all_chances(newBoard)
            setChances(newChances)
          } else { // 字-空，但不可move
            setLastCell(null)
          }
        }
        break
    }
  }, [lastCell, curBoard])
  // ----------------------------
  // 游戏宏观状态
  const startGame = useCallback(() => {
    setGameStatus(GAME_STATUS.PLAYING)
  }, [])

  const endGame = useCallback(() => {
    setGameStatus(GAME_STATUS.PASS)
  }, [])

  const reset = useCallback(() => {
    setGameStatus(GAME_STATUS.READY)
    const newBoard = shuffleBoard2()
    setCurBoard(newBoard)
    const newChances:AllChances = find_all_chances(newBoard)
    setChances(newChances) // chances变化就会触发<Board>的useEffect() render.
  }, [])

  const switchChancesPanel = useCallback(() => {
    setShowPanel(!showPanel)
  }, [showPanel])

  const threeChoice1 = useCallback(() => { // 雷霆猛击，设置状态
    if (threeChoiceType.left === 0) { alert('8次机会已经用完, 不能再用了!'); return }
    setThreeChoiceType({ typeId: 1, left: threeChoiceType.left - 1 })
  }, [threeChoiceType])

  const threeChoice2 = useCallback(() => { // 愤然前行，设置状态
    if (threeChoiceType.left === 0) { alert('8次机会已经用完, 不能再用了!'); return }
    setThreeChoiceType({ typeId: 2, left: threeChoiceType.left - 1 })
  }, [threeChoiceType])

  const threeChoice3 = useCallback(() => { // 单枪匹马，设置状态
    if (threeChoiceType.left === 0) { alert('8次机会已经用完, 不能再用了!'); return }
    setThreeChoiceType({ typeId: 3, left: threeChoiceType.left - 1 })
  }, [threeChoiceType])
  return {
    curBoard,
	  lastCell,
    chances,
    gameStatus,
    selectCell,
    startGame,
    endGame,
    reset,
    showPanel,
    switchChancesPanel,
    threeChoiceType,
    threeChoice1,
    threeChoice2,
    threeChoice3
  }
}
