import { Board, Board2 } from '../../types/I_YiYiKan'
import { uuid } from '../../helpers/hlp_yiyikan_shuffle'

// 把原来纯字符串的二维数组变成{id,name,pos}对象数组.
function Board_to_Board2 (board:Board):Board2 {
  return board.map((aLine, idx1) => {
    return aLine.map((name, idx2) => {
      return {
        id: uuid(),
        name: board[idx1][idx2],
        pos: { x: idx1, y: idx2 }
      }
    })
  })
}

const board_start_arr: Board = [
  ['NO', 'NO', 'NO', 'NO', 'NO', 'NO', 'NO', 'NO', 'NO', 'NO', 'NO', 'NO', 'NO', 'NO', 'NO'],
  ['NO', 'Blank', 'BaWan', 'JiuBing', 'JiuTiao', 'Blank', 'Blank', 'Blank', 'Blank', 'Blank', 'Blank', 'QiWan', 'SanBing', 'Blank', 'Blank'],
  ['NO', 'Blank', 'YaoJi', 'Blank', 'Bai', 'YiBing', 'Blank', 'Blank', 'Zhong', 'Blank', 'LiuWan', 'YaoJi', 'QiTiao', 'Blank', 'YaoJi'],
  ['NO', 'ErTiao', 'Zhong', 'ErBing', 'DongFeng', 'BaTiao', 'YiWan', 'Blank', 'SanBing', 'Blank', 'NanFeng', 'JiuTiao', 'SanBing', 'LiuWan', 'DongFeng'],
  ['NO', 'WuWan', 'ErWan', 'QiTiao', 'WuWan', 'Zhong', 'WuTiao', 'Blank', 'SanWan', 'WuBing', 'SanTiao', 'SiTiao', 'SanWan', 'Blank', 'YiBing'],
  ['NO', 'Blank', 'Blank', 'Blank', 'SanWan', 'Fa', 'ErTiao', 'Blank', 'YiBing', 'Bai', 'LiuWan', 'QiWan', 'SiBing', 'WuTiao', 'NanFeng'],
  ['NO', 'SanTiao', 'SiTiao', 'BeiFeng', 'SiWan', 'BeiFeng', 'YiWan', 'ErBing', 'BaTiao', 'QiWan', 'XiFeng', 'Bai', 'SanWan', 'JiuTiao', 'SanTiao'],
  ['NO', 'Bai', 'LiuBing', 'YaoJi', 'LiuBing', 'ErWan', 'SiWan', 'WuWan', 'Blank', 'Blank', 'BaBing', 'WuWan', 'BaWan', 'BaTiao', 'QiWan'],
  ['NO', 'SiBing', 'Blank', 'BaTiao', 'SiTiao', 'LiuWan', 'Fa', 'LiuBing', 'SiTiao', 'DongFeng', 'ErWan', 'LiuBing', 'Blank', 'Blank', 'Blank'],
  ['NO', 'WuBing', 'Blank', 'JiuBing', 'Blank', 'DongFeng', 'Blank', 'ErWan', 'Blank', 'Blank', 'YiBing', 'BaBing', 'SanBing', 'XiFeng', 'Blank'],
  ['NO', 'Blank', 'Blank', 'Blank', 'Blank', 'Blank', 'Blank', 'Zhong', 'Blank', 'JiuTiao', 'SanTiao', 'Blank', 'Blank', 'Blank', 'Blank']
]
const board_start = Board_to_Board2(board_start_arr)

// 将第二行后面的QiTiao改成Blank，令第1行和第3行的三饼对脸.
// 将9行1列的WuBing改成JiuBing，令其与9行3列的JiuBing对脸.
const board_start_arr2:Board = [
  ['NO', 'NO', 'NO', 'NO', 'NO', 'NO', 'NO', 'NO', 'NO', 'NO', 'NO', 'NO', 'NO', 'NO', 'NO'],
  ['NO', 'Blank', 'BaWan', 'JiuBing', 'JiuTiao', 'Blank', 'Blank', 'Blank', 'Blank', 'Blank', 'Blank', 'QiWan', 'SanBing', 'Blank', 'Blank'],
  ['NO', 'Blank', 'YaoJi', 'Blank', 'Bai', 'YiBing', 'Blank', 'Blank', 'Zhong', 'Blank', 'LiuWan', 'YaoJi', 'Blank', 'Blank', 'YaoJi'],
  ['NO', 'ErTiao', 'Zhong', 'ErBing', 'DongFeng', 'BaTiao', 'YiWan', 'Blank', 'SanBing', 'Blank', 'NanFeng', 'JiuTiao', 'SanBing', 'LiuWan', 'DongFeng'],
  ['NO', 'WuWan', 'ErWan', 'QiTiao', 'WuWan', 'Zhong', 'WuTiao', 'Blank', 'SanWan', 'WuBing', 'SanTiao', 'SiTiao', 'SanWan', 'Blank', 'YiBing'],
  ['NO', 'Blank', 'Blank', 'Blank', 'SanWan', 'Fa', 'ErTiao', 'Blank', 'YiBing', 'Bai', 'LiuWan', 'QiWan', 'SiBing', 'WuTiao', 'NanFeng'],
  ['NO', 'SanTiao', 'SiTiao', 'BeiFeng', 'SiWan', 'BeiFeng', 'YiWan', 'ErBing', 'BaTiao', 'QiWan', 'XiFeng', 'Bai', 'SanWan', 'JiuTiao', 'SanTiao'],
  ['NO', 'Bai', 'LiuBing', 'YaoJi', 'LiuBing', 'ErWan', 'SiWan', 'WuWan', 'Blank', 'Blank', 'BaBing', 'WuWan', 'BaWan', 'BaTiao', 'QiWan'],
  ['NO', 'SiBing', 'Blank', 'BaTiao', 'SiTiao', 'LiuWan', 'Fa', 'LiuBing', 'SiTiao', 'DongFeng', 'ErWan', 'LiuBing', 'Blank', 'Blank', 'Blank'],
  ['NO', 'JiuBing', 'Blank', 'JiuBing', 'Blank', 'DongFeng', 'Blank', 'ErWan', 'Blank', 'Blank', 'YiBing', 'BaBing', 'SanBing', 'XiFeng', 'Blank'],
  ['NO', 'Blank', 'Blank', 'Blank', 'Blank', 'Blank', 'Blank', 'Zhong', 'Blank', 'JiuTiao', 'SanTiao', 'Blank', 'Blank', 'Blank', 'Blank']
]
const board_start2 = Board_to_Board2(board_start_arr2)

// 用于多boards测试
// 将9行7列的ErWan改成DongFeng，多一个对脸机会。
const board_start_arr3: Board = [
  ['NO', 'NO', 'NO', 'NO', 'NO', 'NO', 'NO', 'NO', 'NO', 'NO', 'NO', 'NO', 'NO', 'NO', 'NO'],
  ['NO', 'Blank', 'BaWan', 'JiuBing', 'JiuTiao', 'Blank', 'Blank', 'Blank', 'Blank', 'Blank', 'Blank', 'QiWan', 'SanBing', 'Blank', 'Blank'],
  ['NO', 'Blank', 'YaoJi', 'Blank', 'Bai', 'YiBing', 'Blank', 'Blank', 'Zhong', 'Blank', 'LiuWan', 'YaoJi', 'Blank', 'Blank', 'YaoJi'],
  ['NO', 'ErTiao', 'Zhong', 'ErBing', 'DongFeng', 'BaTiao', 'YiWan', 'Blank', 'SanBing', 'Blank', 'NanFeng', 'JiuTiao', 'SanBing', 'LiuWan', 'DongFeng'],
  ['NO', 'WuWan', 'ErWan', 'QiTiao', 'WuWan', 'Zhong', 'WuTiao', 'Blank', 'SanWan', 'WuBing', 'SanTiao', 'SiTiao', 'SanWan', 'Blank', 'YiBing'],
  ['NO', 'Blank', 'Blank', 'Blank', 'SanWan', 'Fa', 'ErTiao', 'Blank', 'YiBing', 'Bai', 'LiuWan', 'QiWan', 'SiBing', 'WuTiao', 'NanFeng'],
  ['NO', 'SanTiao', 'SiTiao', 'BeiFeng', 'SiWan', 'BeiFeng', 'YiWan', 'ErBing', 'BaTiao', 'QiWan', 'XiFeng', 'Bai', 'SanWan', 'JiuTiao', 'SanTiao'],
  ['NO', 'Bai', 'LiuBing', 'YaoJi', 'LiuBing', 'ErWan', 'SiWan', 'WuWan', 'Blank', 'Blank', 'BaBing', 'WuWan', 'BaWan', 'BaTiao', 'QiWan'],
  ['NO', 'SiBing', 'Blank', 'BaTiao', 'SiTiao', 'LiuWan', 'Fa', 'LiuBing', 'SiTiao', 'DongFeng', 'ErWan', 'LiuBing', 'Blank', 'Blank', 'Blank'],
  ['NO', 'JiuBing', 'Blank', 'JiuBing', 'Blank', 'DongFeng', 'Blank', 'DongFeng', 'Blank', 'Blank', 'YiBing', 'BaBing', 'SanBing', 'XiFeng', 'Blank'],
  ['NO', 'Blank', 'Blank', 'Blank', 'Blank', 'Blank', 'Blank', 'Zhong', 'Blank', 'JiuTiao', 'SanTiao', 'Blank', 'Blank', 'Blank', 'Blank']
]
const board_start3 = Board_to_Board2(board_start_arr3)

// 构造一个只剩一对牌牌的准空board，用于测试EndGame时的庆祝画面.
const board_2cardsleft_arr: Board = [
  ['NO', 'NO', 'NO', 'NO', 'NO', 'NO', 'NO', 'NO', 'NO', 'NO', 'NO', 'NO', 'NO', 'NO', 'NO'],
  ['NO', 'Blank', 'Blank', 'Blank', 'Blank', 'Blank', 'Blank', 'Blank', 'Blank', 'Blank', 'Blank', 'Blank', 'Blank', 'Blank', 'Blank'],
  ['NO', 'Blank', 'Blank', 'Blank', 'Blank', 'Blank', 'Blank', 'Blank', 'Blank', 'Blank', 'Blank', 'Blank', 'Blank', 'Blank', 'Blank'],
  ['NO', 'Blank', 'Blank', 'Bai', 'Blank', 'Blank', 'Blank', 'Blank', 'Blank', 'Blank', 'Blank', 'Blank', 'Blank', 'Blank', 'Blank'],
  ['NO', 'Blank', 'Blank', 'Blank', 'Blank', 'Blank', 'Blank', 'Blank', 'Blank', 'Blank', 'Blank', 'Blank', 'Blank', 'Blank', 'Blank'],
  ['NO', 'Blank', 'Blank', 'Blank', 'Blank', 'Blank', 'Blank', 'Blank', 'Blank', 'Blank', 'Blank', 'Blank', 'Blank', 'Blank', 'Blank'],
  ['NO', 'Blank', 'Blank', 'Blank', 'Blank', 'Blank', 'Blank', 'Blank', 'Blank', 'Blank', 'Blank', 'Blank', 'Blank', 'Blank', 'Blank'],
  ['NO', 'Blank', 'Blank', 'Blank', 'Blank', 'Blank', 'Blank', 'Blank', 'Blank', 'Blank', 'Blank', 'Blank', 'Blank', 'Blank', 'Blank'],
  ['NO', 'Blank', 'Blank', 'Blank', 'Blank', 'Blank', 'Blank', 'Blank', 'Blank', 'Blank', 'Blank', 'Blank', 'Blank', 'Blank', 'Blank'],
  ['NO', 'Blank', 'Blank', 'Blank', 'Blank', 'Blank', 'Blank', 'Blank', 'Bai', 'Blank', 'Blank', 'Blank', 'Blank', 'Blank', 'Blank'],
  ['NO', 'Blank', 'Blank', 'Blank', 'Blank', 'Blank', 'Blank', 'Blank', 'Blank', 'Blank', 'Blank', 'Blank', 'Blank', 'Blank', 'Blank']
]
const board_2cardsleft = Board_to_Board2(board_2cardsleft_arr)

// 构造一个右移move时出现消失一cell的bug标本.
const board_xmovebug_arr: Board = [
  ['NO', 'NO', 'NO', 'NO', 'NO', 'NO', 'NO', 'NO', 'NO', 'NO', 'NO', 'NO', 'NO', 'NO', 'NO'],
  ['NO', 'Blank', 'Blank', 'QiTiao', 'SanBing', 'LiuBing', 'JiuWan', 'JiuBing', 'BaBing', 'JiuBing', 'Blank', 'SiBing', 'Fa', 'SanBing', 'JiuWan'],
  ['NO', 'Blank', 'SanTiao', 'SiTiao', 'JiuTiao', 'QiWan', 'SiTiao', 'WuBing', 'SanTiao', 'YiWan', 'BaBing', 'BeiFeng', 'ErWan', 'BaBing', 'JiuTiao'],
  ['NO', 'YiBing', 'SanTiao', 'ErWan', 'SanTiao', 'WuTiao', 'QiTiao', 'YaoJi', 'ErWan', 'WuBing', 'Bai', 'Fa', 'SanBing', 'Zhong', 'LiuWan'],
  ['NO', 'BaTiao', 'Fa', 'LiuWan', 'NanFeng', 'DongFeng', 'BaWan', 'LiuTiao', 'BaWan', 'BaTiao', 'WuBing', 'SiBing', 'BaBing', 'LiuBing', 'WuBing'],
  ['NO', 'DongFeng', 'YiWan', 'YiBing', 'Zhong', 'QiWan', 'DongFeng', 'YiBing', 'LiuTiao', 'Zhong', 'QiBing', 'NanFeng', 'SiWan', 'ErBing', 'XiFeng'],
  ['NO', 'WuTiao', 'QiWan', 'JiuTiao', 'ErWan', 'SiWan', 'WuWan', 'LiuBing', 'SanWan', 'XiFeng', 'YiWan', 'XiFeng', 'YaoJi', 'SanWan', 'BaWan'],
  ['NO', 'Bai', 'QiBing', 'BaWan', 'ErBing', 'YaoJi', 'SiBing', 'LiuTiao', 'YiBing', 'QiTiao', 'JiuWan', 'LiuBing', 'QiTiao', 'Zhong', 'LiuWan'],
  ['NO', 'SiTiao', 'JiuBing', 'LiuWan', 'JiuWan', 'Bai', 'WuTiao', 'SanWan', 'Blank', 'Bai', 'JiuBing', 'SiBing', 'DongFeng', 'SiTiao', 'WuTiao'],
  ['NO', 'Blank', 'Blank', 'Blank', 'YiWan', 'Fa', 'SanWan', 'Blank', 'SanBing', 'Blank', 'LiuTiao', 'Blank', 'BeiFeng', 'WuWan', 'Blank'],
  ['NO', 'XiFeng', 'YaoJi', 'Blank', 'Blank', 'JiuTiao', 'QiWan', 'ErBing', 'Blank', 'Blank', 'ErBing', 'Blank', 'Blank', 'Blank', 'Blank']
]
const board_xmovebug = Board_to_Board2(board_xmovebug_arr)

export { board_start, board_start2, board_start3, board_2cardsleft, board_xmovebug }
