import { ReactNode } from 'react'

import Link from 'next/link'

// 该组件支持children子组件。
type INavbarProps = {
  logo: ReactNode;
  children: ReactNode;
};

// 定义带子组件的组件，只需按普通组件正常定义即可，将参数props中传来的children(ReactNode类型)做为"子函数"调用即可。
// 带子组件的组件
const NavbarTwoColumns = (props: INavbarProps) => (
  <div className="flex flex-wrap justify-between items-center">
    <div>
      <Link href="/">
        <a>{props.logo}</a>
      </Link>
    </div>

    <nav>
      <ul className="navbar flex items-center font-medium text-xl text-gray-800">
        {props.children}
      </ul>
    </nav>

    <style jsx>
      {`
        .navbar :global(li:not(:first-child)) {
          @apply mt-0;
        }

        .navbar :global(li:not(:last-child)) {
          @apply mr-5;
        }
      `}
    </style>
  </div>
)

export { NavbarTwoColumns }
