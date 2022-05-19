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
                    const msg = '🕛로그인 시간이 만료되었습니다.'
                    setTimeout(() => location.reload(), 1000) // 1초 후 새로고침(새로고침:로그아웃 후 버튼 상태 toggle + 1초 delay:tostify 표시)
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
                <h2 className={ styles.titleStyle }>어드벤트 스페셜 데이</h2>
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
                            alt='어드벤트 스페셜 데이 main image'
                        />
                    </Column>
                    <Column 
                        mobile={14} tablet={8} computer={7}
                        textAlign='center'
                        className={ `${styles.mainCard} ${styles.flipLeft}`}
                        style={{maxWidth: '80%'}}
                    >
                        <h2 className={ styles.mainText }>소중한 사람에게 <br />특별한 선물을 해보세요 <br />
                        {/* 로그인 유무 판별 */}
                        {
                            IsLogin() ?
                            <Button 
                                color='twitter' 
                                animated 
                                onClick={goWritePage}
                                style={{ height:'18%', width:'60%', padding:'5%', marginTop:'5%'}}
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
