/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
import _ from 'lodash'
import { type } from 'os'
import {
  Board,
  Board2,
  Cell,
  Head,
  Direction,
  Chances
} from '../types/I_YiYiKan'
import { uuid } from './hlp_yiyikan_shuffle'
import { playAudio } from './hlp_game'

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

type MoveStpResultType = {
	head_stp: Head,
  body_stp: Cell[],
  board_stp: Board2
}

export function is_movable (cell1:Cell, cell2:Cell, board:Board2):boolean {
  if (cell1.name === 'Blank' || cell2.name !== 'Blank') return false
  if (cell1.pos.x !== cell2.pos.x && cell1.pos.y !== cell2.pos.y) return false // 不同行不同列,false
  const [x1, x2, y1, y2] = [cell1.pos.x, cell2.pos.x, cell1.pos.y, cell2.pos.y]
  const arrCell:Cell[] = []

  // 提取区间内的全部 Cell.
  if (x1 !== x2) { // 不同行，则同列
    if (x1 < x2) {
      for (let i = x1 + 1; i < x2; i++) arrCell.push(board[i][y1])
    } else {
      for (let i = x2 + 1; i < x1; i++) arrCell.push(board[i][y1])
    }
  }
  if (y1 !== y2) { // 不同列，则同行
    if (y1 < y2) {
      for (let j = y1 + 1; j < y2; j++) arrCell.push(board[x1][j])
    } else {
      for (let j = y2 + 1; j < y1; j++) arrCell.push(board[x1][j])
    }
  }

  let iCountNotBlank = 0
  arrCell.forEach((cell) => {
    if (cell.name !== 'Blank') iCountNotBlank++
  })
  if (iCountNotBlank === 0) return true; else return false
}

export function is_boardcleared (board:Board2):boolean {
  let nNoBlank = 0
  for (let x = 1; x <= 10; x++) {
    for (let y = 1; y <= 14; y++) {
      if (board[x][y].name !== 'Blank') nNoBlank++
    }
  }
  if (nNoBlank === 0) {
    playAudio('endgame')
    return true
  } else { return false }
}

// 给定盘面上的一个head，整个body在head.direction方向移动一步，返回新的board+head+body。
// [注意]: 移动是在clone的虚拟盘面上进行的，并不改变原盘面，故称这种移动为虚拟的，即"v"的含义.
export function move_trainbody_vstp (
  head: Head,
  board: Board2
): MoveStpResultType {
  const body: Cell[] = get_trainbody(head, board) // body是对原board中cell的引用.
  const body_stp: Cell[] = []
  const head_stp: Head = head // 初始暂赋值为原盘head,后续会被赋值为克隆的cell.
  const board_stp: Board2 = _.cloneDeep(board) // 复制一份board

  body.forEach((cell, idx) => {
    const cln_cell:Cell = _.cloneDeep(cell) // 对原盘面上的cell进行复制.
    // cln_cell.id = uuid() // 为每个新clone的cell生成新的id.
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

// 给定当前盘面的一对(cell1，cell2)，将以cell1为head的body直接移动到cell2处，此操作直接改变原盘面.
// [注意]: 本移动是基于用户操作，直接对原盘面的改变，与move_trainbody_vstp()进行的虚拟模拟计算只在clone后的盘面上做改变是完全不同的，二者代码是独立开发的。
export function move_trainbody (cell1:Cell, cell2:Cell, board:Board2):Board2 {
  if (!is_movable(cell1, cell2, board)) { return board }
  const [x1, y1, x2, y2] = [cell1.pos.x, cell1.pos.y, cell2.pos.x, cell2.pos.y]

  // 首先确定方向，进而取得body
  let direction:Direction
  let nDist = 0
  if (x1 !== x2) { // 不同行,同列
    if (x1 < x2) 	{ direction = 'Down'; nDist = x2 - x1 } else { direction = 'Up'; nDist = x1 - x2 }
  }
  if (y1 !== y2) { // 不同列,同行
    if (y1 < y2) { direction = 'Right'; nDist = y2 - y1 } else { direction = 'Left'; nDist = y1 - y2 }
  }
  const head:Head = { cell: cell1, direction }
  const body:Cell[] = get_trainbody(head, board)

  // 将body内的所有元素，按方向和距离，移动特定的距离.
  body.forEach((cell) => {
    const [x, y] = [cell.pos.x, cell.pos.y]
    const cln_cell = _.cloneDeep(cell)
    switch (direction) {
      case 'Right':
        cln_cell.pos.y += nDist
        board[x][y + nDist] = cln_cell
        break
      case 'Left':
        cln_cell.pos.y -= nDist
        board[x][y - nDist] = cln_cell
        break
      case 'Up':
        cln_cell.pos.x -= nDist
        board[x - nDist][y] = cln_cell
        break
      case 'Down':
        cln_cell.pos.x += nDist
        board[x + nDist][y] = cln_cell
        break
    }
    cell.name = 'Blank'
    cell.id = uuid() // 移动cell，若原cell只是把name改成Blank，id并没改，导致盘面上出现重复id
  })

  return board
}

// 和move_trainbody()类似，只是body用[head cell]替代，只移动head cell，body按兵不动；
// 单枪匹马模式
export function move_trainhead (cell1:Cell, cell2:Cell, board:Board2):Board2 {
  if (!is_movable(cell1, cell2, board)) { return board }
  const [x1, y1, x2, y2] = [cell1.pos.x, cell1.pos.y, cell2.pos.x, cell2.pos.y]

  // 首先确定方向，进而取得body
  let direction:Direction
  let nDist = 0
  if (x1 !== x2) { // 不同行,同列
    if (x1 < x2) 	{ direction = 'Down'; nDist = x2 - x1 } else { direction = 'Up'; nDist = x1 - x2 }
  }
  if (y1 !== y2) { // 不同列,同行
    if (y1 < y2) { direction = 'Right'; nDist = y2 - y1 } else { direction = 'Left'; nDist = y1 - y2 }
  }
  // const head:Head = { cell: cell1, direction }
  const body:Cell[] = [cell1] // get_trainbody(head, board) 主要改了这2条代码

  // 将body内的所有元素，按方向和距离，移动特定的距离.
  body.forEach((cell) => {
    const [x, y] = [cell.pos.x, cell.pos.y]
    const cln_cell = _.cloneDeep(cell)
    switch (direction) {
      case 'Right':
        cln_cell.pos.y += nDist
        board[x][y + nDist] = cln_cell
        break
      case 'Left':
        cln_cell.pos.y -= nDist
        board[x][y - nDist] = cln_cell
        break
      case 'Up':
        cln_cell.pos.x -= nDist
        board[x - nDist][y] = cln_cell
        break
      case 'Down':
        cln_cell.pos.x += nDist
        board[x + nDist][y] = cln_cell
        break
    }
    board[x][y].name = 'Blank'
    board[x][y].id = uuid()

    // body不是通过get_trainbody()从原board引用过来的，而是独立的参数，故本move_trainhead()函数中，不能使用cell1，而要显式向board的元素赋值.
    // cell.name = 'Blank'
    // cell.id = uuid() // 移动cell，若原cell只是把name改成Blank，id并没改，导致盘面上出现重复id
  })

  // console.log('----cell1------')
  // console.log(cell1)
  // console.log('-------board[x][y]---------')
  // console.log(board[x][y])
  return board
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
          const result = move_trainbody_vstp(head_stp, board_stp)
          board_stp = result.board_stp // 这两个变量已经在move_trainbody_vstp()内部已clone完毕
          head_stp = result.head_stp
          walk_vboards.push(board_stp) // 把新的,独立的board保存到总数组中.
          y = y + 1
        }
        break

      case 'Left':
        while (y > 1 && board[x][y - 1].name === 'Blank') {
          const result = move_trainbody_vstp(head_stp, board_stp)
          board_stp = result.board_stp
          head_stp = result.head_stp
          walk_vboards.push(board_stp)
          y = y - 1
        }
        break

      case 'Down':
        while (x < 10 && board[x + 1][y].name === 'Blank') {
          const result = move_trainbody_vstp(head_stp, board_stp)
          board_stp = result.board_stp
          head_stp = result.head_stp
          walk_vboards.push(board_stp)
          x = x + 1
        }
        break

      case 'Up':
        while (x > 1 && board[x - 1][y].name === 'Blank') {
          const result = move_trainbody_vstp(head_stp, board_stp)
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

// 给定盘面上的2个cell，判断二者是否对脸.
export function is_f2f (cell1: Cell, cell2: Cell, board:Board2): boolean {
  const [x1, x2, y1, y2] = [cell1.pos.x, cell2.pos.x, cell1.pos.y, cell2.pos.y]
  if (cell1.name !== cell2.name) return false
  if (x1 !== x2 && y1 !== y2) return false // 必须同行或同列

  if (x1 === x2) { // 同行
    const [yt1, yt2] = (y1 < y2) ? [y1, y2] : [y2, y1]

    let nNoBlankCount = 0
    for (let j = yt1 + 1; j < yt2; j++) { // (yt1,yt2)开区间
      if (board[x1][j].name !== 'Blank') nNoBlankCount++
    }
    if (nNoBlankCount === 0) return true
    else return false
  }
  if (y1 === y2) { // 同列
    const [xt1, xt2] = (x1 < x2) ? [x1, x2] : [x2, x1]

    let nNoBlankCount = 0
    for (let i = xt1 + 1; i < xt2; i++) { // 开区间
      if (board[i][y1].name !== 'Blank') nNoBlankCount++
    }
    if (nNoBlankCount === 0) return true
    else return false
  }
}

// 将2个满足f2f的cell从盘面上清除，用新生成的Blank cell替代.
export function rm_f2f_pair (cell1:Cell, cell2:Cell, board:Board2):Board2 {
  if (!is_f2f(cell1, cell2, board)) return board
  const [x1, y1, x2, y2] = [cell1.pos.x, cell1.pos.y, cell2.pos.x, cell2.pos.y]
  const cell1_new:Cell = {
    id: uuid(),
    name: 'Blank',
    pos: { x: x1, y: y1 }
  }
  const cell2_new:Cell = {
    id: uuid(),
    name: 'Blank',
    pos: { x: x2, y: y2 }
  }
  board[x1][y1] = cell1_new
  board[x2][y2] = cell2_new

  playAudio('f2f')
  return board
}

// 雷霆猛击
// 将2个同名的cell(不一定对脸)从盘面上清除，用新生成的Blank cell替代.
export function rm_samename_pair (cell1:Cell, cell2:Cell, board:Board2):Board2 {
  if (cell1.name !== cell2.name) return board
  const [x1, y1, x2, y2] = [cell1.pos.x, cell1.pos.y, cell2.pos.x, cell2.pos.y]
  const cell1_new:Cell = {
    id: uuid(),
    name: 'Blank',
    pos: { x: x1, y: y1 }
  }
  const cell2_new:Cell = {
    id: uuid(),
    name: 'Blank',
    pos: { x: x2, y: y2 }
  }
  board[x1][y1] = cell1_new
  board[x2][y2] = cell2_new

  playAudio('f2f')
  return board
}

// 找到给定盘面上所有的对脸cell.
export function f2f_in_board (board: Board2):Chances {
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
        // 判断盘面上当前cell1是否与其同值的各cell2对脸，是则[cell1,cell2]对儿加入f2f_arr数组.
        arrSame.forEach((cell2) => {
          if (is_f2f(cell1, cell2, board)) {
						 f2f_arr.push([cell1, cell2])
          }
        })
      } // if
    }
  } // for i

  const f2f_names = new Set<string>()
  for (let p = 0; p < f2f_arr.length; p++) {
    f2f_names.add(f2f_arr[p][0].name) // 因为发f2f_names是集合,所以自动去重.
  }
  // f2f_arr中一对儿cell会出现2次，暂时不去除；f2f_names为去重cell值名。
  return { f2f_names, f2f_arr }
}

// 给定一个盘面集合，找出所有对脸cell.
export function f2f_in_boards (boards: Board2[]):Chances {
  let f2f_arr: Array<[Cell, Cell]> = []
  let f2f_names = new Set<string>()

  boards.forEach((board) => {
    const res = f2f_in_board(board)
    f2f_arr = f2f_arr.concat(res.f2f_arr) // 相邻的boards间该数组接近，但都被concat，导致该数组变长.
    f2f_names = new Set<string>([...f2f_names, ...res.f2f_names])
  })

  return { f2f_names, f2f_arr }
}

/**
 * @description: 总程序入口：给定一个盘面，返回所有的<可能>对脸的cell值。
 * @param  {Board2} board
 * @return {f2f_names, f2f_arr}
 */
export function find_all_chances (board: Board2):{chances_derived:Chances, chances_current:Chances} {
  const derived_boards = train_roam(board)
  // const all_boards = [...derived_boards, board]
  const chances_derived:Chances = f2f_in_boards(derived_boards)
  const chances_current:Chances = f2f_in_boards([board])
  return { chances_derived, chances_current }
}
