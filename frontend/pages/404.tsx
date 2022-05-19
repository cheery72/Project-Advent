import Head from "next/head";
import { useRouter } from "next/router";
import { Button, Header, Icon, Image } from "semantic-ui-react";
import styles from '../styles/error/error.module.css'

export default function Custom404() {
  const router = useRouter()
  return (
    <>
        <Head>
            <title>404: Page Not Found | Make Our Special</title>
        </Head>
        <Header 
            as='h1'
            textAlign="center" 
            style={{marginBottom:'30px'}}
        >
          <span className={ styles.title }>404 &nbsp;|&nbsp; Page Not Found</span>
        </Header>
        <Image 
            src="/error/box-empty.png" 
            alt="404_page_image" 
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