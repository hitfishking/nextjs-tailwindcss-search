/* eslint-disable no-mixed-spaces-and-tabs */
import Layout from '../../components/layout'
import { getAllPostIds, getPostData } from '../../lib/posts'
import Head from 'next/head'
import Date from '../../components/date'
import utilStyles from '../../styles/utils.module.css'
import { GetStaticProps, GetStaticPaths } from 'next'
// import {GetServerSideProps} from 'next'
import { IPostMeta } from '../../types'

type IPostData = IPostMeta & {
	contentHtml: string
}

const Post = ({ postData }:{postData: IPostData}) => {
  return (
    <Layout>
			<Head>
				<title>{postData.title}</title>
			</Head>

			<article>
				<h1 className={utilStyles.headingXl}>{postData.title}</h1>
				<div className={utilStyles.lightText}>
					<Date dateString={postData.date} />
				</div>
				<div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
			</article>
    </Layout>
  )
}
export default Post

// 在“静态build期间”，next.js会先执行该函数，生成静态页面的全部path数据.
// dev模式下，每次请求都会调用getStaticPaths().
export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds()
  return {
    paths, // 第一项要求是params数组.
    fallback: false
  }
}

// 用户请求http://localhost:3000/posts/ssg-ssr，posts/ssg-ssr符合posts/:id模式，
// params中置入id key， next.js调用getStaticProps({ params }).
// params参数内容的设置，是由next.js框架完成的.
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postData = await getPostData(params.id)
  return {
    props: {
      postData
    }
  }
}
