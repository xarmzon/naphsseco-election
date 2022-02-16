import 'nprogress/nprogress.css'
import '../styles/globals.css'
import 'aos/dist/aos.css'
import aos from 'aos'
import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import { DefaultSeo } from 'next-seo'
import { defaultSEO } from '../libs/constants'
import { Toaster } from 'react-hot-toast'
import NProgress from 'nprogress'
import { useRouter } from 'next/router'

NProgress.configure({ showSpinner: false })

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()
  useEffect(() => {
    aos.init()
  }, [])
  useEffect(() => {
    const startProgress = () => NProgress.start()
    const stopProgress = () => NProgress.done()

    router.events.on('routeChangeStart', startProgress)
    router.events.on('routeChangeComplete', stopProgress)
    router.events.on('routeChangeError', stopProgress)

    return () => {
      router.events.off('routeChangeStart', startProgress)
      router.events.off('routeChangeComplete', stopProgress)
      router.events.off('routeChangeError', stopProgress)
    }
  }, [router])
  return (
    <>
      <DefaultSeo {...defaultSEO} />
      <Component {...pageProps} />
      <Toaster
        toastOptions={{
          duration: 7000,
        }}
      />
    </>
  )
}

export default MyApp
