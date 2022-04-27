import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Button, Grid, Header, Icon, Popup } from "semantic-ui-react";
import notify from "../../src/component/notify/notify";
import allAxios from "../../src/lib/allAxios";
import IsLogin from "../../src/lib/IsLogin";
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

    const getUserInfo = async () => {
        userAxios
            .get(`/auth/users`)
            .then(({ data }) => {
                setUserInfo(data.body.user)
            })
            .catch((e) => {
                console.log(e)
            });
        };

    const makeAdventCalender = (day: Number) => {
        const body = {
            day: day,
            user_id: userInfo.id,
        }
        allAxios
            .post(`/advents`, body)
            .then(({ data }) => {
                notify('success', `👋어드벤트 켈린더(${day}일)이 생성되었습니다. 작성한 어드벤트 켈린더는 보낸 선물함에서 확인할 수 있습니다`)
                router.push({ pathname: `/write/${ data.advent_id }`, query: { day: `${day}` }})
                
            })
            .catch((e) => {
                console.log(e)
            })
    }

    useEffect(() => {
        if(!IsLogin()){
            notify('error', `로그인을 해야 작성할 수 있습니다.`)
            router.push('/')
        }
        if (IsLogin()){
            getUserInfo()
        }
    }, [])
    
    return(
        <>
            <Grid stackable>
                <Row />
                <Row>
                    <Column width={5} />
                    <Column textAlign="center" width={6}>
                        <Header as='h1' className={ styles.inline }>선물할 기간을 선택하세요</Header>&nbsp;
                        <Popup content="원하는 기간에 따라 선물 개수를 선택할 수 있습니다." trigger={<Icon name='question circle' className={ styles.pointer }/>}/>
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
                                작성하러가기
                            </Button.Content>
                            <Button.Content visible>
                                1일
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
                                작성하러가기
                            </Button.Content>
                            <Button.Content visible>
                                3일
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
                                작성하러가기
                            </Button.Content>
                            <Button.Content visible>
                                7일
                            </Button.Content>
                        </Button>
                    </Column>
                    <Column width={4}/>
                </Row>
            </Grid>
        </>
    );
}