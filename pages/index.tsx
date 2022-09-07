import React from 'react'
import classnames from 'classnames'

import { pick } from '../helpers'
import { useModel } from '../models/lib_usemodel'
import { GAME_STATUS } from '../types/I_YiYiKan'
import Header from '../components/Header'
import Board from '../components/Board'
import Dashboard from '../components/Dashboard'

export default function pageMJ () {
  const { gameStatus } = useModel('useGameModel', (model) => pick(model, 'gameStatus'))

  return (
		<div className='w-full bg-green-900'>
			<div className='md:container mx-auto md:w-[750px] md:border-4  border-solid border-green-900 rounded flex flex-col md:p-2.5 bg-green-900'>
				<Header/>
				<div className=''>
					<Board/>
					<img 	src='/end_message.png'
								className = {classnames({ invisible: gameStatus !== GAME_STATUS.PASS })}
								style={{ position: 'absolute', left: 150, top: 210 }}/>
				</div>
				<Dashboard/>
			</div>
		</div>
  )
}
