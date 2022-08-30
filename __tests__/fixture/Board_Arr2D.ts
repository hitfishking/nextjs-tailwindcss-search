import { Board } from '@/types'

const board_start: Board = [
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

// 将第二行后面的QiTiao改成Blank，令第1行和第3行的三饼对脸.
// 将9行1列的WuBing改成JiuBing，令其与9行3列的JiuBing对脸.
const board_start2:Board = [
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

// 用于多boards测试
// 将9行7列的ErWan改成DongFeng，多一个对脸机会。
const board_start3:Board = [
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
export { board_start, board_start2, board_start3 }
