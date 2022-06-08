import 'tailwindcss/tailwind.css'
import PropTypes from 'prop-types'

function MyApp ({ Component, pageProps }) {
  return <Component {...pageProps} />
}
MyApp.propTypes = {
  Component: PropTypes.func.isRequired,
  pageProps: PropTypes.object.isRequired
}

export default MyApp
