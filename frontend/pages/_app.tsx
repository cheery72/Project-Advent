import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect } from 'react';
import 'semantic-ui-css/semantic.min.css'
import Navbar from '../src/component/navbar';
import ShapeDivider from '../src/component/footer/shapeDivider';
import ScrollToTop from '../src/component/footer/scrollToTop';
import Footer from '../src/component/footer/footer';
import Aos from 'aos';
import 'aos/dist/aos.css'; 

function MyApp({ Component, pageProps }: AppProps) {
    useEffect(() => {
        Aos.init({
            duration: 1000
        });
    })
    return(
        <>
            <div className="background">
                <Navbar />
                <Component {...pageProps} />
                <ShapeDivider />
            </div>
            <ScrollToTop />
            <Footer />
        </>
    ); 
}

export default MyApp
