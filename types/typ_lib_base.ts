import { CARD_URLS } from '@/helpers'

type Position = {
  x: number
  y: number
}

type Direction = 'Right' | 'Left' | 'Up' | 'Down'

export type Train_Head = {
  pos: Position
  direction: Direction
}

export type Cell = {
	id?: string
	name: keyof typeof CARD_URLS | 'Blank' | 'NO' // card名限制在牌名列表内
  pos: Position
}

export type Board = Array<Array< keyof typeof CARD_URLS | 'Blank' | 'NO'>>
export type Board2 = Array<Array<Cell>>

export type Chances = {
  f2f_names: Set<string>
  f2f_arr: Array<[Cell, Cell]> // 同值牌对脸的机会可能不止一个，故机会中保留"脸对"数组。
}

// TODO: 重构: Cell是Head的父类。
