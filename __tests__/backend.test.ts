/* eslint-disable no-undef */
import { board_start, board_start2, board_start3 } from './fixture/Board_Arr2D'
import {
  get_trainheads,
  get_trainbody,
  move_trainbody,
  train_roam,
  is_f2f,
  f2f_in_board,
  f2f_in_boards,
  find_all_chances
} from '../helpers/hlp_yiyikan_backend'

import {
  Board,
  Board2,
  Cell,
  Head,
  Chances
} from '../types/I_YiYiKan'

test('Testing board_start', () => {
  expect(board_start.length).toBe(11)
  expect(board_start[1][2].name).toBe('BaWan')
  expect(board_start[9][3].name).toBe('JiuBing')
  expect(board_start[9][3].pos.x).toBe(9)
  console.log(board_start[1][2])
})

test('Testing get_trainheads()', () => {
  const train_heads = get_trainheads(board_start)
  console.log('train_heads are:')
  console.log(train_heads)
  console.log(train_heads.length)
  expect(train_heads.length).toBe(82)
})

test('Testing get_tainbody()', () => {
  const head: Head = {
    cell: {
      name: 'YiWan',
      pos: { x: 3, y: 6 }
    },
    direction: 'Right'
  }

  // 可以考虑先写测试，再写函数，测试确定了函数理想的对外接口模式.
  const body = get_trainbody(head, board_start)
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

test('Testing move_trainbody()', () => {
  const head: Head = {
    cell: {
      name: 'YiWan',
      pos: { x: 3, y: 6 }
    },
    direction: 'Right'
  }
  const head_stp_should: Head = {
    cell: {
      name: 'YiWan',
      pos: { x: 3, y: 7 }
    },
    direction: 'Right'
  }

  const body_stp_should = [
    { pos: { x: 3, y: 7 }, name: 'YiWan' },
    { pos: { x: 3, y: 6 }, name: 'BaTiao' },
    { pos: { x: 3, y: 5 }, name: 'DongFeng' },
    { pos: { x: 3, y: 4 }, name: 'ErBing' },
    { pos: { x: 3, y: 3 }, name: 'Zhong' },
    { pos: { x: 3, y: 2 }, name: 'ErTiao' }
  ]

  const result = move_trainbody(head, board_start)
  const board_stp = result.board_stp
  const body_stp = result.body_stp
  const head_stp = result.head_stp

  expect(body_stp).toStrictEqual(body_stp_should)
  expect(head_stp).toStrictEqual(head_stp_should)

  const stped_board_row3_should = [
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
  const res_arr = board_stp[3].map((cell) => { return cell.name })
  expect(res_arr).toStrictEqual(stped_board_row3_should)
})

test('Testing train_roam()', () => {
  const vboards = train_roam(board_start)
  console.log('====vboards=====')
  console.log(vboards.length) // 127
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
  console.log(result.f2f_names) // Set
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
  console.log('~~~~~~~board_start chances~~~~~~~~~~')
  // console.log(result.f2f_arr)
  // console.log(result.f2f_arr.length)
  console.log(result.f2f_names)
  expect(result.f2f_names.size).toBe(1) // 1个chance

  const result2 = find_all_chances(board_start2)
  console.log('~~~~~~~board_start2 chances~~~~~~~~~~')
  console.log(result2.f2f_names)
  console.log(result2.f2f_arr.length)
  expect(result2.f2f_names.size).toBe(3) // 3个chance
})
