/* eslint-disable array-callback-return */
import React, { useEffect, useState } from 'react'

import { pick } from '../../helpers'
import { useModel } from '../../models/lib_usemodel'
import Card from '../Card'

export default function Board () {
  // ??? 为何将selectCell()传递给<Card>使用，会导致该函数setLastCell(cell)不起作用? 代码基本保留，待以后研究。
  const { curBoard, selectCell, lastCell, boardUuid, chances } = useModel('useGameModel', (model) => pick(model, 'curBoard', 'selectCell', 'lastCell', 'boardUuid', 'chances'))

  const allCards = curBoard.map((aLine, idx1) => {
    console.log('--------CCCCC-------------')
    return aLine.map((cell, idx2) => {
      if (idx1 !== 0 && idx2 !== 0) {
        return <Card key={cell.id} cell={cell} onClickFunc={selectCell} />
      }
    })
  })

  // 将render阶段得到的state先保存起来,在后联阶段在setState()一次，再render一次，可以解决Hydrate前后端不一致问题。
  // 在后联阶段才改变状态槽，且只在mount时运行一次或在指定state变化时才运行，若无[]，会进入死循环!
  const [initCards, setInitCards] = useState(null)
  useEffect(() => setInitCards(allCards), [lastCell, chances])

  return (
		<div className="mt-[10px] w-full py-[10px] px-[5px] flex flex-wrap justify-center items-center">
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
