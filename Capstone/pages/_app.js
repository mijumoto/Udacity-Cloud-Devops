/* eslint react/prop-types: 0 */
import '../styles/global.css'

export default function App({ Component, pageProps }) {
    return <Component {...pageProps} />
  }