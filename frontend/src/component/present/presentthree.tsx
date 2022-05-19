import { Grid } from "semantic-ui-react";
import Box from "./box";
import styles from "../../../styles/present/present.module.css"
import Title from "./title";
import { useState } from "react";
import SmallSnow from "../animation/smallsnow";

export default function PresentThree({presentInfo}:any){

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
                <span>🗓️ D-DAY | { presentInfo.advent_box_list[2].is_active_at }</span>
            </div>
            <Grid textAlign="center" stackable>

                <Row>
                    <Column 
                        width={2} 
                        style={{ minWidth: "200px", minHeight: "200px", maxWidth: "250px", maxHeight: "250px", backgroundImage: `url(${ presentInfo.advent_box_list[0] ? presentInfo.advent_box_list[0].wrapper : '' })` }} 
                        className={ styles.boxdaythree2 }
                    >
                        {presentInfo.advent_box_list[0].is_active_at === nowDate?
                            <SmallSnow effectImage={effectImage} />
                        :""}
                        <Box day={2} boxInfo={ presentInfo.advent_box_list[0] ? presentInfo.advent_box_list[0] : { active:false, active_day:'???' } } />
                    </Column>
                </Row>

                <Row>
                    <Column width={2}/>
                    <Column 
                        width={2} 
                        style={{ minWidth: "200px", minHeight: "200px", maxWidth: "250px", maxHeight: "250px", backgroundImage: `url(${ presentInfo.advent_box_list[1] ? presentInfo.advent_box_list[1].wrapper : '' })` }} 
                        className={ styles.boxdaythree1 }
                    >
                        {presentInfo.advent_box_list[1].is_active_at === nowDate?
                            <SmallSnow effectImage={effectImage} />
                        :""}
                        <Box day={1} boxInfo={ presentInfo.advent_box_list[1] ? presentInfo.advent_box_list[1] : { active:false, active_day:'???' } } />
                    </Column>
                    <Column width={1}/>
                    <Column 
                        width={2} 
                        style={{ minWidth: "200px", minHeight: "200px", maxWidth: "250px", maxHeight: "250px", backgroundImage: `url(${ presentInfo.advent_box_list[2] ? presentInfo.advent_box_list[2].wrapper : '' })` }} 
                        className={ styles.boxdaythree0 }
                    >
                        {presentInfo.advent_box_list[2].is_active_at === nowDate?
                            <SmallSnow effectImage={effectImage} />
                        :""}
                        <Box day={0} boxInfo={ presentInfo.advent_box_list[2] ? presentInfo.advent_box_list[2] :  { active:false, active_day:'???' } } />
                    </Column>
                    <Column width={2}/>
                </Row>
            </Grid>
        </div>
    );
}