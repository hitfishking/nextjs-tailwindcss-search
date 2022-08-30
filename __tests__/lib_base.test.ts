/* eslint-disable no-undef */
import { board_start, board_start2, board_start3 } from './fixture/Board_Arr2D'
import {
  create_board,
  get_train_heads,
  helper_get_trainbody,
  helper_move_trainbody,
  train_walk,
  is_f2f,
  f2f_in_board,
  f2f_in_boards,
  find_all_chances
} from '../libs/lib_base'

import {
  Board,
  Cell,
  Train_Head,
  Chances
} from '@/types'

test('The starter board', () => {
  const x1 = create_board()
  // console.log(x1)
  // expect(init_board()).toBe(['Blank'])
})

test('Testing get_train_heads()', () => {
  const train_heads = get_train_heads(board_start)
  console.log('train_heads are:')
  console.log(train_heads)
  console.log(train_heads.length)
  expect(train_heads.length).toBe(82)
})

test('Testing helper_get_tainbody()', () => {
  const head: Train_Head = { pos: { x: 3, y: 6 }, direction: 'Right' }

  // 可以考虑先写测试，再写函数，测试确定了函数理想的对外接口模式.
  const body = helper_get_trainbody(head, board_start)
  // console.log('body is =====')
  // console.log(body)
  const res = [
    { pos: { x: 3, y: 6 }, name: 'YiWan' },
    { pos: { x: 3, y: 5 }, name: 'BaTiao' },
    { pos: { x: 3, y: 4 }, name: 'DongFeng' },
    { pos: { x: 3, y: 3 }, name: 'ErBing' },
    { pos: { x: 3, y: 2 }, name: 'Zhong' },
    { pos: { x: 3, y: 1 }, name: 'ErTiao' }
  ]
  expect(body).toStrictEqual(res)
})

test('Testing helper_move_trainbody()', () => {
  const direction = 'Right'
  const train_body:Cell[] = [
    { pos: { x: 3, y: 6 }, name: 'YiWan' },
    { pos: { x: 3, y: 5 }, name: 'BaTiao' },
    { pos: { x: 3, y: 4 }, name: 'DongFeng' },
    { pos: { x: 3, y: 3 }, name: 'ErBing' },
    { pos: { x: 3, y: 2 }, name: 'Zhong' },
    { pos: { x: 3, y: 1 }, name: 'ErTiao' }
  ]
  const train_body_step_should = [
    { pos: { x: 3, y: 7 }, name: 'YiWan' },
    { pos: { x: 3, y: 6 }, name: 'BaTiao' },
    { pos: { x: 3, y: 5 }, name: 'DongFeng' },
    { pos: { x: 3, y: 4 }, name: 'ErBing' },
    { pos: { x: 3, y: 3 }, name: 'Zhong' },
    { pos: { x: 3, y: 2 }, name: 'ErTiao' }
  ]
  const train_head_step_should = { pos: { x: 3, y: 7 }, direction: 'Right' }

  const result = helper_move_trainbody(direction, train_body, board_start)
  const board_step = result.board_step
  const train_body_step = result.train_body_step
  const train_head_step = result.train_head_step

  // console.log(new_board)
  // console.log(train_body_step)
  console.log('====train_head_step=====')
  console.log(train_head_step)

  const res_board_row3 = [
    'NO',
    'Blank',
    'ErTiao',
    'Zhong',
    'ErBing',
    'DongFeng',
    'BaTiao',
    'YiWan',
    'SanBing',
    'Blank',
    'NanFeng',
    'JiuTiao',
    'SanBing',
    'LiuWan',
    'DongFeng'
  ]
  expect(board_step[3]).toStrictEqual(res_board_row3)
  expect(train_body_step).toStrictEqual(train_body_step_should)
  expect(train_head_step).toStrictEqual(train_head_step_should)
})

test('Testing train_walk()', () => {
  const vboards = train_walk(board_start)
  console.log('====vboards=====')
  console.log(vboards.length)
})

test('Tesing print x,y cell of board', () => {
  console.log(board_start[4][14])
})

test('Testing is_f2f()', () => {
  let cell1: Cell = { pos: { x: 1, y: 2 }, name: 'BaWan' }
  let cell2: Cell = { pos: { x: 1, y: 4 }, name: 'JiuTiao' }
  expect(is_f2f(cell1, cell2, board_start2)).toBe(false)

  cell1 = { pos: { x: 1, y: 12 }, name: 'SanBing' }
  cell2 = { pos: { x: 3, y: 12 }, name: 'SanBing' }
  expect(is_f2f(cell1, cell2, board_start2)).toBe(true)

  cell1 = { pos: { x: 9, y: 1 }, name: 'JiuBing' }
  cell2 = { pos: { x: 9, y: 3 }, name: 'JiuBing' }
  expect(is_f2f(cell1, cell2, board_start2)).toBe(true)
})

test('Testing f2f_in_board()', () => {
  const result = f2f_in_board(board_start2)
  console.log('=====f2f=====')
  console.log(result.f2f_arr)
  console.log(result.f2f_arr.length)
  console.log(result.f2f_names)
  expect(Array.from(result.f2f_names)).toEqual(['SanBing', 'YaoJi', 'JiuBing'])
  expect(result.f2f_names).toEqual(new Set(['SanBing', 'YaoJi', 'JiuBing']))
})

test('Testing f2f_in_boards()', () => {
  const result = f2f_in_boards([board_start2, board_start3])
  console.log('=====f2f in boards=====')
  console.log(result.f2f_arr)
  console.log(result.f2f_arr.length)
  console.log(result.f2f_names)
  expect(result.f2f_names).toEqual(
    new Set(['SanBing', 'YaoJi', 'JiuBing', 'DongFeng'])
  )
})

test('Tesing find_all_chances()', () => {
  const result = find_all_chances(board_start)
  console.log('~~~~~~~find all chances~~~~~~~~~~')
  console.log(result.f2f_arr)
  console.log(result.f2f_arr.length)
  console.log(result.f2f_names)
})
