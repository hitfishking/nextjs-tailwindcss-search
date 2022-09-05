import React from 'react'
import { pick } from '../../../helpers/hlp_game'
import { useModel } from '../../../models/lib_usemodel'

export default function ControlPanel () {
  const { reset, switchChancesPanel, showPanel } = useModel('useGameModel', (model) => pick(model, 'reset', 'switchChancesPanel', 'showPanel'))

  return (
		<div className='bg-green-700 w-[350px] ml-[24px] border border-solid border-green-100'>
			<div className=''>
				<button
					className="m-3 px-4 py-1 text-sm text-green-50 font-normal rounded border border-green-200 hover:text-white hover:bg-green-400 hover:border-transparent focus:outline-none w-[92px]"
					onClick={reset}
				>
						重新开始
				</button>
				<button
					className="m-3 px-4 py-1 text-sm text-green-400 font-normal rounded border border-green-200 hover:text-white hover:bg-green-400 hover:border-transparent focus:outline-none w-[160px] block"
					onClick={switchChancesPanel}
				>
						{showPanel ? '关闭提示面板 -->' : '显示提示面板 -->'}
				</button>
			</div>
		</div>
  )
}
