import React from 'react'
import { CARD_URLS } from '@/helpers'

// ----------------------------
// 界面操作中的类型
export interface IClickable {
  onClick: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void
}

// 枚举类型需要逐个显式声明，对于定义卡片名称那样较长的列表比较麻烦，不如使用js对象+keyof typeof方案.
export enum STATUS {
  READY = 'READY',
  PLAYING = 'PLAYING',
  PASS = 'PASS',
}
