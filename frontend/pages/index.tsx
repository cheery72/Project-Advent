import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { Button, Grid, Header } from 'semantic-ui-react'
import { useRouter } from 'next/router'

const Home: NextPage = () => {
  
  const router = useRouter()

  function goWrite(){
    router.push('/write')
  }

  return (
    <>
      <Grid>
        <Grid.Row />
        <Grid.Row>
          <Grid.Column width={5}/>
          <Grid.Column width={6}>
            <Header as='h1' textAlign='center'>Make Our Special</Header>
            <Header as='h1' textAlign='center'>어드벤트 스페셜 데이</Header>
          </Grid.Column>
          <Grid.Column width={5} />
        </Grid.Row>

        <Grid.Row textAlign='center'>
          <Grid.Column width={3}/>
          <Grid.Column width={5}>
            <p>이미지</p>
          </Grid.Column>
          <Grid.Column width={5}>
            <p>로그인 창</p>
            <p>로그인 했다고 가정</p>
            <Button onClick={goWrite}>작성하기</Button>
          </Grid.Column>
          <Grid.Column width={3}/>
        </Grid.Row>
      </Grid>
    </>
  )
}

export default Home
