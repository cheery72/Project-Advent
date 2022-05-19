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

declare global {
    interface Window {
        Kakao: any;
    }
}

function MyApp({ Component, pageProps }: AppProps) {
    useEffect(() => {
        Aos.init({
            easing: "ease-out-cubic",
            once: true,
            offset: 50,
            duration: 1000
        });
        Aos.refreshHard()
    }, [])
    
    return(
        <>
            <div className="background">
                <Navbar />
                <Component {...pageProps} />
                <ShapeDivider />
            </div>
            <Footer />
            <ScrollToTop />
        </>
    ); 
}

export default MyApp
