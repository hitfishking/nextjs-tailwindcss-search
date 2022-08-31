/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
import _ from 'lodash'
import { type } from 'os'
import {
  Board,
  Board2,
  Cell,
  Head,
  Chances
} from '../types/I_YiYiKan'

// 扫描整个盘面，对每个Blank cell，分析其四个方向的相邻cell，构建listHeads数组.
export function get_trainheads (board:Board2):Head[] {
  const listHeads: Head[] = []

  // 只考察[1..10,1..14]有效区间.
  for (let i = 1; i <= 10; i++) {
    for (let j = 1; j <= 14; j++) {
      if (board[i][j].name === 'Blank') {
        if (j > 1 && board[i][j - 1].name !== 'Blank') {
          const head: Head = {
            cell: board[i][j - 1],
            direction: 'Right'
          }
          listHeads.push(head)
        }

        if (j < 14 && board[i][j + 1].name !== 'Blank') {
          const head: Head = {
            cell: board[i][j + 1],
            direction: 'Left'
          }
          listHeads.push(head)
        }

        if (i > 1 && board[i - 1][j].name !== 'Blank') {
          const head: Head = {
            cell: board[i - 1][j],
            direction: 'Down'
          }
          listHeads.push(head)
        }

        if (i < 10 && board[i + 1][j].name !== 'Blank') {
          const head: Head = {
            cell: board[i + 1][j],
            direction: 'Up'
          }
          listHeads.push(head)
        }
      }
    }
  }
  return listHeads
}

// 给定一个head和board，返回包括head在内的整个train body(Cell[]).
// 一个Head只对应一个Body(含Head).
export function get_trainbody (
  head: Head,
  board: Board2
): Cell[] {
  const body: Cell[] = [] // body中引用的就是board中的cell，只是引用关系.
  let [x, y] = [head.cell.pos.x, head.cell.pos.y]

  switch (head.direction) {
    case 'Right':
      // 方向向右，则body在左侧，所有连续的非Blank cell都是body成员。
      while (y > 0) {
        if (board[x][y].name === 'Blank') break
        body.push(board[x][y]) // 数组中，越靠近车头的cell越靠前.
        y = y - 1
      }
      break

    case 'Left':
      while (y <= 14) {
        if (board[x][y].name === 'Blank') break
        body.push(board[x][y])
        y = y + 1
      }
      break

    case 'Down':
      while (x > 0) {
        if (board[x][y].name === 'Blank') break
        body.push(board[x][y])
        x = x - 1
      }
      break

    case 'Up':
      while (x <= 10) {
        if (board[x][y].name === 'Blank') break
        body.push(board[x][y])
        x = x + 1
      }
      break
  }
  return body
}

type MoveStepProps = {
	head_stp: Head,
  body_stp: Cell[],
  board_stp: Board2
}

// 给定盘面上的一个head，整个body在head.direction方向移动一步，返回新的board+head+body。
export function move_trainbody (
  head: Head,
  board: Board2
): MoveStepProps {
  const body: Cell[] = get_trainbody(head, board) // body是对原board中cell的引用.
  const body_stp: Cell[] = []
  const head_stp: Head = head // 初始暂赋值为原盘head,后续会被赋值为克隆的cell.
  const board_stp: Board2 = _.cloneDeep(board) // 复制一份board

  body.forEach((cell, idx) => {
    const cln_cell = _.cloneDeep(cell) // 对原盘面上的cell进行复制.
    const [x, y] = [cln_cell.pos.x, cln_cell.pos.y]

    switch (head.direction) {
      case 'Right':
        cln_cell.pos.y = y + 1
        board_stp[x][y + 1] = cln_cell // cln_cell往右移动一步在新board上体现出来.
        board_stp[x][y].name = 'Blank' // 新盘面上，本地移动的cln_cell的原位置cell名称改成Blank.
        body_stp[idx] = cln_cell // body_stp中的对应cell也指向该新cell.
        if (idx === 0) { head_stp.cell = cln_cell } // head_stp也指向该新cell.
        break

      case 'Left':
        cln_cell.pos.y = y - 1
        board_stp[x][y - 1] = cln_cell
        board_stp[x][y].name = 'Blank'
        body_stp[idx] = cln_cell
        if (idx === 0) { head_stp.cell = cln_cell }
        break

      case 'Down':
        cln_cell.pos.x = x + 1
        board_stp[x + 1][y] = cln_cell
        board_stp[x][y].name = 'Blank'
        body_stp[idx] = cln_cell
        if (idx === 0) { head_stp.cell = cln_cell }
        break

      case 'Up':
        cln_cell.pos.x = x - 1
        board_stp[x - 1][y] = cln_cell
        board_stp[x][y].name = 'Blank'
        body_stp[idx] = cln_cell
        if (idx === 0) { head_stp.cell = cln_cell }
        break
    }
  })

  return {
    head_stp,
    body_stp,
    board_stp
  }
}

// 给定一个盘面board，遍历每一种可能的走法，生成walk_vboards[]数组.
export function train_roam (board: Board2): Board2[] {
  const listHeads = get_trainheads(board)
  const walk_vboards: Board2[] = []

  listHeads.forEach((head) => {
    let [x, y] = [head.cell.pos.x, head.cell.pos.y]
    let board_stp: Board2 = board // 系列移动都基于原始board开始，每一步都会clone出新board/body.
    let head_stp: Head = head
    switch (head.direction) {
      case 'Right':
        // 向右侧循环移动，走完所有Blank cell，每一步生成一个新board和新body.
        // x,y变化和判别，都是基于初始盘面.
        while (y < 14 && board[x][y + 1].name === 'Blank') {
          const result = move_trainbody(head_stp, board_stp)
          board_stp = result.board_stp // 这两个变量已经在move_trainbody()内clone完毕
          head_stp = result.head_stp
          walk_vboards.push(board_stp) // 把新的,独立的board保存到总数组中.
          y = y + 1
        }
        break

      case 'Left':
        while (y > 1 && board[x][y - 1].name === 'Blank') {
          const result = move_trainbody(head_stp, board_stp)
          board_stp = result.board_stp
          head_stp = result.head_stp
          walk_vboards.push(board_stp)
          y = y - 1
        }
        break

      case 'Down':
        while (x < 10 && board[x + 1][y].name === 'Blank') {
          const result = move_trainbody(head_stp, board_stp)
          board_stp = result.board_stp
          head_stp = result.head_stp
          walk_vboards.push(board_stp)
          x = x + 1
        }
        break

      case 'Up':
        while (x > 1 && board[x - 1][y].name === 'Blank') {
          const result = move_trainbody(head_stp, board_stp)
          board_stp = result.board_stp
          head_stp = result.head_stp
          walk_vboards.push(board_stp)
          x = x - 1
        }
        break
    } // switch
  })
  return walk_vboards
}

// 判断盘面上两个同值的cell是否对脸.
export function is_f2f (cell1: Cell, cell2: Cell, board:Board2): boolean {
  if (cell1.name !== cell2.name) return false
  if (cell1.pos.x !== cell2.pos.x && cell1.pos.y !== cell2.pos.y) return false // 必须同行或同列

  if (cell1.pos.x === cell2.pos.x) { // 同行
    let y1, y2
    if (cell1.pos.y < cell2.pos.y) {
      [y1, y2] = [cell1.pos.y, cell2.pos.y]
    } else {
      [y1, y2] = [cell2.pos.y, cell1.pos.y]
    }

    let nNoBlankCount = 0
    for (let j = y1 + 1; j < y2; j++) { // (y1,y2)开区间
      if (board[cell1.pos.x][j].name !== 'Blank') nNoBlankCount++
    }
    if (nNoBlankCount === 0) return true
    else return false
  }

  if (cell1.pos.y === cell2.pos.y) { // 同列
    let x1, x2
    if (cell1.pos.x < cell2.pos.x) {
      [x1, x2] = [cell1.pos.x, cell2.pos.x]
    } else {
      [x1, x2] = [cell2.pos.x, cell1.pos.x]
    }

    let nNoBlankCount = 0
    for (let i = x1 + 1; i < x2; i++) {
      if (board[i][cell1.pos.y].name !== 'Blank') nNoBlankCount++
    }
    if (nNoBlankCount === 0) return true
    else return false
  }
}

// 找到给定盘面上所有的对脸cell.
export function f2f_in_board (board: Board2) {
  const f2f_arr: Array<[Cell, Cell]> = []

  for (let i = 1; i <= 10; i++) {
    for (let j = 1; j <= 14; j++) {
      if (board[i][j].name !== 'Blank') {
        const cell1: Cell = board[i][j]

        // 先找到盘面上与指定cell的name相同的cell.
        const arrSame: Cell[] = []
        for (let m = 1; m <= 10; m++) {
          for (let n = 1; n <= 14; n++) {
            const cell2: Cell = board[m][n]
            if (cell1.name === cell2.name && !_.isEqual(cell1.pos, cell2.pos)) {
              arrSame.push(cell2)
            }
          }
        }
        // 判断盘面上所有与当前cell同值的cell是否有一个与当前cell对脸儿，有则放入f2f_arr数组.
        arrSame.forEach((cell2) => {
          if (is_f2f(cell1, cell2, board)) {
						 f2f_arr.push([cell1, cell2])
          }
        })
      } // if
    }
  } // for i

  const f2f_names = new Set()
  for (let p = 0; p < f2f_arr.length; p++) {
    f2f_names.add(f2f_arr[p][0].name) // 因为发f2f_names是集合,所以自动去重.
  }
  // f2f_arr中一对儿cell会出现2次，暂时不去除；f2f_names为去重cell值名。
  return { f2f_names, f2f_arr }
}

// 给定一个盘面集合，找出所有对脸cell.
export function f2f_in_boards (boards: Board2[]) {
  let f2f_arr: Array<[Cell, Cell]> = []
  let f2f_names = new Set()

  boards.forEach((board) => {
    const res = f2f_in_board(board)
    f2f_arr = f2f_arr.concat(res.f2f_arr) // 相邻的boards间该数组接近，但都被concat，导致该数组变长.
    f2f_names = new Set([...f2f_names, ...res.f2f_names])
  })

  return { f2f_names, f2f_arr }
}

/**
 * @description: 总程序入口：给定一个盘面，返回所有的<可能>对脸的cell值。
 * @param  {Board2} board
 * @return {f2f_names, f2f_arr}
 */
export function find_all_chances (board: Board2) {
  const all_boards = [...train_roam(board), board]
  const chances = f2f_in_boards(all_boards)
  return chances
}
