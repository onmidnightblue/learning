import '../styles/globals.css'
import Layout from '../components/layout/Layout';

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp

/**
 * 여기서 Layout으로 크게 감싸면 다른 곳에서 따로 import할 필요가 없다.
 */
