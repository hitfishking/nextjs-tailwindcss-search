import * as React from 'react'
import { IPost } from '../types'

type Props = {
  savePost: (e: React.FormEvent, formData: IPost) => void
}

const AddPost: React.FC<Props> = ({ savePost }) => { // savePost()函数是外部传入进来的。
  const [formData, setFormData] = React.useState<IPost>()

  const handleForm = (e: React.FormEvent<HTMLInputElement>): void => {
    setFormData({
      ...formData,
      [e.currentTarget.id]: e.currentTarget.value // id可能是title、body，会覆盖原formData中IPost结构数据的同名字段值。
    })
  }

  return (
		<form className='Form' onSubmit={(e) => savePost(e, formData)}>  {/* savePost是顶层page组件传下来的函数，被本组件调用，为其提供输入参数. */}
      <div>
        <div className='Form--field'>
          <label htmlFor='name'>Title</label>
					<input onChange={handleForm} type='text' id='title' /> { /* 在交互过程中实时改变函数状态变量的内容 */}
        </div>
        <div className='Form--field'>
          <label htmlFor='body'>Description</label>
          <input onChange={handleForm} type='text' id='body' />
        </div>
      </div>
      <button
        className='Form__button'
        disabled={formData === undefined}
      >
        Add Post
      </button>
    </form>
  )
}

export default AddPost
