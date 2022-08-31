import 'tailwindcss/tailwind.css'
import { AppProps } from 'next/app'

// 模块相当于一个背景函数，导入模块时会执行一次该背景函数，相关的env都会建立起来，并与当前宿主模块关联。
// 所以，当引入Provider的时候，该模块内的Context、dispatcher等变量，包括各种类、函数资源定义，其实都有了，
// 只是多数不能被宿主模块访问，但可以被那些导出到宿主模块中的资源访问到。
import { Provider } from '../models/lib_usemodel'
import useGameModel from '../models/useGameModel'

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
		<>
			<Provider models={{ useGameModel }}>
				<Component {...pageProps} />
			</Provider>
		</>
  )
}

export default MyApp
