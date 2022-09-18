import React from 'react'
import { IMG_URLS } from '../helpers'

type Position = {
  x: number
  y: number
}

export type KeysType = keyof typeof IMG_URLS | 'Blank' | 'NO'

export type Cell = {
	id?: string
	name: KeysType // card名限制在牌名列表内
  pos: Position
}

export type Board = Array<Array<KeysType>>
export type Board2 = Array<Array<Cell>>

export type Direction = 'Right' | 'Left' | 'Up' | 'Down'

export type Head = {
	cell: Cell,
  direction: Direction
}

export type MoveInfoType = {
	isMovable: boolean,
	direction: Direction,
	span: number,
	body: Cell[]
}

export type Chances = {
  f2f_names: Set<string>
  f2f_arr: Array<[Cell, Cell]> // 同值牌对脸的机会可能不止一个，故机会中保留"脸对"数组。
}

export type AllChances = {
	chances_derived: Chances,
	chances_current: Chances
}

export type ThreeChoiceType = {
	typeId: 0|1|2|3;
	left: number
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
