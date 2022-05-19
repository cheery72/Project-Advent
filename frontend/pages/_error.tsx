import Head from "next/head";
import { useRouter } from "next/router";
import { Button, Header, Icon, Image } from "semantic-ui-react";
import styles from '../styles/error/error.module.css'

export default function Custom500() {
  const router = useRouter()
  return (
    <>
        <Head>
            <title>500: Internal Server Error | Make Our Special</title>
        </Head>
        <Header 
            as='h1'
            textAlign="center" 
            style={{marginBottom:'30px'}}
        >
          <span className={ styles.title }>500 &nbsp;|&nbsp; Internal Server Error</span>
        </Header>
        <Image 
            src="/error/open-box-empty.png" 
            alt="500_page_image" 
            size="medium"
            centered
        />
        <Button
          color="teal" 
          style={{ margin:'30px auto', display:'block' }}
          onClick={() => router.push('/')}>
          메인으로 가기
          <Icon name="arrow alternate circle right outline" />
        </Button>
    </>
  )
}