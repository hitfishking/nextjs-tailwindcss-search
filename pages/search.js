import PropTypes from 'prop-types'
import { useRef, useState } from 'react'
import Head from 'next/head'
import { IngestDataIntoESS, ConfigureESS } from '../pages/ingest'
import { isConnectedToESS } from '../lib/elasticsearch'
import styles from './search.module.scss'
// console.log(styles)

export default function search ({ isConnected, dataIngested }) {
  let result
  const textInput = useRef('')
  const [results, setResults] = useState([])

  const searchQuery = async (event) => { // 函数组件内再函数
    event.preventDefault()
    const query = textInput.current.value // 取被引用的dom的值.
    const res = await fetch('/api/search', { // browser端访问服务器的推荐函数.
      method: 'POST',
      body: JSON.stringify(query),
      headers: { 'Content-Type': 'application/json' }
    })
    result = await res.json() // result仅是一个临时中转变量.
    setResults(result.searchResults)
  }

  return (
			<div className="bg-gray-300">
				<Head>
					<title>Search</title>
					<link rel="icon" href="/favicon.ico" />
				</Head>
				{/* 只在数据库中有内容时才显示SearchPage组件 */}
				{(isConnected && dataIngested) && <SearchPage textInput={textInput} searchQuery={searchQuery} results={results}/>}
				{(isConnected === true && dataIngested === false) && <IngestDataIntoESS/> }
				{(isConnected === false) && <ConfigureESS/>}
			</div>
  )
}

function SearchPage (props) {
  const results = props.results
  return (
			<div>
				<SearchBar textInput={props.textInput} searchQuery={props.searchQuery} />
				<SearchResults results={results}/>
			</div>
  )
}
SearchPage.propTypes = {
  results: PropTypes.array,
  textInput: PropTypes.object,
  searchQuery: PropTypes.string.isRequired
}

function SearchBar (props) {
  return (
			<div className="top h-96 overflow-hidden flex items-center justify-center" >
					<div className="pt-2 relative mx-auto text-gray-600">
							{/* 反向将input element存入textInput变量中 */}
							<input ref={ props.textInput } className="border-2 border-gray-300 bg-white h-10 w-96 px-5 pr-16 rounded-lg text-sm focus:outline-none"
									type="search" name="search" id="input_1" placeholder="Search..." />
							{/* 调用组件内定义的函数 */}
							<p className= {styles.mycolor + '  ' + styles.hideit }>hello world</p>
							<style jsx>
								{`
								  p1 {color: blue}
									.myclass {color: red}
									/*input[type="search"]::-webkit-search-cancel-button {
   									display: none;
									}*/
									#input_1::-webkit-search-cancel-button {
										display: none;
									}
								`}
							</style>
							<p>abddongzheng</p>
							<a href="#" style={{ color: 'red' }} onClick={props.searchQuery} className="absolute right-0 top-0 mt-5 mr-4">
									{/* 放大镜svg图标 */}
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
SearchBar.propTypes = {
  textInput: PropTypes.object,
  searchQuery: PropTypes.string.isRequired
}

function SearchResults (props) {
  const results = props.results
  return (
        <div className="grid grid-flow-col grid-rows-3 gap-4 justify-evenly">
					{(
						results.map((element) => (
								<div key={element._id} className="rounded-lg bg-white shadow-lg">
									<div className="px-6 py-4">
										<h3 className="text-lg font-semibold text-gray-800">{element._source.title}</h3>
										<p className="text-gray-600"> {element._source.year}</p>
										<p className="text-gray-600"> {element._source.info.plot}</p>
										<p className="text-gray-600"> {element._source.info.directors}</p>
										<div className="text-brand-dark hover:text-brand font-semibold text-sm mt-4">
												Rating {element._source.info.rating} / 10
										</div>
									</div>
								</div>
						))
					)}
        </div>

  )
}
SearchResults.propTypes = {
  results: PropTypes.array
}

export async function getServerSideProps () {
  return isConnectedToESS()
}
