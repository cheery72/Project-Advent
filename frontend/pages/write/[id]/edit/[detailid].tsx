import { Grid, Button, Advertisement } from "semantic-ui-react";
import React from 'react'
import Decorativeframe from "../../../../src/component/detail/selectbackground"
import { useRouter } from "next/router";

import styles from "../../../../styles/detail/detail.module.css"

export default function Edit(){
    const router = useRouter();
    const {Row, Column} = Grid
    const day = router.query.day
    const id = router.query.id

    const writeDetail = (number: Number) => {
        router.push({ pathname: `/write/${id}/${number}`, query: { day: `${1}`}})
    }

return(
    <>
        <div className={styles.presentdetailhead}>
            D-7
        </div>
        <Grid stackable>
        <Row>
            <Column width={4}></Column>
            <Column width={8}>
            <div className={styles.boxlocation}>
            <div className={styles.box}>
            </div>
            </div>
            </Column>
            <Column width={4}>
 
                <div className={styles.buttonbetween}>
                    <Button inverted color='blue' onClick={()=>{ writeDetail(1)}}>새로 만들기</Button>
                </div>
                <div className={styles.cancelbutton}>    
                    <Button inverted color='blue' onClick={() => {router.push({ pathname: `/write/testid`, query: { day: `${day}`} });}}>&nbsp;&nbsp;&nbsp;&nbsp;취&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;소&nbsp;&nbsp;&nbsp;&nbsp;</Button>  
                </div>             
            </Column>
        </Row>
        </Grid>
    </>
);
}