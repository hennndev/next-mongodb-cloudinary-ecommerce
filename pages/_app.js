import '../styles/global.css'
import Router from 'next/router'
import Layout from '@/components/UI/Layout'
import { Provider } from '../context/context'
import { SessionProvider } from "next-auth/react"
import ProgressBar from '@badrap/bar-of-progress'

const progress = new ProgressBar({
    size: 4,
    color: '#548CFF',
    className: 'z-50',
    delay: 100
  })
  
Router.events.on('routeChangeStart', progress.start)
Router.events.on('routeChangeComplete', progress.finish)
Router.events.on('routeChangeError', progress.finish)


function MyApp({ Component, pageProps }) {
  return (
      <SessionProvider session={pageProps.session}>
            <Provider>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </Provider>
      </SessionProvider>
  )
}

export default MyApp
