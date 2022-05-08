import type { NextPage } from 'next'
import styles from '../styles/index/index.module.css'
import { Button, Grid, Icon, Image } from 'semantic-ui-react'
import Link from 'next/link'
import IsLogin from '../src/lib/IsLogin'
import Head from 'next/head'
import { useRouter } from 'next/router'

const { Row, Column } = Grid

const Home: NextPage = () => {

    const KAKAO_LOGIN_URL = 'http://k6c206.p.ssafy.io:8000/auth-server'
    const BASE_URL = 'http://localhost:3000'

    const router = useRouter()

    const goWritePage = () => {
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
                <h2 className={ `${styles.titleStyle}` } style={{ fontFamily: 'helvetica'}}>
                    <span className={ `${styles.titleWord} ${styles.titleWord1}` }>Make&nbsp;</span>
                    <span className={ `${styles.titleWord} ${styles.titleWord2}` }>Our&nbsp;</span>
                    <span className={ `${styles.titleWord} ${styles.titleWord3}` }>Spe</span>
                    <span className={ `${styles.titleWord} ${styles.titleWord4}` }>cial</span>
                </h2>
                <h2 className={ styles.titleStyle }>어드벤트 스페셜 데이</h2>
            </div>  
            <Grid 
                container 
                centered
            >
                <Row>
                    <Column 
                        mobile={14} tablet={8} computer={7}
                        data-aos='zoom-in-right' 
                        data-aos-duration='3000'
                    >
                        <Image
                            src='/main/temp_main_2.png'
                            // https://pixabay.com/ko/vectors/%ec%83%9d%ec%9d%bc-%ec%84%a0%eb%ac%bc-%ec%83%81%ec%9e%90-%eb%86%80%eb%9d%bc%eb%8b%a4-1670415/ 무료이미지 사용
                            alt='어드벤트 스페셜 데이 main image'
                        />
                    </Column>
                    <Column 
                        mobile={14} tablet={8} computer={7}
                        textAlign='center'
                        className={ styles.mainCard } 
                        data-aos='flip-left'
                        data-aos-duration="3000"
                    >
                        <h2 className={ styles.mainText }>소중한 사람에게 <br />특별한 선물을 해보세요 <br />
                        {/* 로그인 유무 판별 */}
                        {
                            IsLogin() ?
                            <Button 
                                color='twitter' 
                                animated 
                                onClick={goWritePage}
                                style={{ height:'18%', width:'60%', padding:'5%', marginTop:'5%', fontSize:'1.5vw' }}
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
                                href={`${KAKAO_LOGIN_URL}/oauth2/authorization/kakao?redirect_uri=${BASE_URL}/oauth/redirect/write`}
                                passHref
                            >
                                <Image
                                    src='/kakao_button/kakao_login_large_narrow.png' 
                                    className={ styles.kakaoButton }   
                                    alt='카카오로그인'
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
