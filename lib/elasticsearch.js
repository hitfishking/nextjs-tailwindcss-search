// 该\lib程序引入本项目的一个重大外部库：elasticsearch.js，功能强大，用于全面访问远程Elasticsearch数据库。
// 本库文件作为该外部库在本项目中的总入口。
import { Client } from '@elastic/elasticsearch'

export async function connectToElasticsearch () {
  const ESS_CLOUD_ID = process.env.ESS_CLOUD_ID
  const ESS_CLOUD_USERNAME = process.env.ESS_CLOUD_USERNAME
  const ESS_CLOUD_PASSWORD = process.env.ESS_CLOUD_PASSWORD

  if (!ESS_CLOUD_ID || !ESS_CLOUD_USERNAME || !ESS_CLOUD_PASSWORD) {
    return 'ERR_ENV_NOT_DEFINED' // 这种直接返回错误名的方式，有优点，也可能有缺点。
  }

  return new Client({
    // cloud: {
    //     id: ESS_CLOUD_ID,
    // },
    node: ESS_CLOUD_ID,
    auth: {
      username: ESS_CLOUD_USERNAME,
      password: ESS_CLOUD_PASSWORD
    }
  })
}

export async function isConnectedToESS () {
  let isConnected = false
  let dataIngested = false
  let docCount = 0

  const client = await connectToElasticsearch()
  if (client !== 'ERR_ENV_NOT_DEFINED') {
    isConnected = true

    try {
      const { body: status } = await client.cat.count({
        index: 'movies-index',
        format: 'json'
      })

      // status == [{"epoch":"1654243886","timestamp":"08:11:26","count":"5000"}]
      if (status && status[0].count > 0) {
        docCount = status[0].count
        dataIngested = true
      }
    } catch (e) {
      console.error('[WARN] Index {movies-index} Not found, ingest some data!')
    }
  }

  return {
    props: {
      isConnected,
      dataIngested,
      docCount
    }
  }
}
