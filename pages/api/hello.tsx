import { NextApiRequest, NextApiResponse } from 'next'

// 这个hello api只是用来测试：用户通过localhost:3000/hello即可访问该api，获得相应(response)数据。
export default (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({ text: 'Hello' })
}
