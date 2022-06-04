import PropTypes from 'prop-types'
import Head from 'next/head'
import { isConnectedToESS } from '../lib/elasticsearch'

// nextjs中所有react组件都倾向于用函数组件。
export default function ingest ({ isConnected, dataIngested, docCount }) {
  // react函数组件直接返回JSX，不用调用render().
  return (
  //* css使用tailwindcss
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Ingesting data into Elasticsearch</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* 根据几种不同情况，在页面上显示不同的组件. */}
      {(isConnected && dataIngested) && <DataIngested docCount={docCount}/>}
      {(isConnected === true && dataIngested === false) && <IngestDataIntoESS/>}
      {(isConnected === false) && <ConfigureESS/>}
    </div>
  )
}

DataIngested.propTypes = {
  docCount: PropTypes.number.isRequired
}
export function DataIngested (props) {
  return (
    <div className="text-center text-2xl">
      <p className="break-all tracking-normal max-w-xl leading-loose">
        🎉 You{'\''} ve ingested <span className="animate-bounce text-red-800 font-bold">{props.docCount}</span> documents into Elasticsearch!
     </p>
    </div>
  )
}

export function ConfigureESS () {
  return <div className="">
  <p className="text-2xl">
    It seems you have not configured Elasticsearch!
    <p className="p-20 pt-2 text-xl">
      Get started by editing <code className="pl-1 pr-1 bg-gray-200 rounded-md">env.local</code>
    </p>
  </p>
</div>
}

export function IngestDataIntoESS (props) {
  return (
    <div>
      <p className="text-center">You{'\''}re connected to Elastic Cloud! Hit below button to ingest sample data.</p>
        {/* 显示一个链接，指向nextjs服务器端的api函数，在后台完成json数据向ES服务器中的Ingest. */}
        <div className="text-center pt-2">
          <a href="/api/ingestData" className="inline-block px-5 py-3 rounded-lg shadow-lg bg-poppy text-black tracking-wider font-semibold text-sm">
            Ingest!
          </a>
        </div>
    </div>
  )
}

export async function getServerSideProps () {
  return isConnectedToESS()
}
