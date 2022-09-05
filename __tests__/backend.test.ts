/* eslint-disable no-undef */
import { board_start, board_start2, board_start3 } from './fixture/Board_Arr2D'
import {
  get_trainheads,
  get_trainbody,
  move_trainbody,
  move_trainbody_vstp,
  train_roam,
  is_f2f,
  rm_f2f_pair,
  f2f_in_board,
  f2f_in_boards,
  find_all_chances,
  is_movable
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

test('Testing is_movable()', () => {
  const cell_yiwan:Cell = { pos: { x: 3, y: 6 }, name: 'YiWan' }
  const cell_zhong:Cell = { pos: { x: 2, y: 7 }, name: 'Zhong' }
  const cell_blank1:Cell = { pos: { x: 3, y: 7 }, name: 'Blank' }
  const cell_blank2:Cell = { pos: { x: 1, y: 5 }, name: 'Blank' }

  expect(is_movable(cell_yiwan, cell_zhong, board_start)).toBe(false)
  expect(is_movable(cell_yiwan, cell_blank1, board_start)).toBe(true)
  expect(is_movable(cell_blank1, cell_yiwan, board_start)).toBe(false)
  expect(is_movable(cell_yiwan, cell_blank2, board_start)).toBe(false)
})

test('Tesing move_trainbody()', () => {
  const cell1:Cell = { pos: { x: 3, y: 6 }, name: 'YiWan' }
  const cell2:Cell = { pos: { x: 3, y: 7 }, name: 'Blank' }
  // const retBoard = move_trainbody(cell1, cell2, board_start)
  // console.log(retBoard[3]) // 观察，正确
  const result_should = [
    { name: 'NO', pos: { x: 3, y: 0 } },
    { name: 'Blank', pos: { x: 3, y: 1 } },
    { name: 'ErTiao', pos: { x: 3, y: 2 } },
    { name: 'Zhong', pos: { x: 3, y: 3 } },
    { name: 'ErBing', pos: { x: 3, y: 4 } },
    { name: 'DongFeng', pos: { x: 3, y: 5 } },
    { name: 'BaTiao', pos: { x: 3, y: 6 } },
    { name: 'YiWan', pos: { x: 3, y: 7 } },
    { name: 'SanBing', pos: { x: 3, y: 8 } },
    { name: 'Blank', pos: { x: 3, y: 9 } },
    { name: 'NanFeng', pos: { x: 3, y: 10 } },
    { name: 'JiuTiao', pos: { x: 3, y: 11 } },
    { name: 'SanBing', pos: { x: 3, y: 12 } },
    { name: 'LiuWan', pos: { x: 3, y: 13 } },
    { name: 'DongFeng', pos: { x: 3, y: 14 } }
  ]
  // expect(retBoard[3]).toStrictEqual(result_should)
  // ---------------------------
  const cell3:Cell = { pos: { x: 10, y: 10 }, name: 'SanTiao' }
  const cell4:Cell = { pos: { x: 10, y: 12 }, name: 'Blank' }
  // const retBoard2 = move_trainbody(cell3, cell4, board_start)
  // console.log(retBoard2[10]) // 观察，正确
  // ---------------------------
  const cell5:Cell = { pos: { x: 4, y: 9 }, name: 'WuBing' }
  const cell6:Cell = { pos: { x: 2, y: 9 }, name: 'Blank' }
  const retBoard3 = move_trainbody(cell5, cell6, board_start)
  for (let x = 1; x <= 10; x++) console.log(board_start[x][9]) // 二者本是同一个数组，故相同.
  for (let x = 1; x <= 10; x++) console.log(retBoard3[x][9])
})

test('Testing move_trainbody_vstp()', () => {
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

  const result = move_trainbody_vstp(head, board_start)
  const board_stp = result.board_stp
  const body_stp = result.body_stp
  const head_stp = result.head_stp

  expect(body_stp).toStrictEqual(body_stp_should) // 如果clone的cell中生成新id，则不再匹配.
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

test('Tesing rm_f2f_pair()', () => {
  // const cell1: Cell = { pos: { x: 2, y: 11 }, name: 'YaoJi' }
  // const cell2: Cell = { pos: { x: 2, y: 14 }, name: 'YaoJi' }
  // const result = rm_f2f_pair(cell1, cell2, board_start2)
  // console.log(result[2])
  const cell3: Cell = { pos: { x: 9, y: 1 }, name: 'JiuBing' }
  const cell4: Cell = { pos: { x: 9, y: 3 }, name: 'JiuBing' }
  const result = rm_f2f_pair(cell3, cell4, board_start2)
  console.log(result[9])
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
  /*
  console.log(result.f2f_names)
  expect(result.f2f_names.size).toBe(1) // 1个chance

  const result2 = find_all_chances(board_start2)
  console.log('~~~~~~~board_start2 chances~~~~~~~~~~')
  console.log(result2.f2f_names)
  console.log(result2.f2f_arr.length)
  expect(result2.f2f_names.size).toBe(3) // 3个chance
	*/
  // console.log('~~~~~~~board_start chances~~~~~~~~~~')
  // const result = find_all_chances(board_start)
  // console.log(result.chances_current.f2f_names)
  // console.log(result.chances_derived.f2f_names)
  // expect(result.chances_current.f2f_names.size).toBe(0)
  // expect(result.chances_derived.f2f_names.size).toBe(1)

  console.log('~~~~~~~board_start2 chances~~~~~~~~~~')
  const result = find_all_chances(board_start2)
  console.log(result.chances_current.f2f_names)
  console.log(result.chances_derived.f2f_names)
  expect(result.chances_current.f2f_names.size).toBe(3) // 当前盘面有3个机会(对脸)
  expect(result.chances_derived.f2f_names.size).toBe(3) // 衍生各种盘面中，当前盘面的对脸机会大概率也都保持.
})
