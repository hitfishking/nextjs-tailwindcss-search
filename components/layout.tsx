import Head from 'next/head'
import styles from './layout.module.css'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'
import { ReactNode } from 'react'

type ILayoutProps = {
  home?: Boolean
  children: ReactNode
}

const name = 'Hitfishking'
export const siteTitle = 'Next.js Sample Website'

export default function Layout ({ home, children }: ILayoutProps) {
  return (
    <div className={styles.container}>
      <Head>
        <link rel='icon' href='/favicon.ico' />
        <meta
          name='description'
          content='Learn how to build a personal website using Next.js'
        />
        <meta
          property='og:image'
          content={`https://og-image.now.sh/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name='og:title' content={siteTitle} />
        <meta name='twitter:card' content='summary_large_image' />
      </Head>

      <header className={styles.header}>
        {/* Layout可以用于home主页，也可以用于具体的post文章页；header中包括img和name标题；根据是否是home页，使用不同尺寸的img和标题 */}
        {home
          ? (
          <>
            <img
              src='/images/profile.jpg'
              className={`${styles.headerHomeImage} ${utilStyles.borderCircle}`}
              alt={name}
            />
            <h1 className={utilStyles.heading2Xl}>{name}</h1>
          </>
            )
          : (
          <>
            <Link href='/'>
              <a>
                <img
                  src='/images/profile.jpg'
                  className={`${styles.headerImage} ${utilStyles.borderCircle}`}
                  alt={name}
                />
              </a>
            </Link>
            <h2 className={utilStyles.headingLg}>
              <Link href='/'>
                <a className={utilStyles.colorInherit}>{name}</a>
              </Link>
            </h2>
          </>
            )}
      </header>

			{/* 页面的内容部分通过children传入 */}
      <main>{children}</main>

      {/* 只有具体的文章页面里才有返回链接 */}
      {!home && (
        <div className={styles.backToHome}>
          <Link href='/'>
            <a>← Back to home</a>
          </Link>
        </div>
      )}
    </div>
  )
}
