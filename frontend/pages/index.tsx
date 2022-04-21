import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/index/index.module.css'
import { Button, Grid, Header, Icon } from 'semantic-ui-react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const { Row, Column } = Grid

const Home: NextPage = () => {
  
  const router = useRouter()

  const KAKAO_LOGIN_URL = 'http://kwky.shop:8081'
  const BASE_URL = 'http://localhost:3000'

  const [isLogined, setIsLogin] = useState<boolean>(false)

  useEffect(() => {
      if (localStorage.token) { 
          setIsLogin(true)     
      } else {
          setIsLogin(false)
      }    
  }, []);

  const goWrite = () => {
    router.push('/write')
  }

  return (
    <div style={{background:'linear-gradient(90deg, rgba(180,72,235,0.2091211484593838) 0%, rgba(253,29,69,0.15870098039215685) 50%, rgba(252,176,69,0.18671218487394958) 100%)'}}>
      <div className={ styles.titleWrapper }>
        <h1 className={ styles.titleStyle }>Make Our Special</h1>
        <h1 className={ styles.titleStyle }>어드벤트 스페셜 데이</h1>
      </div>  
      <Grid centerd>
        <Row textAlign='center'>
          <Column width={3} />
          <Column width={5}>
            <img src='/main/temp_main.png' />
          </Column>
          <Column width={5} className={ styles.mainBox }>
            
            <h2 className={ styles.mainText }>소중한 사람에게 <br /> 특별한 선물을 해보세요.</h2>
            {/* 로그인 유무 판별 */}
            {
              isLogined ?
              <Button 
                color='twitter' 
                animated 
                onClick={() => goWrite()}
                // className={ styles.writeButton }
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
              <Link href={`${KAKAO_LOGIN_URL}/oauth2/authorization/kakao?redirect_uri=${BASE_URL}/oauth/redirect`}>
                  <img 
                      src="/kakao_button/kakao_login_large_narrow.png" 
                      className={ styles.kakaoButton }       
                      alt="카카오로그인"
                  />
              </Link>
            }
          </Column>
          <Column width={3}/>
        </Row>
      </Grid>
    </div>
  )
}

export default Home
