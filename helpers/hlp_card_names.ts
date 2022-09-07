import { KeysType } from '../types/I_YiYiKan'

// 导入所有的麻将牌,定义card变量
import YaoJi from '../public/assets/mj1/Tiao1.jpg'
import ErTiao from '../public/assets/mj1/Tiao2.jpg'
import SanTiao from '../public/assets/mj1/Tiao3.jpg'
import SiTiao from '../public/assets/mj1/Tiao4.jpg'
import WuTiao from '../public/assets/mj1/Tiao5.jpg'
import LiuTiao from '../public/assets/mj1/Tiao6.jpg'
import QiTiao from '../public/assets/mj1/Tiao7.jpg'
import BaTiao from '../public/assets/mj1/Tiao8.jpg'
import JiuTiao from '../public/assets/mj1/Tiao9.jpg'
// 饼
import YiBing from '../public/assets/mj1/Bing1.jpg'
import ErBing from '../public/assets/mj1/Bing2.jpg'
import SanBing from '../public/assets/mj1/Bing3.jpg'
import SiBing from '../public/assets/mj1/Bing4.jpg'
import WuBing from '../public/assets/mj1/Bing5.jpg'
import LiuBing from '../public/assets/mj1/Bing6.jpg'
import QiBing from '../public/assets/mj1/Bing7.jpg'
import BaBing from '../public/assets/mj1/Bing8.jpg'
import JiuBing from '../public/assets/mj1/Bing9.jpg'
// 万
import YiWan from '../public/assets/mj1/Wan1.jpg'
import ErWan from '../public/assets/mj1/Wan2.jpg'
import SanWan from '../public/assets/mj1/Wan3.jpg'
import SiWan from '../public/assets/mj1/Wan4.jpg'
import WuWan from '../public/assets/mj1/Wan5.jpg'
import LiuWan from '../public/assets/mj1/Wan6.jpg'
import QiWan from '../public/assets/mj1/Wan7.jpg'
import BaWan from '../public/assets/mj1/Wan8.jpg'
import JiuWan from '../public/assets/mj1/Wan9.jpg'
// 中发白
import Zhong from '../public/assets/mj1/Zhong.jpg'
import Fa from '../public/assets/mj1/Fa.jpg'
import Bai from '../public/assets/mj1/Bai.jpg'
// 东西南北风
import DongFeng from '../public/assets/mj1/FengDong.jpg'
import XiFeng from '../public/assets/mj1/FengXi.jpg'
import NanFeng from '../public/assets/mj1/FengNan.jpg'
import BeiFeng from '../public/assets/mj1/FengBei.jpg'

// 上面import是定义卡片变量，以下是用这些变量建立一个key: value(变量名:变量值)的js数组。
const IMG_URLS_obj = {
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

export const IMG_URLS = {
  YaoJi: '/assets/mj1/Tiao1.jpg',
  ErTiao: '/assets/mj1/Tiao2.jpg',
  SanTiao: '/assets/mj1/Tiao3.jpg',
  SiTiao: '/assets/mj1/Tiao4.jpg',
  WuTiao: '/assets/mj1/Tiao5.jpg',
  LiuTiao: '/assets/mj1/Tiao6.jpg',
  QiTiao: '/assets/mj1/Tiao7.jpg',
  BaTiao: '/assets/mj1/Tiao8.jpg',
  JiuTiao: '/assets/mj1/Tiao9.jpg',
  YiBing: '/assets/mj1/Bing1.jpg',
  ErBing: '/assets/mj1/Bing2.jpg',
  SanBing: '/assets/mj1/Bing3.jpg',
  SiBing: '/assets/mj1/Bing4.jpg',
  WuBing: '/assets/mj1/Bing5.jpg',
  LiuBing: '/assets/mj1/Bing6.jpg',
  QiBing: '/assets/mj1/Bing7.jpg',
  BaBing: '/assets/mj1/Bing8.jpg',
  JiuBing: '/assets/mj1/Bing9.jpg',
  YiWan: '/assets/mj1/Wan1.jpg',
  ErWan: '/assets/mj1/Wan2.jpg',
  SanWan: '/assets/mj1/Wan3.jpg',
  SiWan: '/assets/mj1/Wan4.jpg',
  WuWan: '/assets/mj1/Wan5.jpg',
  LiuWan: '/assets/mj1/Wan6.jpg',
  QiWan: '/assets/mj1/Wan7.jpg',
  BaWan: '/assets/mj1/Wan8.jpg',
  JiuWan: '/assets/mj1/Wan9.jpg',
  Zhong: '/assets/mj1/Zhong.jpg',
  Fa: '/assets/mj1/Fa.jpg',
  Bai: '/assets/mj1/Bai.jpg',
  DongFeng: '/assets/mj1/FengDong.jpg',
  XiFeng: '/assets/mj1/FengXi.jpg',
  NanFeng: '/assets/mj1/FengNan.jpg',
  BeiFeng: '/assets/mj1/FengBei.jpg'
}

export function getImage (name: KeysType): string {
  return IMG_URLS[name]
  // return IMG_URLS_obj[name]
}

export const EN_to_CN = {
  YaoJi: '幺鸡',
  ErTiao: '二条',
  SanTiao: '三条',
  SiTiao: '四条',
  WuTiao: '五条',
  LiuTiao: '六条',
  QiTiao: '七条',
  BaTiao: '八条',
  JiuTiao: '九条',
  YiBing: '一饼',
  ErBing: '二饼',
  SanBing: '三饼',
  SiBing: '四饼',
  WuBing: '五饼',
  LiuBing: '六饼',
  QiBing: '七饼',
  BaBing: '八饼',
  JiuBing: '九饼',
  YiWan: '一万',
  ErWan: '二万',
  SanWan: '三万',
  SiWan: '四万',
  WuWan: '五万',
  LiuWan: '六万',
  QiWan: '七万',
  BaWan: '八万',
  JiuWan: '九万',
  Zhong: '中',
  Fa: '发',
  Bai: '白',
  DongFeng: '东风',
  XiFeng: '西风',
  NanFeng: '南风',
  BeiFeng: '北风'
}

export function getCardCName (name: KeysType): string {
  return EN_to_CN[name]
}
