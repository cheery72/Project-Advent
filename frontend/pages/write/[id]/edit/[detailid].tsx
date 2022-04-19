import { Grid, Button, Advertisement } from "semantic-ui-react";
import React from 'react'
import Decorativeframe from "../../../../src/component/detail/decorativeframe"
import { useRouter } from "next/router";

import styles from "../../../../styles/detail/detail.module.css"

export default function Edit(){
    const router = useRouter();

return(
    <>
        <Grid stackable>
        <Grid.Row>
            <Grid.Column width={4}></Grid.Column>
            <Grid.Column width={8}>
            <Advertisement unit='large rectangle' centered test='Large Rectangle' />
            </Grid.Column>
            <Grid.Column width={4}>
 
                <div className={styles.buttonbetween}>
                    <Button inverted color='blue' onClick={() => {router.push(`/write/testid`);}}>새로 만들기</Button>
                </div>
                <div className={styles.cancelbutton}>    
                    <Button inverted color='blue' onClick={() => {router.push(`/write/testid`);}}>&nbsp;&nbsp;&nbsp;&nbsp;취&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;소&nbsp;&nbsp;&nbsp;&nbsp;</Button>  
                </div>             
            </Grid.Column>
        </Grid.Row>
        </Grid>
        <div className={styles.listbetween}>
            <Decorativeframe></Decorativeframe>
        </div>

    </>
);
}