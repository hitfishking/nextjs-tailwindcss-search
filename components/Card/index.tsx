import React from 'react'
import classnames from 'classnames'
import Image from 'next/image'

import { Cell } from '../../types/I_YiYiKan'
import { getImage } from '../../helpers/hlp_card_names'
import { pick } from '../../helpers/hlp_game'
import { useModel } from '../../models/lib_usemodel'

type ICardProps = {
	cell: Cell,
	onClickFunc: (cell:Cell)=>void,
	style?: React.CSSProperties
}

// 点击一个Card，会导致Context触发140次Card的render/后联；
//   Card订阅Context，Context会直接触发Card的render；
//   因为每个Card实例函数都执行useModel()，都会注册一次自己，故Context中有140个Card订阅者；
//   因此，一旦Context发生变化(因为Executor发生变化)，140个订阅者Card实例都会被render/后联；
// 为减少点击一个Card时的不必要的140个Card的render/后联，尝试在父组件Board中使用useModel，
//   而子组件Card中使用从父组件Board中传递下来的selectCell()函数；
export default function Card ({ cell, onClickFunc, style }:ICardProps) {
  // const { selectCell, lastCell } = useModel('useGameModel', (model) => pick(model, 'selectCell', 'lastCell'))
  console.log('---------In Card--------------')
  const squareCard = (
	  <div
		className="md:w-[48px] md:h-[59px] mr-[0px] mb-[0px] cursor-pointer relative border border-solid border-green-200 hover:border-2 hover:border-red-400"
		onClick={ () => onClickFunc(cell) }
		style={style}
		>
			<div className={classnames('w-full h-full relative')}>
        <img
          className="absolute block w-full h-full  bg-blue-600"
          src={getImage(cell.name)}
          alt="card"
        />
			</div>
		</div>
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
