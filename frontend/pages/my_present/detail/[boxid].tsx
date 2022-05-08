import { Grid, Button, Image } from "semantic-ui-react";
import React, { useEffect, useState } from 'react'
import { useRouter } from "next/router";

import styles from "../../../styles/detail/detail.module.css"
import allAxios from "../../../src/lib/allAxios";
import userAxios from "../../../src/lib/userAxios";
import Head from "next/head";

export default function Presentdetail(){
    const {Row, Column} = Grid
    const router = useRouter();
    const boxId = router.query.boxid
    
    const [userId, setUserId] = useState<number>(0)
    const [content, setContent] = useState('') //loading spinner 연결을 고려
    const [day, setDay] = useState('') //loading spinner 연결을 고려
    
    const getBoxInfo = async () => {
        await allAxios
            .get(`/boxes/${boxId}/${userId}`)
            .then(({ data }) => {
                console.log(data)
                setDay(data.advent_day)
                if (data.content) {
                    setContent(data.content)
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
        getBoxInfo()
    }, [userId, boxId])

    return(
        <>
            <Head>
                <title>보낸 선물 상세 | Make Our Special</title>
            </Head>
            <div data-aos="zoom-out">
                <div className={styles.presentdetailhead}>
                    <span>✨&nbsp;{day? `${day}일차 🎁` : '????'}&nbsp;✨</span> {/* BE에 api response 반영 요청해야함 */}
                </div>
                <Grid stackable>
                <Row>
                    <Column width={4}></Column>
                    <Column width={8}>
                        <div className={styles.boxlocation}>
                            <Image src={content} alt="present_image" className={styles.box} />
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
        </>
    );
}