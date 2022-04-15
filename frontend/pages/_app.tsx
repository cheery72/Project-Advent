import '../styles/globals.css'
import type { AppProps } from 'next/app'
import 'semantic-ui-css/semantic.min.css'
import Navbar from '../src/component/navbar';

function MyApp({ Component, pageProps }: AppProps) {
  return(
    <>
      <Navbar />
      <Component {...pageProps} />
    </>
  ); 
}

export default MyApp
