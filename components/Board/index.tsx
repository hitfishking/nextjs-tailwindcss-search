/* eslint-disable array-callback-return */
import React, { useEffect, useState } from 'react'

import Card from '../Card'
import { shuffleCards2, pick } from '../../helpers'
import { useModel } from '../../models/lib_usemodel'

export default function Board () {
  const { curBoard, setCurBoard } = useModel('useGameModel', (model) => pick(model, 'curBoard', 'setCurBoard'))

  // Model中只存储当前盘面二维数组(Board2类型)，将其映射为可视的<Card>集合，是<UserComp>组件的工作。
  const allCardsComps = curBoard.map((aLine, idx1) => {
    return aLine.map((cell, idx2) => {
      if (idx1 !== 0 && idx2 !== 0) {
        return (
					<Card key={cell.id} card={cell}/>
        )
      }
    })
  })

  // 将CardDesk页单独保存起来,JSX中显示状态intiCards,以便解决Hydrate前后端不一致问题。
  const [initCards, setInitCards] = useState(null)
  useEffect(() => setInitCards(allCardsComps), [])

  return (
		<>
			<h1>Board</h1>
			{
				initCards
			}
		</>
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
