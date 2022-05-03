import { Grid, Button, Advertisement } from "semantic-ui-react";
import React from 'react'
import { useRouter } from "next/router";

import styles from "../../../styles/detail/detail.module.css"

export default function Presentdetail(){
    const router = useRouter();
    const {Row, Column} = Grid

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
                    <Button inverted color='blue' onClick={() => {router.push(`/present/presentid`);}}>뒤로 가기</Button>
                </div>        
            </Column>
        </Row>
        </Grid>
    </>
);
}