// 导入所有的麻将牌,定义card变量
// 条
import YaoJi from '../assets/mj1/Tiao1.jpg'
import ErTiao from '../assets/mj1/Tiao2.jpg'
import SanTiao from '../assets/mj1/Tiao3.jpg'
import SiTiao from '../assets/mj1/Tiao4.jpg'
import WuTiao from '../assets/mj1/Tiao5.jpg'
import LiuTiao from '../assets/mj1/Tiao6.jpg'
import QiTiao from '../assets/mj1/Tiao7.jpg'
import BaTiao from '../assets/mj1/Tiao8.jpg'
import JiuTiao from '../assets/mj1/Tiao9.jpg'
// 饼
import YiBing from '../assets/mj1/Bing1.jpg'
import ErBing from '../assets/mj1/Bing2.jpg'
import SanBing from '../assets/mj1/Bing3.jpg'
import SiBing from '../assets/mj1/Bing4.jpg'
import WuBing from '../assets/mj1/Bing5.jpg'
import LiuBing from '../assets/mj1/Bing6.jpg'
import QiBing from '../assets/mj1/Bing7.jpg'
import BaBing from '../assets/mj1/Bing8.jpg'
import JiuBing from '../assets/mj1/Bing9.jpg'
// 万
import YiWan from '../assets/mj1/Wan1.jpg'
import ErWan from '../assets/mj1/Wan2.jpg'
import SanWan from '../assets/mj1/Wan3.jpg'
import SiWan from '../assets/mj1/Wan4.jpg'
import WuWan from '../assets/mj1/Wan5.jpg'
import LiuWan from '../assets/mj1/Wan6.jpg'
import QiWan from '../assets/mj1/Wan7.jpg'
import BaWan from '../assets/mj1/Wan8.jpg'
import JiuWan from '../assets/mj1/Wan9.jpg'
// 中发白
import Zhong from '../assets/mj1/Zhong.jpg'
import Fa from '../assets/mj1/Fa.jpg'
import Bai from '../assets/mj1/Bai.jpg'
// 东西南北风
import DongFeng from '../assets/mj1/FengDong.jpg'
import XiFeng from '../assets/mj1/FengXi.jpg'
import NanFeng from '../assets/mj1/FengNan.jpg'
import BeiFeng from '../assets/mj1/FengBei.jpg'

// 上面import是定义卡片变量，以下是用这些变量建立一个key: value(变量名:变量值)的js数组。
export const IMG_URLS = {
  YaoJi,
  ErTiao,
  SanTiao,
  SiTiao,
  WuTiao,
  LiuTiao,
  QiTiao,
  BaTiao,
  JiuTiao,
  YiBing,
  ErBing,
  SanBing,
  SiBing,
  WuBing,
  LiuBing,
  QiBing,
  BaBing,
  JiuBing,
  YiWan,
  ErWan,
  SanWan,
  SiWan,
  WuWan,
  LiuWan,
  QiWan,
  BaWan,
  JiuWan,
  Zhong,
  Fa,
  Bai,
  DongFeng,
  XiFeng,
  NanFeng,
  BeiFeng
}

export function getImage (name: keyof typeof IMG_URLS): string {
  return IMG_URLS[name].src
}
