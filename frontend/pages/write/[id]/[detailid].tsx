import { Grid, Button, Advertisement } from "semantic-ui-react";
import React from 'react'
import Decorativeframe from "../../../src/component/detail/decorativeframe"
import { useRouter } from "next/router";

import styles from "../../../styles/detail/detail.module.css"

export default function Detail(){
    const router = useRouter();

return(
    <>
        <Grid stackable>
        <Grid.Row>
            <Grid.Column width={4}></Grid.Column>
            <Grid.Column width={8}>
            <Advertisement unit='large rectangle' centered test='Large Rectangle' />
            </Grid.Column>
            <Grid.Column width={2}>
                <div className={styles.buttonbetween}>
                    <Button inverted color='blue' onClick={() => {router.push(`/write/testid`);}}>&nbsp;&nbsp;저&nbsp;장&nbsp;&nbsp;</Button>
                    <Button inverted color='blue' onClick={() => {router.push(`/write/testid`);}}>&nbsp;&nbsp;취&nbsp;소&nbsp;&nbsp;</Button>  
                </div>             
            </Grid.Column>
            <Grid.Column width={2}></Grid.Column>
        </Grid.Row>
        </Grid>
        <div className={styles.listbetween}>
            <Decorativeframe></Decorativeframe>
        </div>

    </>
);
}