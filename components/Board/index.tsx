/* eslint-disable array-callback-return */
import React, { useEffect, useState, useMemo } from 'react'

import { pick } from '../../helpers'
import { useModel } from '../../models/lib_usemodel'
import Card from '../Card'

export default function Board () {
  // 为何将selectCell()传递给<Card>使用，会导致该函数setLastCell(cell)不起作用?
  // 答：因为Board组件的后联依赖变量中没有加入lastCell；加上则可实现Card触发父组件Board render和后联。
  const { curBoard, selectCell, lastCell, chances, movePair, setMovePair, f2fCells, threeChoiceType, setThreeChoiceType, setF2FCells, setGameStatus, setCurBoard, setChances, setLastCell, histBoards, addToHistBoard, setHistBoards } = useModel('useGameModel', (model) => pick(model, 'curBoard', 'selectCell', 'lastCell', 'chances', 'movePair', 'setMovePair', 'f2fCells', 'threeChoiceType', 'setThreeChoiceType', 'setF2FCells', 'setGameStatus', 'setCurBoard', 'setChances', 'setLastCell', 'histBoards', 'addToHistBoard', 'setHistBoards'))

  // [!]为了让selectCell()函数更新(闭包)，将lastCell变量放入到useMemo的依赖变量中，而用户每次点击Card时调用的selectCell()都会改变lastCell状态，导致用户每次点击Card，父组件Board都会重新render所有Card，其最终的计算量和没有使用useMemo时是一样的，没有改善。
  const allCardsMemo = useMemo(() => {
    console.log('--------CCCCC-------------')
    return curBoard.map((aLine, idx1) => {
      return aLine.map((cell, idx2) => {
        if (idx1 !== 0 && idx2 !== 0) {
          return <Card key={cell.id} curBoard={curBoard} lastCell={lastCell} cell={cell} onClickFunc={selectCell} movePair={movePair} setMovePair={setMovePair} f2fCells={f2fCells} threeChoiceType={threeChoiceType} setThreeChoiceType={setThreeChoiceType} setF2FCells={setF2FCells} setGameStatus={setGameStatus} setCurBoard={setCurBoard} setChances={setChances} setLastCell={setLastCell} histBoards={histBoards} addToHistBoard={addToHistBoard} setHistBoards={setHistBoards}/>
        }
      })
    })
  }, [curBoard, lastCell, f2fCells, movePair, histBoards])
  // 当f2fCells时，useEffect()会触发，设置initCards，意欲触发重新渲染board；其渲染的数据是allCardsMemo；
  // 若allCardsMemo的依赖变量中没有f2fCells，则每次f2fCells情况下触发的渲染，仍然是以前保存在allCardsMemo中的旧board，
  // 表现就是board不变，Card内部函数未执行。为了让board在每次f2f时渲染，以体现消除+动画，就应该让allCardsMemo在f2fCells时
  // 重新计算board，也就是allCardsMemo依赖变量列表中包含f2fCells这个变量。

  // 将render阶段得到的state先保存起来,在后联阶段再setState()一次，再render一次，可以解决Hydrate前后端不一致问题。
  // 在后联阶段才改变状态槽，且只在mount时运行一次或在指定state变化时才运行，若无[]，会进入死循环!
  const [initCards, setInitCards] = useState(null)
  useEffect(() => setInitCards(allCardsMemo), [lastCell, chances, f2fCells, movePair, histBoards])

  return (
		<div className="my-[10px] w-full py-[10px] px-[5px] flex flex-wrap justify-center items-center">
			{initCards}
			{console.log('-----BBBB----------')}
		</div>
  )
}

// ----------------------------------------------
// 老版本：直接在render期间生成随机board，并显示出所有card;
// 存在的问题是：浏览器侧随机生成数字，与服务器侧预渲染随机生成数据不匹配。
// 根据https://nextjs.org/docs/messages/react-hydration-error，对代码方案进行改造。
// 每次render生成随机数，但并不立即更改initBoard来显示这些cards，而是放到render之后的useEffec()中显示cards.
// export default function Board () {
//   const shuffledBoard = shuffleCards2()
//   return (
// 		<>
// 			<h1>Board</h1>
// 			{
// 				shuffledBoard.map((aLine, idx1) => {
// 				  return aLine.map((cell, idx2) => {
// 				    if (idx1 !== 0 && idx2 !== 0) {
// 				      return (
// 								<Card key={cell.id} card={cell}/>
// 				    	)
// 				    }
// 				  })
// 				})
// 			}
// 		</>
//   )
// }
// ----------------------------------------------
// const shuffledBoard = shuffleCards2() // 调用helper函数，生成初始随机board盘面数据.
// const allCardsComps = shuffledBoard.map((aLine, idx1) => {
// 			  return aLine.map((cell, idx2) => {
// 			    if (idx1 !== 0 && idx2 !== 0) {
// 			      return (
// 							<Card key={cell.id} card={cell}/>
// 			    	)
// 			    }
// 			  })
// 		 })

// const [initBoard, setInitBoard] = useState(null)
// useEffect(() => setInitBoard(allCardsComps), [])
