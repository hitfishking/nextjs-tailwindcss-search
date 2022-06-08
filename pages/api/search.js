import { connectToElasticsearch } from '../../lib/elasticsearch'

export default async function search (req, res) {
  const client = await connectToElasticsearch()
  const query = req.body
  // const query1 = 'sun'
  const { body } = await client.search({
    index: 'movies-index',
    body: {
      query: {
        match: {
          title: query
        }
      }
    }
  })
  const searchResults = body.hits.hits
  res.status(200).json({ searchResults })
}
