import { Grid, Button, Image } from "semantic-ui-react";
import React, { useEffect, useState } from 'react'
import { useRouter } from "next/router";

import styles from "../../../styles/detail/detail.module.css"
import allAxios from "../../../src/lib/allAxios";
import Head from "next/head";
import Snow from "../../../src/component/animation/snow";
import notify from "../../../src/component/notify/notify";

export default function Presentdetail(){
    const router = useRouter();
    const {Row, Column} = Grid
    const boxId = router.query.boxid
    const [boxInfo, setBoxInfo] = useState<any>()
    

    const getBoxInfo = async (boxId: string | string[]) => {
        await allAxios
            .get(`/boxes/${boxId}`)
            .then(({ data }) => {
                if (data) {
                    setBoxInfo(data)
                }
            })
            .catch((e) => {
                // console.log(e)
                notify('error', '선물 정보를 로딩하는데 에러가 발생했습니다.')
                router.push('/404')
            })
    }

    useEffect(() => {
        if (boxId) {
            getBoxInfo(boxId)
        }
    }, [boxId])

    return(
        <>
            <Head>
                <title>선물 상세 페이지 | Make Our Special</title>
            </Head>
            {
                boxInfo ?
                <div data-aos="zoom-in">
                    {   
                        (boxInfo.animation !== 'noeffect' && boxInfo.animation !== null) ?
                        <Snow effectImage={ boxInfo.animation==='snow' ? '' : boxInfo.animation } />
                        :
                        <></>
                    }
                    <div className={ styles.presentdetailhead }>
                        <span>✨&nbsp;D-{ boxInfo.dday? `${boxInfo.dday }` : 'day'}&nbsp;✨</span>
                    </div>

                    <Grid stackable>
                    <Row>
                        <Column width={4}></Column>
                        <Column width={8}>
                            <div className={ styles.boxlocation }>
                                <Image src={ boxInfo.content } alt="present_image" className={ styles.box } />
                            </div>
                        </Column>
                        <Column width={2}>
                            <div className={ styles.buttonbetween }>
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