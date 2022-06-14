import { connectToElasticsearch } from '../../lib/elasticsearch'
import { createReadStream } from 'fs'

// 每次执行/api/ingestData，都会想ES库中注入一次movies数据.
export default async function ingestData (req, res) {
  const split = require('split2')
  const client = await connectToElasticsearch()
  await client.helpers.bulk({
    datasource: createReadStream('./movies.json').pipe(split()), // read stream成为管道，逐一读取json数据.
    onDocument (doc) {
      return {
        index: { _index: 'movies-index' } // 用每个读到的json doc构造ES的 index指令，发给ES，插入指定的库(movies-index)
      }
    },
    onDrop (doc) {
      console.log(doc)
    }
  })

  res.redirect('/ingest')
}
