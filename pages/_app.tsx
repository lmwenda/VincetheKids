import '../styles/globals.css'
import { motion } from 'framer-motion';
import type { AppProps } from 'next/app'
import { Header } from '../components/Header'
import Head from 'next/head';

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <motion.div key={router.route} initial="pageInitial" animate="pageAnimate" variants={{
      pageInitial: {
        opacity: 0
      },
      pageAnimate: {
        opacity: 1
      },
    }}>
      <Head>
        <link rel="icon" href="/image_5.jpg" />
      </Head>
      <Header />
      <Component {...pageProps} />
    </motion.div>
  );
}

export default MyApp
