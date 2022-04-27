import type { NextPage } from 'next'
import styles from '../styles/index/index.module.css'
import { Button, Grid, Icon, Image } from 'semantic-ui-react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import IsLogin from '../src/lib/IsLogin'
import Head from 'next/head'
// import Image from 'next/image'

const { Row, Column } = Grid

const Home: NextPage = () => {
    const router = useRouter()

    const KAKAO_LOGIN_URL = 'http://k6c206.p.ssafy.io:8000/auth-server'
    const BASE_URL = 'http://localhost:3000'

    const goWrite = () => {
        router.push('/write')
    }

    return (
        <>
            <Head>
                <title> Make Our Special </title>
            </Head>
            <div className={ styles.titleWrapper } 
                data-aos='fade-up' 
                data-aos-duration='3000'
            >
                <h2 className={ `${styles.titleStyle}` }>
                <span className={ `${styles.titleWord} ${styles.titleWord1}` }>Make&nbsp;</span>
                    <span className={ `${styles.titleWord} ${styles.titleWord2}` }>Our&nbsp;</span>
                    <span className={ `${styles.titleWord} ${styles.titleWord3}` }>Spe</span>
                    <span className={ `${styles.titleWord} ${styles.titleWord4}` }>cial</span>
                </h2>
                <h1 className={ styles.titleStyle }>어드벤트 스페셜 데이</h1>
            </div>  
            <Grid >
                <Row textAlign='center'>
                    <Column width={3} />
                    <Column width={5} 
                        data-aos='zoom-in-right' 
                        data-aos-duration='3000'
                    >
                        <Image
                            src='/main/temp_main.png' 
                            alt='어드벤트 스페셜 데이'
                        />
                    </Column>
                    <Column width={5} 
                        className={ styles.mainCard } 
                        data-aos='flip-left'
                        data-aos-duration="3000"
                    >
                        <h2 className={ styles.mainText }>소중한 사람에게 <br />특별한 선물을 해보세요</h2> 
                        {/* 로그인 유무 판별 */}
                        {
                            IsLogin() ?
                            <Button 
                                color='twitter' 
                                animated 
                                onClick={() => goWrite()}
                                style={{ height:'18%', width:'63%', padding:'5.5%', fontSize:'1.5vw' }}
                            >
                                <Button.Content visible>
                                    <Icon name='gift' color='yellow'/>선물하러 가기!
                                </Button.Content>
                                <Button.Content hidden>
                                    <Icon name='arrow right' />Go!
                                </Button.Content>
                            </Button>
                            : 
                            <Link 
                                href={`${KAKAO_LOGIN_URL}/oauth2/authorization/kakao?redirect_uri=${BASE_URL}/oauth/redirect`}
                                passHref
                            >
                                <Image
                                    src='/kakao_button/kakao_login_large_narrow.png' 
                                    className={ styles.kakaoButton }   
                                    alt='카카오로그인'
                                />
                            </Link>
                        }
                    </Column>
                    <Column width={3}/>
                </Row>
                <Row />
            </Grid>
        </>
    )
}

export default Home
