import React from 'react'
import { IMG_URLS } from '../helpers'

type Position = {
  x: number
  y: number
}

export type Cell = {
	id?: string
	name: keyof typeof IMG_URLS | 'Blank' | 'NO' // card名限制在牌名列表内
  pos: Position
}

export type Board = Array<Array< keyof typeof IMG_URLS | 'Blank' | 'NO'>>
export type Board2 = Array<Array<Cell>>

type Direction = 'Right' | 'Left' | 'Up' | 'Down'

export type Head = {
	cell: Cell,
  direction: Direction
}

export type Chances = {
  f2f_names: Set<string>
  f2f_arr: Array<[Cell, Cell]> // 同值牌对脸的机会可能不止一个，故机会中保留"脸对"数组。
}

// -------------------------------
export interface IClickable {
  onClick: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void
}

// 枚举类型需要逐个显式声明.
export enum GAME_STATUS {
  READY = 'READY',
  PLAYING = 'PLAYING',
  PASS = 'PASS'
}
