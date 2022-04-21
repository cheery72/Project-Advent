import { Grid, Button, Advertisement } from "semantic-ui-react";
import React, {useState} from 'react'
import Decorativeframe from "../../../src/component/detail/decorativeframe"
import { useRouter } from "next/router";

import styles from "../../../styles/detail/detail.module.css"

export default function Detail(){
    const router = useRouter();
    const day = router.query.day
    const {Row, Column} = Grid

return(
    <>
        <div className={styles.total}>
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
                    <Button inverted color='blue' onClick={() => {router.push({ pathname: `/write/testid`, query: { day: `${day}`} });}}>&nbsp;&nbsp;&nbsp;&nbsp;저&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;장&nbsp;&nbsp;&nbsp;&nbsp;</Button>
                 </div>
                <div className={styles.cancelbutton}>    
                    <Button inverted color='blue' onClick={() => {router.push({ pathname: `/write/testid`, query: { day: `${day}`} });}}>&nbsp;&nbsp;&nbsp;&nbsp;취&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;소&nbsp;&nbsp;&nbsp;&nbsp;</Button>  
                </div>             
            </Column>
        </Row>
        </Grid>
        <div className={styles.listbetween}>
            <Decorativeframe></Decorativeframe>
        </div>
        </div>
    </>
);
}