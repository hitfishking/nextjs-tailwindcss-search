import { useRef, useState } from 'react'
import { isConnectedToESS } from '../lib/elasticsearch'
import { IngestDataIntoESS } from '../components/ingest/IngestDataIntoESS'
import { ConfigureESS } from '../components/ingest/ConfigureESS'
import { SearchFrame } from '../components/search/SearchFrame'
import Head from 'next/head'

export default function search ({ isConnected, dataIngested }) {
  let result
  const textInput = useRef<HTMLInputElement | null>()
  const [results, setResults] = useState([])

  // 组件内函数，client-side fetching；调用server侧/api功能完成工作。在用户UI交互时调用此函数；作为属性之一传入组件。
  const searchQuery = async (event) => {
    event.preventDefault()
    const query = textInput.current!.value // 取被引用的dom的值.
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
				{(isConnected && dataIngested) && <SearchFrame textInput={textInput} searchQuery={searchQuery} results={results}/>}
			{(isConnected === true && dataIngested === false) && <IngestDataIntoESS /> }
				{(isConnected === false) && <ConfigureESS/>}
			</div>
  )
}

export async function getServerSideProps () {
  return isConnectedToESS()
}
