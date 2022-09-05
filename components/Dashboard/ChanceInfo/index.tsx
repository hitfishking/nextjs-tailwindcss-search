import React, { useEffect, useState } from 'react'
import classnames from 'classnames'

import { useModel } from '../../../models/lib_usemodel'
import { pick } from '../../../helpers/hlp_game'
import { uuid } from '../../../helpers/hlp_yiyikan_shuffle'
import { getCardCName } from '../../../helpers/hlp_card_names'
import { KeysType } from '../../../types/I_YiYiKan'

export default function ChanceInfo () {
  const { chances, showPanel } = useModel('useGameModel', (model) => pick(model, 'chances', 'showPanel'))
  const [listChances, setListChances] = useState(false)
  const curChancesArr = chances ? Array.from(chances.chances_current.f2f_names) : []
  const derChancesArr = chances ? Array.from(chances.chances_derived.f2f_names) : []

  const AnyChance = () => (
		<div className='mt-2 ml-3 flex items-baseline'>
			{(chances && derChancesArr.length > 0)
			  ? <div className='text-green-400 text-[15px] font-semibold'>有机会！</div>
			  : <div className='text-red-500 text-[20px] font-semibold'>没机会了!</div>}
			<button
					className="mb-3 mt-1 ml-2 px-1 py-0 text-[2px] text-green-50 font-thin rounded border border-green-200 hover:text-white hover:bg-green-400 hover:border-transparent focus:outline-none "
					onClick={() => { setListChances(!listChances) }}
			>
					列表开关
			</button>
		</div>
  )
  const CurChancesList = () => (
		<div className='flex flex-wrap items-baseline'>
			<div className='ml-3 text-[7px] text-green-400'>对脸机会：</div>
			<div className='text-center text-sm mt-1 text-yellow-300 flex-wrap'>
				{(curChancesArr.length > 0) && curChancesArr.map((name:KeysType, idx) => {
				  return (
						<span key={uuid()}>
							<span>{getCardCName(name)}</span>
							{(idx === curChancesArr.length - 1) ? '' : ', '}
						</span>
				  )
				})}
			</div>
		</div>
  )
  const DerChancesList = () => (
		<div className='flex flex-wrap items-baseline'>
			<div className='ml-3  text-[7px] text-green-400'>移动机会：</div>
			<div className='text-center text-sm mt-1 text-yellow-300 flex-warp'>
				{(derChancesArr.length > 0) && derChancesArr.map((name:KeysType, idx) => {
				  return (
						<span key={uuid()}>
							<span>{getCardCName(name)}</span>
							{(idx === derChancesArr.length - 1) ? ' ' : ', '}
						</span>
				  )
				})}
			</div>
		</div>
  )
  const ChancesList = () => {
    if (listChances) {
      return (
				<div>
					<CurChancesList/>
					<DerChancesList/>
				</div>)
    } else {
      return <div/>
    }
  }

  const PanelContent = () => (
		<div className={classnames('w-full, h-full', { invisible: !showPanel })}>
			<AnyChance/>
			{/* <ChancesList/> */}
			{initChancesList}
		</div>
  )
  const CloseInfo = () => (
		<div className='w-full h-full flex justify-center items-center'>
			<div className='text-green-500 font-bold text-6lx'>
				提示面板已关闭.
			</div>
		</div>
  )

  const [initChancesList, setChancesList] = useState(null)
  useEffect(() => setChancesList(ChancesList), [chances, showPanel, listChances]) // 子组件放到后联中渲染，解决client/server不一致警告.

  return (
		<div className='bg-green-700 md:w-[338px] mx-[24px] pb-[10px] border border-solid border-green-100'>
			{showPanel ? <PanelContent/> : <CloseInfo/>}
		</div>
  )
}
