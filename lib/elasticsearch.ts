import { Client } from '@elastic/elasticsearch'

export async function connectToElasticsearch () {
  const ESS_CLOUD_ID = process.env.ESS_CLOUD_ID
  const ESS_CLOUD_USERNAME = process.env.ESS_CLOUD_USERNAME
  const ESS_CLOUD_PASSWORD = process.env.ESS_CLOUD_PASSWORD

  if (!ESS_CLOUD_ID || !ESS_CLOUD_USERNAME || !ESS_CLOUD_PASSWORD) {
    return 'ERR_ENV_NOT_DEFINED'
  }

  return new Client({
    // cloud: {
    //   id: ESS_CLOUD_ID
    // },
    node: ESS_CLOUD_ID,
    auth: {
      username: ESS_CLOUD_USERNAME,
      password: ESS_CLOUD_PASSWORD
    }
  })
}

type ServerSideProps = {
	props: {
		isConnected: boolean;
		dataIngested: boolean;
		docCount: number;
	}
}

// 该函数在search、indgest等page的getServerSideProps()中调用，用于准备page调用的参数对象props。
export async function isConnectedToESS (): Promise<ServerSideProps> {
  let isConnected = false
  let dataIngested = false
  let docCount = 0
  const client = await connectToElasticsearch()
  if (client !== 'ERR_ENV_NOT_DEFINED') {
    isConnected = true

    try {
      const { body: status } = await client.cat.count({ // typescirpt如何做json的解构赋值?
        index: 'movies-index',
        format: 'json'
      })
      console.log(status) //  [ { epoch: '1654619997', timestamp: '16:39:57', count: '5000' } ]
      if (status && status[0].count > 0) {
        docCount = status[0].count
        dataIngested = true
      }
    } catch (e) {
      console.error('[WARN] Index {} Not found, ingest some data!')
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
