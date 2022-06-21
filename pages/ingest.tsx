import Head from 'next/head'
import { isConnectedToESS } from '../lib/elasticsearch'
import { DataIngested } from '../components/ingest/DataIngested'
import { IngestDataIntoESS } from '../components/ingest/IngestDataIntoESS'
import { ConfigureESS } from '../components/ingest/ConfigureESS'

export default function ingest ({ isConnected, dataIngested, docCount }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <Head>
        <title>Ingesting data into Elasticsearch</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {(isConnected && dataIngested) && <DataIngested docCount={docCount}/>}
      {(isConnected === true && dataIngested === false) && <IngestDataIntoESS/> }
      {(isConnected === false) && <ConfigureESS/>}
    </div>
  )
}

export async function getServerSideProps () {
  return isConnectedToESS()
}
