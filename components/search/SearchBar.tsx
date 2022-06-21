import * as React from 'react'
import styles from '../../styles/search.module.scss'
// 子组件props的types在父组件中定义，子组件import进来即可.
import { Input_Props as Props } from './SearchFrame'

export const SearchBar: React.FC<Props> = (props) => {
  return (
		<div className="top h-96 overflow-hidden flex items-center justify-center" >
			<div className="pt-2 relative mx-auto text-gray-600">
				{/* ref属性保存input dom元素的指针; input Tag有一种'search'类型. */}
				<input ref={ props.textInput } className="border-2 border-gray-300 bg-white h-10 w-96 px-5 pr-16 rounded-lg text-sm focus:outline-none"
						type="search" name="search" id="input_1" placeholder="Search movies..." />
				{/* 以下展示inline、css module class、css module自由模式 3种组件内style样式书写模式 */}
				<p className= {styles.mycolor + '  ' + styles.hideit }>hello world</p>
				<style jsx>
					{`
						p1 {color: blue}
						.myclass {color: red}
						/*以下2种方式都可以关闭search框上的‘×’号,作为复杂一般性css规则的使用演示.*/
						/*input[type="search"]::-webkit-search-cancel-button {
							display: none;
						}*/
						#input_1::-webkit-search-cancel-button {
							display: none;
						}
					`}
				</style>
				<p>dongzheng</p>
				{/* 放大镜svg图标-链接 */}
				<a href="#" style={{ color: 'red' }} onClick={props.searchQuery} className="absolute right-0 top-0 mt-5 mr-4">
					<svg className="text-gray-600 h-4 w-4 fill-current" version="1.1" id="Capa_1" x="0px" y="0px"
							viewBox="0 0 56.966 56.966"
							width="512px" height="512px">
							<path
									d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
					</svg>
				</a>
			</div>
		</div>
  )
}
