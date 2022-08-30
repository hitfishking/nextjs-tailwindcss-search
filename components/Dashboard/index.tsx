import React from 'react'
import ChanceInfo from './ChanceInfo'
import PlayStatus from './PlayStatus'

export default function Dashboard () {
  return (
		<div style={{ display: 'flex' }}>
			<ChanceInfo/>
			<PlayStatus/>
		</div>
  )
}
