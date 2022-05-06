import { Grid, Button, Image } from "semantic-ui-react";
import React, { useEffect, useState } from 'react'
import { useRouter } from "next/router";

import styles from "../../../styles/detail/detail.module.css"
import allAxios from "../../../src/lib/allAxios";

export default function Presentdetail(){
    const router = useRouter();
    const {Row, Column} = Grid
    const boxId = router.query.boxid
    const [content, setContent] = useState('/main/temp_main.png') // 기본이미지(임시)
    const [day, setDay] = useState('?')

    const loadIsPassword = async () => {
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
        loadIsPassword()
    }, [])

return(
    <>
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
            <Column width={4}>
                <div className={styles.buttonbetween}>
                    <Button inverted color='blue' onClick={() => {router.back();}}>뒤로 가기</Button>
                </div>        
            </Column>
        </Row>
        </Grid>
    </>
);
}