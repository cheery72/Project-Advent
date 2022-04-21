import type { NextPage } from 'next'
import styles from '../styles/index/index.module.css'
import { Button, Grid, Header, Icon } from 'semantic-ui-react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useEffect } from 'react'
import AOS from 'aos';
import 'aos/dist/aos.css'; 
import IsLogin from '../src/component/lib/IsLogin'


const { Row, Column } = Grid

const Home: NextPage = () => {

  useEffect(() => {
    AOS.init({
      duration: 3000
    });
  })
  const router = useRouter()

  const KAKAO_LOGIN_URL = 'http://kwky.shop:8081'
  const BASE_URL = 'http://localhost:3000'

  const goWrite = () => {
    router.push('/write')
  }

  return (
    <div className={ styles.background }>
      <div className={ styles.titleWrapper } data-aos="fade-up">
        <h1 className={ styles.titleStyle }>Make Our Special</h1>
        <h1 className={ styles.titleStyle }>어드벤트 스페셜 데이</h1>
      </div>  
      <Grid centerd>
        <Row textAlign='center'>
          <Column width={3} />
          <Column width={5} data-aos="zoom-in-right">
            <img src='/main/temp_main.png' />
          </Column>
          <Column width={5} className={ styles.mainBox } data-aos="flip-left">
            
            <h2 className={ styles.mainText }>
              소중한 사람에게 <br /> 특별한 선물을 해보세요.
            </h2>
            {/* 로그인 유무 판별 */}
            {
              IsLogin() ?
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
