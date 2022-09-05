import React from 'react'
import ChanceInfo from './ChanceInfo'
import ControlPanel from './ControlPanel'

export default function Dashboard () {
  return (
		<div className='bg-yellow-200 flex'>
			<ControlPanel/>
			<ChanceInfo/>
		</div>
  )
}
