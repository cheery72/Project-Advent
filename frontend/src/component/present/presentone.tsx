import { Grid } from "semantic-ui-react";
import styles from "../../../styles/present/present.module.css"
import Title from "./title";
import Box from "./box";
import { useState } from "react";
import SmallSnow from "../animation/smallsnow";

export default function PresentOne({presentInfo}:any){

    const { Row, Column } = Grid

    const [effectImage, serEffectImage] = useState("/minieffect/firework2.png")

    const date = new Date()
    const year = date.getFullYear()
    const month = date.getMonth()+1
    const day = date.getDate()
    const nowDate = `${year}-${month>9?"":"0"}${month}-${day}`

    return(
        <div data-aos="zoom-in">
            <Title title={presentInfo.title} />
            <div className={styles.dateStyle}>
                <span>🗓️ D-DAY | { presentInfo.advent_box_list[0].is_active_at }</span>
            </div>
            <Grid stackable centered>

                <Row>
                    <Column width={5}/>
                    <Column 
                        textAlign="center" 
                        style={{ minWidth: "300px", minHeight: "300px", maxWidth: "300px", maxHeight: "300px", backgroundImage: `url(${ presentInfo.advent_box_list[0] ? presentInfo.advent_box_list[0].wrapper : '' })` }} 
                        className={ styles.box }
                    >
                        {presentInfo.advent_box_list[0].is_active_at === nowDate?
                            <SmallSnow effectImage={effectImage} />
                        :""}
                        <Box boxInfo={ presentInfo.advent_box_list[0] ? presentInfo.advent_box_list[0] : { active:false, active_day:'???' } } />
                    </Column>
                    <Column width={5}/>
                </Row>
            </Grid>
        </div>
    );
}