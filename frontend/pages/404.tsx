import Head from "next/head";
import { Header, Image } from "semantic-ui-react";
import styles from '../styles/404/404.module.css'

export default function Custom404() {
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
            src="/404/box-empty.png" 
            alt="404_page_image" 
            size="medium"
            centered
        />
    </>
  )
}