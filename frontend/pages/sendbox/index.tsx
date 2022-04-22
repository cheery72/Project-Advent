import Head from "next/head";
import { useEffect, useState } from "react";
import styles from '../../styles/sendbox/sendbox.module.css'
import AOS from 'aos';
import 'aos/dist/aos.css'; 
import SendboxList from "../../src/component/sendbox/sendboxList";


export default function Sendbox(){
    useEffect(() => {
        AOS.init({
            duration: 1000
        });
    }, [])

    const [username, setUsername] = useState<string>('TEST')

    return(
        <>
            <Head>
                <title>보낸선물함 | Make Our Special</title>
            </Head>
            <div className={styles.background}>
                <div data-aos="fade-down">
                    <div className={styles.titleWrapper}>
                        <h1 className={styles.title}><span>❝ {username} ❞님</span>의 <span>보낸 선물함</span></h1>
                    </div>
                    <SendboxList />
                </div>
            </div>
        </>
    );
}