/* eslint-disable no-mixed-spaces-and-tabs */
import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'
import { getSortedPostsMeta } from '../lib/posts'
import Date from '../components/date'
import { GetStaticProps } from 'next'
import { IPostMeta } from '../types'

export default function Home ({ allPostsMeta }:{allPostsMeta: IPostMeta[]}) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      <section className={utilStyles.headingMd}>
        <p>
          Hi, I'm Hitfishking, a full stack developer from China Hainan
          province.
        </p>
        <p>You can contact me on github.</p>
        <p>
          (This is a sample website - you’ll be building a site like this on{' '}
          <a href='https://www.nextjs.cn/learn'>our Next.js tutorial</a>.)
        </p>
      </section>

      <Link href='/posts/first-post'>第一篇blog</Link>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsMeta.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const allPostsMeta = getSortedPostsMeta()
  return {
    props: {
      allPostsMeta
    }
  }
}
