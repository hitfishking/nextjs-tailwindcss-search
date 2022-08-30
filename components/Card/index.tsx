import React from 'react'
import { Cell } from '../../types'

interface ICardProps {
	card: Cell
}

export default function Card ({ card }:ICardProps) {
  return (
		<div>
			{card.name}
			<span>
				[
				<span>{card.pos.x}</span>
				,
				<span>{card.pos.y}</span>
				]
			</span>
		</div>
  )
}
