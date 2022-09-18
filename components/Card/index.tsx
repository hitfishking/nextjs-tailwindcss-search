import React, { useState, useEffect } from 'react'
import classnames from 'classnames'
import Image from 'next/image'
import { motion } from 'framer-motion'
import _ from 'lodash'

import { Board2, Cell, MoveInfoType, GAME_STATUS, AllChances, ThreeChoiceType } from '../../types/I_YiYiKan'
import { getImage } from '../../helpers/hlp_card_names'
import { pick } from '../../helpers/hlp_game'
import { useModel } from '../../models/lib_usemodel'

import { rm_f2f_pair, rm_samename_pair, is_boardcleared, find_all_chances, move_trainbody, move_trainhead } from '../../helpers/hlp_yiyikan_backend'

type ICardProps = {
	curBoard: Board2,
	lastCell: Cell,
	cell: Cell,
	onClickFunc: (cell:Cell)=>void,
	movePair: [MoveInfoType, Cell],
	f2fCells: [Cell, Cell],
  threeChoiceType: ThreeChoiceType,
	setGameStatus: any,
	setCurBoard: any,
	setChances: any,
	setLastCell: any,
	setF2FCells: any,
	setMovePair: any,
	setThreeChoiceType:any,
	histBoards: Board2,
	addToHistBoard: any,
	setHistBoards: any,
	style?: React.CSSProperties
}

// 点击一个Card，会导致Context触发140次Card的render/后联；
//   Card订阅Context，Context会直接触发Card的render；
//   因为每个Card实例函数都执行useModel()，都会注册一次自己，故Context中有140个Card订阅者；
//   因此，一旦Context发生变化(因为Executor发生变化)，140个订阅者Card实例都会被render/后联；
// 为减少点击一个Card时的不必要的140个Card的render/后联，尝试在父组件Board中使用useModel，
//   而子组件Card中使用从父组件Board中传递下来的selectCell()函数；
export default function Card ({ curBoard, lastCell, cell, onClickFunc, movePair, setMovePair, f2fCells, setF2FCells, setGameStatus, setCurBoard, setChances, setLastCell, threeChoiceType, setThreeChoiceType, histBoards, addToHistBoard, setHistBoards, style }:ICardProps) {
  // const { selectCell, lastCell } = useModel('useGameModel', (model) => pick(model, 'selectCell', 'lastCell'))
  const [isF2F, setIsF2F] = useState(false)
  const [needToMove, setNeedToMove] = useState(false)

  const isCellInBody = (cell:Cell, body:Cell[]):boolean => {
    return body.some((el) => el.id === cell.id)
  }

  // Model中的setMovePair([moveInfo, cell])会导致Board和Card渲染；Card渲染后联函数修改自身状态，触发再一轮的渲染；
  useEffect(() => {
    // 只对满足条件的card(仅moveInfo.body中的cell)做后联处理...
    if (movePair && movePair[0] && movePair[1] && movePair[0].isMovable && isCellInBody(cell, movePair[0].body)) {
      console.log('--------isMovable----------------')
      if (threeChoiceType.typeId === 3 && (movePair[0].body[0].id !== cell.id)) {
        setNeedToMove(false) // 单枪匹马模式，且不是head，则不设置动画
      } else {
        setNeedToMove(true)
      }
      // 设moveInfo.body长度为4，则有4个card组件被setState(),故后续会发生4次useEffect()调用.
      // 这4次useEffect()调用，lastCell不变(字-空的'字'),但cell是变的, 即符合is_in_body()的那4个cell.
      // ??为什么这4次side effect中，是4个body的cell，而没有希望的"字-空"，即cell是Blank的情况?
      // 答:因为此后联函数的运行，满足运行条件的cell都是满足is_in_body()的cell，lastCell就是body中的第一个cell.

      // 此条件的构建理由见上面注释；设置较严格的条件，因为改变board的工作仅需做一次，在一个car(head)的后联中做即可；
      // 该后联中再使用一个setTimeout()延时，目的是令动画有时间显示完.
      // [注意]: movePair[0].body虽是clone的(在is_movable()中clone的)，但其pos和id与curBoard保持一致，可使用.
      if (movePair[1] && cell && (movePair[0].body[0].id === cell.id)) {
        console.log('--------movePair[], cell--------------')
      	console.log(movePair, cell)

        setTimeout(() => {
          console.log('--------UUUUUUUUU----------------')
          setLastCell(null)
          setMovePair(null) // Model状态复原

          let newBoard = null
          const clnedBoard = _.cloneDeep(curBoard)
          if (threeChoiceType.typeId === 0 || threeChoiceType.typeId === 2) { // 正常模式, 愤然前行
            newBoard = move_trainbody(movePair[0].body[0], movePair[1], curBoard)
          } else if (threeChoiceType.typeId === 3) { // 单枪匹马
            newBoard = move_trainhead(movePair[0].body[0], movePair[1], curBoard)
          } else {
            console.log('===[Error]: 当前进入了雷霆猛击模式,却要进行移动,程序故障,须检查!=======')
          }

          if (threeChoiceType.typeId === 2 || threeChoiceType.typeId === 3) { // 愤然前行，单枪匹马
            setThreeChoiceType({ typeId: 0, left: threeChoiceType.left - 1 })
          }
          addToHistBoard(clnedBoard)
          setCurBoard(newBoard)
          const newChances = find_all_chances(newBoard)
          setChances(newChances)
        }, 2) // 慢一点，让动画有机会显露出来.
      }

      return () => {
        setNeedToMove(false) // 本card本次render用true状态渲染界面，下一次render时则把状态复原.
      }
    }
  }, [movePair])

  // Model中的setF2FCells([lastCell, cell])会导致Board和Card渲染; Card渲染后联函数修改自身状态，触发再一轮的渲染；
  useEffect(() => {
    // 只对满足条件的card(仅2个)做后联处理...
    if (f2fCells[0] && f2fCells[1] && (cell.id === f2fCells[0].id || cell.id === f2fCells[1].id)) {
      console.log('--------isF2F----------------')
      setIsF2F(true)

      // 此条件的构建理由见上面注释；设置较严格的条件，因为改变board的工作仅需做一次，在一个card的后联中做即可；
      // 该后联中再使用一个setTimeout()延时，目的是令动画有时间显示完.
      if (lastCell && cell && (lastCell.name === cell.name) && (lastCell !== cell)) {
        setTimeout(() => {
          console.log('--------TTTTTTTTTTTT----------------')
          setLastCell(null)
          setF2FCells([null, null]) // Model状态复原

          let newBoard = null
          const clnedBoard = _.cloneDeep(curBoard) // 为了保存hist
          if (threeChoiceType.typeId === 0) {
            newBoard = rm_f2f_pair(lastCell, cell, curBoard)
          } else if (threeChoiceType.typeId === 1) { // 雷霆猛击
            setThreeChoiceType({ typeId: 0, left: threeChoiceType.left - 1 })
            newBoard = rm_samename_pair(lastCell, cell, curBoard)
          } else {
            console.log('===[Error]: 出现了非常规模式或雷霆猛击模式下的"对脸"操作!=======')
          }
          if (is_boardcleared(newBoard)) { // 如果清盘，则直接设置结束状态，清历史数组借款，不用做常规操作了.
            setGameStatus(GAME_STATUS.PASS)
            setHistBoards([])
          } else {
            addToHistBoard(clnedBoard)
            setCurBoard(newBoard)
            const newChances = find_all_chances(newBoard)
            setChances(newChances)
          }
        }, 200) // 慢一点，让动画有机会显露出来.
      }

      return () => {
        setIsF2F(false) // 本Comp状态复原
      }
    }
  }, [f2fCells])

  let moveX = false
  let moveInfo = null
  if (movePair && needToMove) {
    moveInfo = movePair[0]
    if (['Up', 'Down'].includes(moveInfo.direction)) moveX = false; else moveX = true
  }

  console.log('---------In Card--------------')
  const squareCard = (
	  <motion.div
		className="md:w-[48px] md:h-[59px] mr-[0px] mb-[0px] cursor-pointer relative border border-solid border-green-200 hover:border-2 hover:border-red-400 hover:z-50"
		onClick={ () => { onClickFunc(cell) } }
		style={style}
		animate={{
		  scale: isF2F ? 1.2 : 1,
		  x: moveInfo && moveX ? (moveInfo.direction === 'Right') ? moveInfo.span * 48 : -moveInfo.span * 48 : 0,
		  y: moveInfo && !moveX ? (moveInfo.direction === 'Down') ? moveInfo.span * 59 : -moveInfo.span * 59 : 0
		}}
		// 动画时长不能太长，否则后续的useEffect()的newBoard会触发新渲染，覆盖本效果.
		transition={{ type: 'spring', duration: 0.5, bounce: 0.01, damping: 80, stiffness: 50, mass: 0.03, velocity: 0.05 }}
		// whileHover={{ scale: 1.0 }}
		// whileTap={{ scale: 0.9 }}
		// whileFocus={{ scale: 1.5 }}
		>
			<div className={classnames('w-full h-full relative')}>
        <img
          className="absolute block w-full h-full  bg-blue-600"
          src={getImage(cell.name)}
          alt="card"
        />
			</div>
		</motion.div>
	 )
  const squareBlank = (
	  <div className="md:w-[48px] md:h-[59px] mr-[0px] mb-[0px] relative border border-solid border-green-200 hover:border-2 hover:border-red-400"
		onClick={() => onClickFunc(cell)}
		style={style}
		>
			<div className={classnames('w-full h-full relative')}>
			</div>
		</div>
  )

  return (cell.name !== 'Blank') ? squareCard : squareBlank
}
