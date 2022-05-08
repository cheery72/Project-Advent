import { Grid, Button, Image } from "semantic-ui-react";
import React, { useEffect, useState } from 'react'
import { useRouter } from "next/router";

import styles from "../../../styles/detail/detail.module.css"
import allAxios from "../../../src/lib/allAxios";
import Head from "next/head";

export default function Presentdetail(){
    const router = useRouter();
    const {Row, Column} = Grid
    const boxId = router.query.boxid
    const [content, setContent] = useState('/main/temp_main.png') // 기본이미지(임시)
    const [day, setDay] = useState('?')

    const getBoxInfo = async () => {
        await allAxios
            .get(`/boxes/${boxId}`)
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

    useEffect(() => {
        getBoxInfo()
    }, [])

    return(
        <>
            <Head>
                <title>선물 상세 페이지 | Make Our Special</title>
            </Head>
            <div data-aos="zoom-in">
                <div className={styles.presentdetailhead}>
                    <span>✨&nbsp;D-{day? day : 'day'}&nbsp;✨</span>
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