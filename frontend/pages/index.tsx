import type { NextPage } from 'next'
import styles from '../styles/index/index.module.css'
import { Button, Grid, Icon, Image } from 'semantic-ui-react'
import Link from 'next/link'
import IsLogin from '../src/lib/IsLogin'
import Head from 'next/head'
import { useRouter } from 'next/router'
import userAxios from '../src/lib/userAxios'
import { useEffect } from 'react'
import notify from '../src/component/notify/notify'

const { Row, Column } = Grid

const Home: NextPage = () => {

    const KAKAO_LOGIN_URL = 'http://k6c206.p.ssafy.io:8081'
    const BASE_URL = 'https://makeourspecial.day'

    const router = useRouter()

    const goWritePage = () => {
        router.push('/write')
    }

    const getUserInfo = async () => {
        await userAxios
            .get(`/auth/users`)
            .then(() => {
            
            })
            .catch((e) => {
                if (typeof window !== "undefined") {
                    localStorage.removeItem("token")
                    const msg = 'πλ‘κ·ΈμΈ μκ°μ΄ λ§λ£λμμ΅λλ€.'
                    setTimeout(() => location.reload(), 1000) // 1μ΄ ν μλ‘κ³ μΉ¨(μλ‘κ³ μΉ¨:λ‘κ·Έμμ ν λ²νΌ μν toggle + 1μ΄ delay:tostify νμ)
                    notify('success', msg)
                }
                // console.log(e)
            })
        };

    useEffect(() => {
        if (IsLogin()){
            getUserInfo()
        }   
    }, [])

    return (
        <>
            <Head>
                <title> Make Our Special </title>
            </Head>
            <div 
                className={ `${styles.titleWrapper} ${styles.fadeUp}` }
            >
                <h2 className={ `${styles.titleStyle}` } style={{ fontFamily: 'helvetica'}}>
                    <span className={ `${styles.titleWord} ${styles.titleWord1}` }>Make&nbsp;</span>
                    <span className={ `${styles.titleWord} ${styles.titleWord2}` }>Our&nbsp;</span>
                    <span className={ `${styles.titleWord} ${styles.titleWord3}` }>Spe</span>
                    <span className={ `${styles.titleWord} ${styles.titleWord4}` }>cial</span>
                </h2>
                <h2 className={ styles.titleStyle }>μ΄λλ²€νΈ μ€νμ λ°μ΄</h2>
            </div>  
            <Grid 
                container 
                centered
                stackable
            >
                <Row>
                    <Column 
                        mobile={14} tablet={8} computer={7}
                        className={ styles.zoomInRight }
                        style={{ maxWidth: '80%' }}
                    >
                        <Image
                            src='/main/main_img.png'
                            alt='μ΄λλ²€νΈ μ€νμ λ°μ΄ main image'
                        />
                    </Column>
                    <Column 
                        mobile={14} tablet={8} computer={7}
                        textAlign='center'
                        className={ `${styles.mainCard} ${styles.flipLeft}`}
                        style={{maxWidth: '80%'}}
                    >
                        <h2 className={ styles.mainText }>μμ€ν μ¬λμκ² <br />νΉλ³ν μ λ¬Όμ ν΄λ³΄μΈμ <br />
                        {/* λ‘κ·ΈμΈ μ λ¬΄ νλ³ */}
                        {
                            IsLogin() ?
                            <Button 
                                color='twitter' 
                                animated 
                                onClick={goWritePage}
                                style={{ height:'18%', width:'60%', padding:'5%', marginTop:'5%'}}
                            >
                                <Button.Content visible>
                                    <Icon name='gift' color='yellow'/>μ λ¬Όνλ¬ κ°κΈ°!
                                </Button.Content>
                                <Button.Content hidden>
                                    <Icon name='arrow right' />Go!
                                </Button.Content>
                            </Button>
                            : 
                            <Link 
                                href={`${KAKAO_LOGIN_URL}/oauth2/authorization/kakao?redirect_uri=${BASE_URL}/oauth/redirect/write`}
                                passHref
                            >
                                <Image
                                    src='/kakao_button/kakao_login_large_narrow.png' 
                                    className={ styles.kakaoButton }   
                                    alt='μΉ΄μΉ΄μ€λ‘κ·ΈμΈ'
                                />
                            </Link>
                        }
                        </h2> 
                    </Column>
                </Row>
            </Grid>
        </>
    )
}

export default Home
