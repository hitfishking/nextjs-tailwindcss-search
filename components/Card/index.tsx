import React from 'react'
import classnames from 'classnames'

import { Cell } from '../../types/I_YiYiKan'
import { getImage } from '../../helpers/hlp_card_names'
import { pick } from '../../helpers/hlp_game'
import { useModel } from '../../models/lib_usemodel'

type ICardProps = {
	cell: Cell,
	onClickFunc: (cell:Cell)=>void,
	style?: React.CSSProperties
}

export default function Card ({ cell, onClickFunc, style }:ICardProps) {
  const { selectCell, lastCell } = useModel('useGameModel', (model) => pick(model, 'selectCell', 'lastCell'))
  console.log('---------In Card--------------')
  const squareCard = (
	  <div
		className="md:w-[48px] md:h-[59px] mr-[0px] mb-[0px] cursor-pointer relative border border-solid border-green-200 hover:border-2 hover:border-red-400"
		onClick={() => selectCell(cell)}
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
		onClick={() => selectCell(cell)}
		style={style}
		>
			<div className={classnames('w-full h-full relative')}>
			</div>
		</div>
  )

  return (cell.name !== 'Blank') ? squareCard : squareBlank
}
