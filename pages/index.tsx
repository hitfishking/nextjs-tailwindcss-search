import React, { useEffect, useCallback } from 'react'
import classnames from 'classnames'
import Particle from 'react-tsparticles'
import { loadFull } from 'tsparticles'

import { pick } from '../helpers'
import { useModel } from '../models/lib_usemodel'
import { GAME_STATUS } from '../types/I_YiYiKan'
import Header from '../components/Header'
import Board from '../components/Board'
import Dashboard from '../components/Dashboard'
import { playAudio } from '../helpers/hlp_game'
import { getParticleStyle } from '../helpers/hlp_particle_styles'

export default function pageMJ () {
  const { gameStatus } = useModel('useGameModel', (model) => pick(model, 'gameStatus'))

  // 播放声音等都属于side effect,不能在render期间运行,可能React在render 处理JSX期间,
  // 屏蔽了DOM基础库API，不允许操作DOM,故表现为找不到Audio类。故播放声音类side effect工作,只能放在useEffect()中。
  useEffect(() => {
    playAudio('shuffle')
  }, [])

  const particlesInit = useCallback(async (engine) => {
    console.log(engine)
    await loadFull(engine)
  }, [])

  const particlesLoaded = useCallback(async (container) => {
    await console.log(container)
  }, [])

  return (
		<div className='w-full bg-green-900'>
			<div className='md:container mx-auto md:w-[750px] md:border-4  border-solid border-green-900 rounded flex flex-col justify-center items-center md:p-2.5 bg-green-900'>
				<Header/>
				<div className='relative flex flex-col justify-center items-center'>
					<Board/>
					<img 	src='/end_message.png'
								className = {classnames('absolute ml-6 z-50', { invisible: gameStatus !== GAME_STATUS.PASS })} />
					{ (gameStatus !== GAME_STATUS.PASS)
					  ? null
					  : <Particle
							id="tsparticles"
							className="fireworks absolute h-[590px] w-[672px] z-0 opacity-80"
							init={particlesInit}
							loaded={particlesLoaded}
							// @ts-ignore
							options={getParticleStyle(-1)}
						/>
					}
				</div>
				<Dashboard/>
			</div>
		</div>
  )
}
