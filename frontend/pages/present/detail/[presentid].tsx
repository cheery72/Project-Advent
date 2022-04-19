import { Grid, Button, Advertisement } from "semantic-ui-react";
import React from 'react'
import { useRouter } from "next/router";

import styles from "../../../styles/detail/detail.module.css"

export default function Presentdetail(){
    const router = useRouter();

return(
    <>
        <div className={styles.presentdetailhead}>
            D-7
        </div>
        <Grid stackable>
        <Grid.Row>
            <Grid.Column width={4}></Grid.Column>
            <Grid.Column width={8}>
            <Advertisement unit='large rectangle' centered test='Large Rectangle' />
            </Grid.Column>
            <Grid.Column width={4}>
                <div className={styles.buttonbetween}>
                    <Button inverted color='blue' onClick={() => {router.push(`/present/presentid`);}}>뒤로 가기</Button>
                </div>        
            </Grid.Column>
        </Grid.Row>
        </Grid>
    </>
);
}