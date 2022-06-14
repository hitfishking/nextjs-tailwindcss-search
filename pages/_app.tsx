import 'tailwindcss/tailwind.css'
import { AppProps } from 'next/app'

const MyApp = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />
}

export default MyApp

// 对比纯js版.
// function MyApp2 ({ Component, pageProps }) {
//   return <Component {...pageProps} />
// }
