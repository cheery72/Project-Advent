import { Grid, Button, Image } from "semantic-ui-react";
import React, { useEffect, useState } from 'react'
import { useRouter } from "next/router";

import styles from "../../../styles/detail/detail.module.css"
import allAxios from "../../../src/lib/allAxios";
import userAxios from "../../../src/lib/userAxios";
import Head from "next/head";
import Snow from "../../../src/component/animation/snow";

export default function Presentdetail(){
    const {Row, Column} = Grid
    const router = useRouter();
    const boxId = router.query.boxid
    
    const [userId, setUserId] = useState<number>(0)
    const [boxInfo, setBoxInfo] = useState<any>()
    
    const getBoxInfo = async () => {
        await allAxios
            .get(`/boxes/${boxId}/${userId}`)
            .then(({ data }) => {
                if (data) {
                    console.log(data)
                    setBoxInfo(data)
                }
            })
            .catch((e) => {
                console.log(e)
            })
    }

    const getUserInfo = async () => {
        await userAxios.get(`/auth/users`)
            .then((data) => {
                setUserId(data.data.body.user.id) // 유저의 userId를 받아옴)
            })
            .catch((e) => {
                console.log(e)
            });
    };

    useEffect(() => {
        getUserInfo()
    }, [])

    useEffect(() => {
        if(userId) {
            getBoxInfo()
        }
    }, [userId])

    return(
        <>
            <Head>
                <title>보낸 선물 상세 | Make Our Special</title>
            </Head>
            {
                boxInfo ?
                <div data-aos="zoom-out">
                    {   
                        (boxInfo.animation !== 'noeffect' && boxInfo.animation !== null) ?
                        <Snow effectImage={ boxInfo.animation==='snow' ? '' : boxInfo.animation } />
                        :
                        <></>
                    }
                    <div className={ styles.presentdetailhead }>
                        <span>✨&nbsp;D-{ boxInfo.dday? `${boxInfo.dday}` : 'day' }&nbsp;✨</span>
                    </div>

                    <Grid stackable>
                        <Row>
                            <Column width={4}></Column>
                            <Column width={8}>
                                <div className={styles.boxlocation}>
                                    <Image src={boxInfo.content} alt="present_image" className={styles.box} />
                                </div>
                            </Column>
                            <Column width={2}>
                                <div className={styles.buttonbetween}>
                                    <Button inverted color='blue' onClick={() => {router.back();}}>뒤로 가기</Button>
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