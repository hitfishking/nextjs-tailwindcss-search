import { ReactNode } from 'react'

type IBackgroundProps = {
  children: ReactNode;
  color: string;
};

// Background组件的作用就是设置背景颜色。
const Background = (props: IBackgroundProps) => (
  <div className={props.color}>{props.children}</div>
)

export { Background }
