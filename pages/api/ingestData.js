import { connectToElasticsearch } from '../../lib/elasticsearch'
import { createReadStream } from 'fs' // nodejs fs模块内建数据流对象。

export default async function ingestData (req, res) {
  const split = require('split2')
  const client = await connectToElasticsearch()
  await client.helpers.bulk({
    datasource: createReadStream('./movies.json').pipe(split()),
    onDocument (doc) {
      return {
        index: { _index: 'movies-index' }
      }
    },
    onDrop (doc) {
      console.log(doc)
    }
  })

  res.redirect('/ingest') // 数据注入完毕后，response对象令browser重定向到/ingest页面。
}
