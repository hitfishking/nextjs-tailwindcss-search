import { IMG_URLS } from '../helpers'
import { Cell, Board2 } from '../types/I_YiYiKan'

// 调用例子1: pick(model, 'elapsedMs', 'status', 'reset')
// 调用例子2: pick(model, 'leftMatched')
// 第一个参数是一个对象，后面的参数是该对象中的若干key
// 可以通过语法...keys:K[]，将调用时多个分散的key参数，合并成一个数组.
// Pick<T,K>是Typescript自带的标准类型，本质是一个复合key-value条件的对象类型: { [P in K]: T[P]; }
// Array.reduce()函数的初始值prev是一个空的对象{},根据输入数组，不断从obj中选择key-value到该空对象中。
// Array.reduce()函数就是将数组的各项逐个处理，迭代聚合成一个综合的结果。
export function pick<T extends Object, K extends keyof T> (obj: T, ...keys: K[]): Pick<T, K> {
  return keys.reduce((prev, cur) => {
    prev[cur] = obj[cur]
    return prev
  }, {} as Pick<T, K>)
}

export function playAudio (name:string) {
  let sound = null
  switch (name) {
    case 'shuffle':
      sound = new Audio('/assets/sound/shuffle_new.mp3')
      break
    case 'f2f':
      sound = new Audio('/assets/sound/f2f_new.mp3')
      break
    case 'endgame':
      sound = new Audio('/assets/sound/endgamevoice.mp3')
      break
    default:
      return
  }
  sound.play()
}
