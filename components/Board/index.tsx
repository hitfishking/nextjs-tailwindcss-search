/* eslint-disable array-callback-return */
import React, { useEffect, useState, useMemo } from 'react'

import { pick } from '../../helpers'
import { useModel } from '../../models/lib_usemodel'
import { Cell } from '../../types/I_YiYiKan'
import Card from '../Card'

export default function Board () {
  // 为何将selectCell()传递给<Card>使用，会导致该函数setLastCell(cell)不起作用?
  // 答：因为Board组件的后联依赖变量中没有加入lastCell；加上则可实现Card触发父组件Boardrender和后联。
  const { curBoard, selectCell, lastCell, chances } = useModel('useGameModel', (model) => pick(model, 'curBoard', 'selectCell', 'lastCell', 'chances'))

  // !! 为了让selectCell()函数更新(闭包)，将lastCell变量放入到useMemo的依赖变量中，而用户每次点击Card时调用的selectCell()都会改变
  // lastCell状态，导致用户每次点击Card，父组件Board都会重新render所有Card，其最终的计算量和没有使用useMemo时是一样的，没有改善。
  const allCardsMemo = useMemo(() => {
    console.log('--------CCCCC-------------')
    return curBoard.map((aLine, idx1) => {
      return aLine.map((cell, idx2) => {
        if (idx1 !== 0 && idx2 !== 0) {
          return <Card key={cell.id} cell={cell} onClickFunc={selectCell} />
        }
      })
    })
  }, [curBoard, lastCell])

  // const allCards = curBoard.map((aLine, idx1) => {
  //   console.log('--------CCCCC-------------')
  //   return aLine.map((cell, idx2) => {
  //     if (idx1 !== 0 && idx2 !== 0) {
  //       return <Card key={cell.id} cell={cell} onClickFunc={selectCell} />
  //     }
  //   })
  // })

  // 将render阶段得到的state先保存起来,在后联阶段再setState()一次，再render一次，可以解决Hydrate前后端不一致问题。
  // 在后联阶段才改变状态槽，且只在mount时运行一次或在指定state变化时才运行，若无[]，会进入死循环!
  const [initCards, setInitCards] = useState(null)
  useEffect(() => setInitCards(allCardsMemo), [lastCell, chances])

  return (
		<div className="my-[10px] w-full py-[10px] px-[5px] flex flex-wrap justify-center items-center">
			{initCards}
			{console.log('-----BBBB------------')}
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
