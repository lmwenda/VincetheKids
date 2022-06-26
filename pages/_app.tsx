import '../styles/globals.css'
import { motion } from 'framer-motion';
import type { AppProps } from 'next/app'
import { Header } from '../components/Header'

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
      <Header />
      <Component {...pageProps} />
    </motion.div>
  );
}

export default MyApp
