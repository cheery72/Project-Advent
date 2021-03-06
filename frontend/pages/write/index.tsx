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
                notify('success', `πμ΄λλ²€νΈ μΊλ¦°λ(${day}μΌ)μ΄ μμ±λμμ΅λλ€.`, 5000)
                notify('success', `μμ±ν μ΄λλ²€νΈ μΊλ¦°λλ λ³΄λΈ μ λ¬Όν¨μμ νμΈν  μ μμ΅λλ€β`, 10000)
                router.push({ pathname: `/write/${ data.advent_id }`})
                
            })
            .catch((e) => {
                // console.log(e)
                if (e.response.data.message === "μ€λ κ²μκΈ μμ± μκ° μ΄κ³Όλμμ΅λλ€."){
                    notify("error", "κ²μκΈ μμ± μκ° μ΄κ³Όλμμ΅λλ€. (μΌ 30κ° μ ν)")
                }
            })
    }

    useEffect(() => {
        if (IsLogin() && router){
            getUserInfo(router)
        }   
        if (!IsLogin()){
            router.push('/')
            notify('error', `λ‘κ·ΈμΈν΄μΌ μμ±ν  μ μμ΅λλ€β`)
        }
    }, [router])
    
    return(
        <>
            <Head>
                <title>μ λ¬Ό κΈ°κ° μ ν | Make Our Special</title>
            </Head>
            <Grid stackable>
                <Row />
                <Row>
                    <Column width={5} />
                    <Column textAlign="center" data-aos="zoom-in-right" width={6}>
                        <Header 
                            as='h1' 
                            className={ styles.inline }
                        ><span className={ styles.title1 }>μ λ¬Όν  κΈ°κ°</span>μ <span className={ styles.title2 }>μ ννμΈμ!</span>
                        </Header>&nbsp;
                        <Popup content="μνλ κΈ°κ°μ λ°λΌ μ λ¬Ό μΌμλ₯Ό μ νν  μ μμ΅λλ€." trigger={<Icon name='question circle' color='teal' className={ styles.pointer }/>}/>
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
                                μμ±νλ¬ κ°κΈ°!<Icon name="arrow circle right" color="teal"/>
                            </Button.Content>
                            <Button.Content visible>
                                <Icon name="gift" color="teal"/>1μΌ
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
                                μμ±νλ¬ κ°κΈ°!<Icon name="arrow circle right" color="teal"/>
                            </Button.Content>
                            <Button.Content visible>
                                <Icon name="gift" color="teal"/>3μΌ
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
                                μμ±νλ¬ κ°κΈ°!<Icon name="arrow circle right" color="teal"/>
                            </Button.Content>
                            <Button.Content visible>
                                <Icon name="gift" color="teal"/>7μΌ
                            </Button.Content>
                        </Button>
                    </Column>
                    <Column width={4}/>
                </Row>
            </Grid>
        </>
    );
}