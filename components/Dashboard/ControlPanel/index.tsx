import React from 'react'
import classnames from 'classnames'

import { pick, playAudio } from '../../../helpers/hlp_game'
import { useModel } from '../../../models/lib_usemodel'

export default function ControlPanel () {
  const { reset, switchChancesPanel, showPanel, threeChoiceType, threeChoice1, threeChoice2, threeChoice3 } = useModel('useGameModel', (model) => pick(model, 'reset', 'switchChancesPanel', 'showPanel', 'threeChoiceType', 'threeChoice1', 'threeChoice2', 'threeChoice3'))

  return (
		<div className='bg-green-800 w-[350px] ml-[24px] border border-solid border-green-600'>
				<div className='flex justify-center items-center my-4'>
					<button
						className="px-4 py-1 text-sm text-green-50 font-normal rounded border border-green-200 hover:text-white hover:bg-green-400 hover:border-transparent focus:outline-none w-[92px]"
						onClick={() => { reset(); playAudio('shuffle') }}
					>
							重新开始
					</button>
					<button
						className="ml-6 px-2 py-1 text-sm text-green-400 font-normal rounded border border-green-200 hover:text-white hover:bg-green-400 hover:border-transparent focus:outline-none w-[160px] "
						onClick={switchChancesPanel}
					>
							{showPanel ? '>> 关闭提示面板' : '>> 显示提示面板'}
					</button>
				</div>

				<div className='grid grid-cols-1 divide-y divide-green-600'><div></div><div></div></div>
				<div className='flex justify-center items-center my-2'>
					<button
							className={classnames('m-2', 'px-2', 'py-0', 'text-sm', 'text-green-400', 'font-thin', 'rounded', 'border', 'border-green-200', 'hover:text-white', 'hover:bg-green-400', 'hover:border-transparent', 'focus:outline-none', { 'text-yellow-400': threeChoiceType.typeId === 1 })}
							onClick={() => { threeChoice1() }}
							onContextMenu={ (e) => {
							  e.preventDefault()
							  alert('雷霆猛击: 你可以忽略任何阻拦消除任意两块相同的牌,很好,很强大。但不会解除无法移动的限制。最多可使用8次。')
							}
							}
					>
							{'雷霆猛击(' + threeChoiceType.left + ')'}
					</button>
					<button
							className={classnames('m-2', 'px-2', 'py-0', 'text-sm', 'text-green-400', 'font-thin', 'rounded', 'border', 'border-green-200', 'hover:text-white', 'hover:bg-green-400', 'hover:border-transparent', 'focus:outline-none', { 'text-yellow-400': threeChoiceType.typeId === 2 })}
							onClick={ () => { threeChoice2() }}
							onContextMenu={(e) => {
							  e.preventDefault()
							  alert('愤然前行: 你可以忽略必须消牌的限制,强制移动一组牌,但不能有阻碍。最多可使用8次。')
							}
							}
					>
							{'愤然前行(' + threeChoiceType.left + ')'}
					</button>
					<button
							className={classnames('m-2', 'px-2', 'py-0', 'text-sm', 'text-green-400', 'font-thin', 'rounded', 'border', 'border-green-200', 'hover:text-white', 'hover:bg-green-400', 'hover:border-transparent', 'focus:outline-none', { 'text-yellow-400': threeChoiceType.typeId === 3 })}
							onClick={() => { threeChoice3() }}
							onContextMenu={ (e) => {
							  e.preventDefault()
							  alert('单枪匹马: 你可以忽略必须消牌的限制,强制移动一组牌,但不能有阻碍。最多可使用8次。')
							}
							}
					>
							{'单枪匹马(' + threeChoiceType.left + ')'}
					</button>
				</div>
		</div>
  )
}
