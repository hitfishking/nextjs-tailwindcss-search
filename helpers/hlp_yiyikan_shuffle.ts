import { IMG_URLS } from '.'
import { Cell, Board2 } from '../types/I_YiYiKan'

// 算法: 在连续整数中取得一个随机数: 值 = Math.floor(Math.random() * 可能值的总数 + 第一个可能的值)
// 第二个i充当逻辑条件，即0时为false，循环停止，等价于i>0.
// 算法是：数组从后向前逐一处理：保存最后一个元素，随机生成一个下标，将数组最后一个元素与下标位置的元素对调；
// 因为是随机对调，所以不会增减改变原数组中的元素成分，只是位置发生变化；
// 算法从后向前过一遍数组，存在随机生成的下标与本下标相同，导致shuffle后的结果和之前相同的可能，只是概率小；
function shuffle (arr: any[]) {
  const newArr = arr.slice() // 相当于slice(0)，复制数组.
  for (let i = newArr.length; i; i -= 1) {
    const j = Math.floor(Math.random() * i)
    const x = newArr[i - 1] // 暂存最后的这个第i项
    newArr[i - 1] = newArr[j] // 最后的这个第i项和随机的第j项对调.
    newArr[j] = x
  }
  return newArr
}

export function uuid (): string { // 一个32位16进制数
  let result, i, j
  result = ''
  for (j = 0; j < 32; j++) {
    if (j === 8 || j === 12 || j === 16 || j === 20) {
      result = result + '-'
    }
    i = Math.floor(Math.random() * 16)
      .toString(16) // 16进制数
      .toUpperCase()
    result = result + i
  }
  return result
}

// 本函数无需输入参数，直接用CARD_URLS即可; 每种牌有4张; 末尾补充4个Blank。
export function shuffleBoard (): Cell[] {
  const IMG_NAMES = Object.keys(IMG_URLS)
  const allImgsOnBoard = [...IMG_NAMES, ...IMG_NAMES, ...IMG_NAMES, ...IMG_NAMES]
  const shuffledCards = shuffle(allImgsOnBoard).map((name, idx) => {
    const x:number = Math.floor(idx / 14) + 1 // [1~10]
    const y:number = (idx % 14) + 1 // [1~14]
    return {
      id: uuid(),
      name,
      pos: { x, y }
    }
  })
  const arrBlank = [11, 12, 13, 14].map((val) => {
    return {
      id: uuid(),
      name: 'Blank',
      pos: { x: 10, y: val }
    }
  })
  return [...shuffledCards, ...arrBlank]
}

// 让shuffle直接输出二维数组，即Board.
export function shuffleBoard2 (): Board2 {
  const IMG_NAMES = Object.keys(IMG_URLS)
  const allImgsOnBoard = [...IMG_NAMES, ...IMG_NAMES, ...IMG_NAMES, ...IMG_NAMES]
  const shuffledCards = shuffle(allImgsOnBoard).map((name, idx) => {
    const x:number = Math.floor(idx / 14) + 1 // [1~10]
    const y:number = (idx % 14) + 1 // [1~14]
    return {
      id: uuid(),
      name,
      pos: { x, y }
    }
  })

  // 先建立一个空的二维数组
  const shuffledBoard = new Array(11) // 设数组为11行，只用[1,10]行.
  for (let i = 0; i <= 10; i++) {
    shuffledBoard[i] = new Array(15) // 设数组为15列，只用[1,14]列.
  }
  // 1) 0行、0列上都填NO Cell.
  for (let i = 0; i <= 10; i++) {
    for (let j = 0; j <= 14; j++) {
      if (i === 0 || j === 0) {
        shuffledBoard[i][j] = {
				  id: uuid(),
          name: 'NO',
          pos: { x: i, y: j }
        }
      }
    }
  }
  // 2) 由于shuffledCards里的Cell中已经有行列[1~10],[1~14]的x,y坐标，故可直接使用.
  shuffledCards.forEach((cell) => {
    const [x, y] = [cell.pos.x, cell.pos.y]
    shuffledBoard[x][y] = cell
  })
  // 3) 补充第10行11~14位置上的Blank Cell.
  for (let y = 11; y <= 14; y++) {
    shuffledBoard[10][y] = {
      id: uuid(),
      name: 'Blank',
      pos: { x: 10, y }
    }
  }
  // ?? 会出现pick()函数中的 TypeError: Cannot read properties of undefined (reading 'gameStatus')错误；原因不明.
  // playAudio('shuffle')
  return shuffledBoard
}
