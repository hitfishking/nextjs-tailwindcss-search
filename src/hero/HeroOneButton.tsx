import { ReactNode } from 'react'

// 本组件不支持子组件，3个属性都要通过属性区赋值传入.
// 其实，button属性就是一个ReactNode对象，只不过是通过属性名button=...方式传入的，而不是通过嵌套的children方式。
type IHeroOneButtonProps = {
  title: ReactNode;
  description: string;
  button: ReactNode;
};

const HeroOneButton = (props: IHeroOneButtonProps) => (
  <header className="text-center">
    <h1 className="text-5xl text-gray-900 font-bold whitespace-pre-line leading-hero">
      {props.title}
    </h1>
    <div className="text-2xl mt-4 mb-16">{props.description}</div>

    {props.button}
  </header>
)

export { HeroOneButton }
