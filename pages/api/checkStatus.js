import { connectToElasticsearch } from '../../lib/elasticsearch'

export default async function checkStatus (req, res) {
  const client = await connectToElasticsearch()
  if (client === 'ERR_ENV_NOT_DEFINED') {
    console.error('Env Not Defined, check .env.local please!')
    res.status(400).json({ error: 'ERR_ENV_NOT_DEFINED' })
    return { error: "client === 'ERR_ENV_NOT_DEFINED'" }
  }

  try {
    const { body: status } = await client.cat.count({
      index: 'movies-index',
      format: 'json'
    })
    console.log(status)
    res.status(200).json(status)
  } catch (e) {
    console.error('[WARN] Index {movies-index} Not found, ingest some data!')
    res.status(400).json('dongz')
  }
}
