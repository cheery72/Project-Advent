import { Grid, Button } from "semantic-ui-react";
import React, { useEffect, useState } from 'react'
import { useRouter } from "next/router";

import styles from "../../../../styles/detail/detail.module.css"
import allAxios from "../../../../src/lib/allAxios";

export default function Edit(){

    const router = useRouter();
    const adventId = router.query.id
    const boxId = router.query.detailid

    const {Row, Column} = Grid

    const [boxInfo, setBoxInfo]: any = useState([])
    

    const writeDetail = () => {
        router.push({ pathname: `/write/${adventId}/${boxInfo.advent_day}`})
    }

    const getBoxInfo = async () => {
        await allAxios
            .get(`/boxes/${boxId}`)
            .then(({ data }) => {
                setBoxInfo(data)
            })
            .catch((e) => {
                console.log(e)
            })
    }

    useEffect(() => {
        if (boxId){
            getBoxInfo()
        }
    }, [boxId])

return(
    <>
        <div className={styles.presentdetailhead}>
            D-{boxInfo.dday}
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
            <Column width={4}>
                <div className={styles.buttonbetween}>
                    <Button inverted color='blue' onClick={()=>{ writeDetail()}}>새로 만들기</Button>
                </div>
                <div className={styles.cancelbutton}>    
                    <Button inverted color='blue' onClick={() => {router.push({ pathname: `/write/${adventId}` });}}>&nbsp;&nbsp;&nbsp;&nbsp;취&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;소&nbsp;&nbsp;&nbsp;&nbsp;</Button>  
                </div>             
            </Column>
        </Row>
        </Grid>
    </>
);
}