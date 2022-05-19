import Head from "next/head";
import { NextRouter, useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Button, Grid, Header, Icon, Popup } from "semantic-ui-react";
import notify from "../../src/component/notify/notify";
import allAxios from "../../src/lib/allAxios";
import IsLogin from "../../src/lib/IsLogin";
import LogOut from "../../src/lib/LogOut";

import userAxios from "../../src/lib/userAxios";
import styles from "../../styles/write/period.module.css"

export default function Write(){

    const router = useRouter()
    const { Row, Column } = Grid
    const [userInfo, setUserInfo]: any = useState([])

    const goWrite = (day: Number) => {
        if (userInfo) {
            makeAdventCalender(day)
        }
    }

    const getUserInfo = async (router: NextRouter | string[]) => {
        await userAxios
            .get(`/auth/users`)
            .then(({ data }) => {
                setUserInfo(data.body.user)
            })
            .catch((e) => {
                LogOut(router)
                // console.log(e)
            });
        };

    const makeAdventCalender = async (day: Number) => {
        const body = {
            day: day,
            user_id: userInfo.id,
        }
        await allAxios
            .post(`/advents`, body)
            .then(({ data }) => {
                notify('success', `🎁어드벤트 캘린더(${day}일)이 생성되었습니다.`, 5000)
                notify('success', `작성한 어드벤트 캘린더는 보낸 선물함에서 확인할 수 있습니다❕`, 10000)
                router.push({ pathname: `/write/${ data.advent_id }`})
                
            })
            .catch((e) => {
                // console.log(e)
                if (e.response.data.message === "오늘 게시글 작성 수가 초과되었습니다."){
                    notify("error", "게시글 작성 수가 초과되었습니다. (일 30개 제한)")
                }
            })
    }

    useEffect(() => {
        if (IsLogin() && router){
            getUserInfo(router)
        }   
        if (!IsLogin()){
            router.push('/')
            notify('error', `로그인해야 작성할 수 있습니다❕`)
        }
    }, [router])
    
    return(
        <>
            <Head>
                <title>선물 기간 선택 | Make Our Special</title>
            </Head>
            <Grid stackable>
                <Row />
                <Row>
                    <Column width={5} />
                    <Column textAlign="center" data-aos="zoom-in-right" width={6}>
                        <Header 
                            as='h1' 
                            className={ styles.inline }
                        ><span className={ styles.title1 }>선물할 기간</span>을 <span className={ styles.title2 }>선택하세요!</span>
                        </Header>&nbsp;
                        <Popup content="원하는 기간에 따라 선물 일수를 선택할 수 있습니다." trigger={<Icon name='question circle' color='teal' className={ styles.pointer }/>}/>
                    </Column>
                    <Column width={5} />
                </Row>

                <Row />

                <Row textAlign="center">
                    <Column width={3}/>
                    <Column width={10}>
                        <Button 
                            animated="fade"
                            style={{ backgroundColor: "#82F0F0" }} 
                            className={ styles.button } 
                            onClick={() => {goWrite(1)}}
                            data-aos="zoom-in"
                        >
                            <Button.Content hidden>
                                작성하러 가기!<Icon name="arrow circle right" color="teal"/>
                            </Button.Content>
                            <Button.Content visible>
                                <Icon name="gift" color="teal"/>1일
                            </Button.Content>
                        </Button>
                    </Column>
                    <Column width={3}/>
                </Row>

                <Row />
                <Row />

                <Row textAlign="center">
                    <Column width={4}/>
                    <Column width={3}>
                        <Button 
                            animated="fade"
                            style={{ backgroundColor: "#82F0F0" }} 
                            className={ styles.button } 
                            onClick={() => {goWrite(3)}}
                            data-aos="zoom-in"
                        >
                            <Button.Content hidden>
                                작성하러 가기!<Icon name="arrow circle right" color="teal"/>
                            </Button.Content>
                            <Button.Content visible>
                                <Icon name="gift" color="teal"/>3일
                            </Button.Content>
                        </Button>
                    </Column>
                    <Column width={2}/>
                    <Column width={3}>
                        <Button 
                            animated="fade"
                            style={{ backgroundColor: "#82F0F0" }} 
                            className={ styles.button } 
                            onClick={() => {goWrite(7)}}
                            data-aos="zoom-in"
                        >
                            <Button.Content hidden>
                                작성하러 가기!<Icon name="arrow circle right" color="teal"/>
                            </Button.Content>
                            <Button.Content visible>
                                <Icon name="gift" color="teal"/>7일
                            </Button.Content>
                        </Button>
                    </Column>
                    <Column width={4}/>
                </Row>
            </Grid>
        </>
    );
}