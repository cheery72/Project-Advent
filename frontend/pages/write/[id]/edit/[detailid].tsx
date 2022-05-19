import { Grid, Button } from "semantic-ui-react";
import React, { useEffect, useState } from 'react'
import { NextRouter, useRouter } from "next/router";

import styles from "../../../../styles/detail/detail.module.css"
import allAxios from "../../../../src/lib/allAxios";
import userAxios from "../../../../src/lib/userAxios";
import LogOut from "../../../../src/lib/LogOut";
import IsLogin from "../../../../src/lib/IsLogin";
import notify from "../../../../src/component/notify/notify";
import Head from "next/head";
import Snow from "../../../../src/component/animation/snow";

export default function Edit(){

    const {Row, Column} = Grid
    const router = useRouter();
    const adventId = router.query.id
    const boxId = router.query.detailid
    const [userId, setUserId] = useState<number>(0)
    const [boxInfo, setBoxInfo]: any = useState()    

    const writeDetail = () => {
        router.push({ pathname: `/write/${adventId}/${boxInfo.advent_day}`})
    }

    const getBoxInfo = async (boxId: string | string[], userId: number) => {
        await allAxios
            .get(`/boxes/${boxId}/${userId}`)
            .then(({ data }) => {
                setBoxInfo(data)
            })
            .catch((e) => {
                // console.log(e)
            })
    }

    const getUserInfo = async (router: NextRouter | string[]) => {
        await userAxios.get(`/auth/users`)
            .then((data) => {
                setUserId(data.data.body.user.id) // 유저의 userId를 받아옴
            })
            .catch((e) => {
                // console.log(e)
                LogOut(router)
            });
    };

    useEffect(() => {
        if (boxId && userId){
            getBoxInfo(boxId, userId)
        }
    }, [boxId, userId])

    useEffect(() => {
        if (IsLogin() && router){
            getUserInfo(router)
        }   
        if (!IsLogin()){
            router.push('/')
            notify('error', '로그인해야 접근 가능한 메뉴입니다❕')
        }
    }, [router])

return(
    <>
        <Head>
            <title>작성한 선물 | Make Our Special</title>
        </Head>
        {
            boxInfo ?
            <div>
                {   
                    (boxInfo.animation !== 'noeffect' && boxInfo.animation !== null) ?
                    <Snow effectImage={ boxInfo.animation==='snow' ? '' : boxInfo.animation } />
                    :
                    <></>
                }
                <div className={styles.presentdetailhead}>
                    <span>D-{boxInfo.dday ? boxInfo.dday: 'day'}</span>
                </div>
                <Grid stackable>
                    <Row>
                        <Column width={4}></Column>
                        <Column width={8}>
                        <div className={styles.boxlocation}>
                        <div className={styles.box} style={{ backgroundSize: "cover", backgroundImage: `url(${ boxInfo.content })` }}>
                        </div>
                        </div>
                        </Column>
                        <Column width={3}>
                            <div className={styles.buttonbetween}>
                                <Button inverted color='blue' onClick={()=>{ writeDetail()}} style={{width:"140px"}}>새로 만들기</Button>
                            </div>
                            <div className={styles.cancelbutton}>    
                                <Button inverted color='blue' style={{width:"140px"}} onClick={() => {router.push({ pathname: `/write/${adventId}` });}}>&nbsp;&nbsp;&nbsp;&nbsp;취&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;소&nbsp;&nbsp;&nbsp;&nbsp;</Button>  
                            </div>             
                        </Column>
                    </Row>
                </Grid>
            </div>
            :
            <></>
        }
    </>
);
}