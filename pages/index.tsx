import React from 'react'

import Header from '../components/Header'
import Board from '../components/Board'
import Dashboard from '../components/Dashboard'

export default function pageMJ () {
  return (
		<div className='w-full bg-green-900'>
			<div className='md:container mx-auto md:w-[750px] md:border-4  border-solid border-green-700 rounded flex flex-col md:p-2.5 bg-green-900'>
				<Header/>
				<Board/>
				<Dashboard/>
			</div>
		</div>
  )
}
