import { kMaxLength, kStringMaxLength } from 'buffer'
import _ from 'lodash'
import { board_start } from './board_arr2d'

type BoardType = Array<Array<string>>
var board_curr: BoardType

export function create_board() {
  board_curr = new Array(11)
  for (let i = 0; i < board_curr.length; i++) {
    board_curr[i] = new Array(15)
  }
  for (let i = 0; i <= 10; i++) {
    for (let j = 0; j <= 14; j++) {
      board_curr[i][j] = '8'
    }
  }
  return board_curr
}

/*
   扫描整个盘面，对每个Blank cell，分析其四个方向的相邻cell，构建train_heads数组；
	 train_heads数组是对象数组：[{pos:Position, direction:Direction }]
*/
//TODO: 重构，Cell是Head的父类。

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
  pos: Position
  value: string
}

//TODO: 重构，所有函数定义中都加上输入/输出类型限定.
//TODO: 重构，for循环考虑使用for-of模式，更加简洁.
export function get_train_heads(board_start) {
  let train_heads: Train_Head[] = []

  //仅查询[1..10,1..14]有效区间.
  for (let i = 1; i <= 10; i++) {
    for (let j = 1; j <= 14; j++) {
      if (board_start[i][j] == 'Blank') {
        let row = i
        let col = j
        if (col > 1 && board_start[row][col - 1] != 'Blank') {
          let train_head: Train_Head = {
            pos: { x: row, y: col - 1 },
            direction: 'Right',
          }
          train_heads.push(train_head)
        }

        if (col < 14 && board_start[row][col + 1] != 'Blank') {
          let train_head: Train_Head = {
            pos: { x: row, y: col + 1 },
            direction: 'Left',
          }
          train_heads.push(train_head)
        }

        if (row > 1 && board_start[row - 1][col] != 'Blank') {
          let train_head: Train_Head = {
            pos: { x: row - 1, y: col },
            direction: 'Down',
          }
          train_heads.push(train_head)
        }

        if (row < 10 && board_start[row + 1][col] != 'Blank') {
          let train_head: Train_Head = {
            pos: { x: row + 1, y: col },
            direction: 'Up',
          }
          train_heads.push(train_head)
        }
      }
    }
  }
  return train_heads
}

// helper函数，给定一个train_head和board，返回该train body所有cell构成的数组。
export function helper_get_trainbody(
  train_head: Train_Head,
  board: BoardType
): Cell[] {
  let train_body: Cell[] = []
  let x = train_head.pos.x
  let y = train_head.pos.y
  switch (train_head.direction) {
    case 'Right':
      // 方向向右，则train body在左侧，所有连续的，非Blank cell，都是body成员。
      while (y > 0) {
        if (board[x][y] == 'Blank') break
        let cell: Cell = {
          pos: { x: x, y: y },
          value: board[x][y],
        }
        train_body.push(cell) // 数组中，越靠近车头的cell越靠前.
        y = y - 1
      }
      break

    case 'Left':
      // 方向向左，则train body在右侧，所有连续的，非Blank cell，都是body成员。
      while (y <= 14) {
        if (board[x][y] == 'Blank') break
        let cell: Cell = {
          pos: { x: x, y: y },
          value: board[x][y],
        }
        train_body.push(cell)
        y = y + 1
      }
      break

    case 'Down':
      // 方向向下，则train body在上方，所有连续的，非Blank cell，都是body成员。
      while (x > 0) {
        if (board[x][y] == 'Blank') break
        let cell: Cell = {
          pos: { x: x, y: y },
          value: board[x][y],
        }
        train_body.push(cell)
        x = x - 1
      }
      break

    case 'Up':
      // 方向向上，则train body在下方，所有连续的，非Blank cell，都是body成员。
      while (x <= 10) {
        if (board[x][y] == 'Blank') break
        let cell: Cell = {
          pos: { x: x, y: y },
          value: board[x][y],
        }
        train_body.push(cell)
        x = x + 1
      }
      break
  }
  return train_body
}

// helper函数，给定盘面上的一个车身数组及方向，整个车身根据反向指示移动一步，返回新盘面。
// TODO: 重构。只需要给定Head(含方向)，就可以计算出body，无需在外面计算body再传入。
export function helper_move_trainbody(
  train_direction: string,
  train_body: Cell[],
  board: BoardType
) {
  let board_step = _.cloneDeep(board)
  let train_body_step: Cell[] = _.cloneDeep(train_body)
  let train_head_step: Train_Head
  for (let i = 0; i < train_body.length; i++) {
    let cell = train_body[i]
    let x = cell.pos.x
    let y = cell.pos.y

    switch (train_direction) {
      case 'Right':
        board_step[x][y + 1] = cell.value
        board_step[x][y] = 'Blank'
        train_body_step[i].pos.y = y + 1 // train_body中的每个元素的位置也都右移一步，单独保存一个新的train_body_step。
        if (i == 0) {
          train_head_step = {
            pos: { x: x, y: y + 1 },
            direction: train_direction,
          }
        }
        break

      case 'Left':
        board_step[x][y - 1] = cell.value
        board_step[x][y] = 'Blank'
        train_body_step[i].pos.y = y - 1
        if (i == 0) {
          train_head_step = {
            pos: { x: x, y: y - 1 },
            direction: train_direction,
          }
        }
        break

      case 'Down':
        board_step[x + 1][y] = cell.value
        board_step[x][y] = 'Blank'
        train_body_step[i].pos.x = x + 1
        if (i == 0) {
          train_head_step = {
            pos: { x: x + 1, y: y },
            direction: train_direction,
          }
        }
        break

      case 'Up':
        board_step[x - 1][y] = cell.value
        board_step[x][y] = 'Blank'
        train_body_step[i].pos.x = x - 1
        if (i == 0) {
          train_head_step = {
            pos: { x: x - 1, y: y },
            direction: train_direction,
          }
        }
        break
    }
  }
  // train移动一步后，3大状态全部更新.
  let result = {
    train_head_step: train_head_step,
    train_body_step: train_body_step,
    board_step: board_step,
  }
  return result
}

/*
   给定一个盘面和train_heads数组，每个可走的方向都可以走一至多步，共同构成walk_vboards[]数组；
*/
export function train_walk(board_start: BoardType): BoardType[] {
  let train_heads = get_train_heads(board_start)
  let walk_vboards: BoardType[] = []

  // 对每个train_head，在其方向上移动一步或多步，每步生成一个新的board，并保存在盘面数组中.
  for (let i = 0; i < train_heads.length; i++) {
    let train_head = train_heads[i] // 形如 pos: { x: 2, y: 2 }, direction: 'Left' }
    let train_body = helper_get_trainbody(train_head, board_start)
    let x = train_head.pos.x
    let y = train_head.pos.y

    // 每一小步(step)的变化，都会导致以下3个变量的变化，故建模时需要构建此3个变量。
    // TODO: 修改更简洁清晰的变量名，如：i_board,i_head,i_body.
		let board_step: BoardType = board_start // 每个train的移动都基于原始盘面
    let train_head_step: Train_Head = train_head // clone()在move()函数中完成.
    let train_body_step = train_body
    switch (train_head.direction) {
      case 'Right':
        // 向右侧循环移动，走完所有Blank cell，每一步生成一个新board和新train body.
        // x,y变化和判别，都是基于初始盘面.
        while (y < 14 && board_start[x][y + 1] == 'Blank') {
          let result = helper_move_trainbody(
            train_head_step.direction,
            train_body_step,
            board_step
          )
          board_step = result.board_step // 这两个变量已经在函数内clone完毕
          train_body_step = result.train_body_step
          train_head_step = result.train_head_step
          walk_vboards.push(board_step)
          y = y + 1
        }
        break

      case 'Left':
        // 向左侧循环移动，走完所有Blank cell，每一步生成一个新board和新train body.
        // x,y变化和判别，都是基于初始盘面.
        while (y > 1 && board_start[x][y - 1] == 'Blank') {
          let result = helper_move_trainbody(
            train_head_step.direction,
            train_body_step,
            board_step
          )
          board_step = result.board_step // 这两个变量已经在函数内clone完毕
          train_body_step = result.train_body_step
          train_head_step = result.train_head_step
          walk_vboards.push(board_step)
          y = y - 1
        }
        break

      case 'Down':
        // 向下方循环移动，走完所有Blank cell，每一步生成一个新board和新train body.
        // x,y变化和判别，都是基于初始盘面.
        while (x < 10 && board_start[x + 1][y] == 'Blank') {
          let result = helper_move_trainbody(
            train_head_step.direction,
            train_body_step,
            board_step
          )
          board_step = result.board_step // 这两个变量已经在函数内clone完毕
          train_body_step = result.train_body_step
          train_head_step = result.train_head_step
          walk_vboards.push(board_step)
          x = x + 1
        }
        break

      case 'Up':
        // 向上方循环移动，走完所有Blank cell，每一步生成一个新board和新train body.
        // x,y变化和判别，都是基于初始盘面.
        while (x > 1 && board_start[x - 1][y] == 'Blank') {
          let result = helper_move_trainbody(
            train_head_step.direction,
            train_body_step,
            board_step
          )
          board_step = result.board_step // 这两个变量已经在函数内clone完毕
          train_body_step = result.train_body_step
          train_head_step = result.train_head_step
          walk_vboards.push(board_step)
          x = x - 1
        }
        break
    } //switch
  } //for
  return walk_vboards
}

/*
	给定一个盘面(board)，输出找到的所有对脸cell对儿.
  input: board    //一个盘面
	output: {f2f_names, f2f_arr}
*/
export function f2f_in_board(board: BoardType) {
  let f2f_arr: Array<Array<Cell>> = []

  for (let i = 1; i <= 10; i++) {
    for (let j = 1; j <= 14; j++) {
      if (board[i][j] != 'Blank') {
        let cell: Cell = { pos: { x: i, y: j }, value: board[i][j] }

        let arrSame: Cell[] = []
        for (let m = 1; m <= 10; m++) {
          for (let n = 1; n <= 14; n++) {
            let cell2: Cell = { pos: { x: m, y: n }, value: board[m][n] }
            if (cell.value == cell2.value && !_.isEqual(cell.pos, cell2.pos)) {
              arrSame.push(cell2)
            }
          }
        }
        for (let k = 0; k < arrSame.length; k++) {
          if (is_f2f(cell, arrSame[k], board)) {
            f2f_arr.push([cell, arrSame[k]])
          }
        }
      } //if
    }
  } //for1

  let f2f_names = new Set()
  for (let p = 0; p < f2f_arr.length; p++) {
    f2f_names.add(f2f_arr[p][0].value)
  }
  // f2f_arr中一对儿cell会出现2次，暂时不去除；f2f_names为去重cell值名。
  return { f2f_names: f2f_names, f2f_arr: f2f_arr }
}

// 判断盘面上两个同值的cell是否对脸.
export function is_f2f(cell1: Cell, cell2: Cell, board): boolean {
  if (cell1.value != cell2.value) return false
  if (cell1.pos.x != cell2.pos.x && cell1.pos.y != cell2.pos.y) return false
  if (cell1.pos.x == cell2.pos.x) {
    let y1, y2
    if (cell1.pos.y < cell2.pos.y) {
      y1 = cell1.pos.y
      y2 = cell2.pos.y
    } else {
      y1 = cell2.pos.y
      y2 = cell1.pos.y
    }

    let nNoBlankCount = 0
    for (let i = y1 + 1; i < y2; i++) {
      if (board[cell1.pos.x][i] != 'Blank') nNoBlankCount++
    }

    if (nNoBlankCount == 0) return true
    else return false
  } // same line

  if (cell1.pos.y == cell2.pos.y) {
    let x1, x2
    if (cell1.pos.x < cell2.pos.x) {
      x1 = cell1.pos.x
      x2 = cell2.pos.x
    } else {
      x1 = cell2.pos.x
      x2 = cell1.pos.x
    }

    let nNoBlankCount = 0
    for (let j = x1 + 1; j < x2; j++) {
      if (board[j][cell1.pos.y] != 'Blank') nNoBlankCount++
    }

    if (nNoBlankCount == 0) return true
    else return false
  } // same column
}

/**
 * 给定一个盘面集合(boards[])，给出所有找到的对脸cell对儿。
 * input:  boards[]
 * output:  {f2f_names, f2f_arr}
 */
export function f2f_in_boards(boards: BoardType[]) {
  let f2f_arr: Array<Array<Cell>> = []
  let f2f_names = new Set()

  for (let i = 0; i < boards.length; i++) {
    let res = f2f_in_board(boards[i])
    f2f_arr = f2f_arr.concat(res.f2f_arr)
    f2f_names = new Set([...f2f_names, ...res.f2f_names])
  }

  return { f2f_names: f2f_names, f2f_arr: f2f_arr }
}

/**
 * 总程序入口：
 * 给定一个盘面，返回所有的<可能>对脸的cell值。
 * input: board
 * output: {f2f_names, f2f_arr}
 */
export function find_all_chances(cur_board: BoardType) {
  let vboards = train_walk(cur_board)
  let all_boards = [cur_board].concat(vboards)
  let result = f2f_in_boards(all_boards)
  return result
}
