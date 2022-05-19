import { Grid } from "semantic-ui-react";
import Box from "./box";
import styles from "../../../styles/present/present.module.css"
import Title from "./title";
import { useState } from "react";
import SmallSnow from "../animation/smallsnow";

export default function PresentSeven({presentInfo}:any){

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
                <span>🗓️ D-DAY | { presentInfo.advent_box_list[6].is_active_at }</span>
            </div>
            <Grid textAlign="center" stackable>
                <Row>
                    <Column largeScreen={2} tablet={16}/>
                    <Column 
                        width={2} 
                        style={{ minWidth: "200px", minHeight: "200px", maxWidth: "250px", maxHeight: "250px", backgroundImage: `url(${ presentInfo.advent_box_list[0] ? presentInfo.advent_box_list[0].wrapper : '' })` }} 
                        className={ styles.boxdayseven6 }
                    >
                        {presentInfo.advent_box_list[0].is_active_at === nowDate?
                            <SmallSnow effectImage={effectImage} />
                        :""}
                        <Box day={6} boxInfo={ presentInfo.advent_box_list[0] ? presentInfo.advent_box_list[0] :  { active:false, active_day:'?' } } />
                    </Column>
                    <Column width={1}/>
                    <Column 
                        width={2} 
                        style={{ minWidth: "200px", minHeight: "200px", maxWidth: "250px", maxHeight: "250px", backgroundImage: `url(${ presentInfo.advent_box_list[1] ? presentInfo.advent_box_list[1].wrapper : '' })` }} 
                        className={ styles.boxdayseven5 }
                    >
                        {presentInfo.advent_box_list[1].is_active_at === nowDate?
                            <SmallSnow effectImage={effectImage} />
                        :""}
                        <Box day={5} boxInfo={ presentInfo.advent_box_list[1] ? presentInfo.advent_box_list[1] : { active:false, active_day:'?' } } />
                    </Column>
                    <Column width={1}/>
                    <Column width={2} 
                        style={{ minWidth: "200px", minHeight: "200px", maxWidth: "250px", maxHeight: "250px", backgroundImage: `url(${ presentInfo.advent_box_list[2] ? presentInfo.advent_box_list[2].wrapper : '' })` }} 
                        className={ styles.boxdayseven4 }
                    >
                        {presentInfo.advent_box_list[2].is_active_at === nowDate?
                            <SmallSnow effectImage={effectImage} />
                        :""}
                        <Box day={4} boxInfo={ presentInfo.advent_box_list[2] ? presentInfo.advent_box_list[2] : { active:false, active_day:'?' } } />
                    </Column>
                    <Column largeScreen={2} tablet={16}/>
                </Row>

                <Row>
                    <Column width={1}/>
                    <Column 
                        width={2} 
                        style={{ marginBottom:"20px", minWidth: "200px", minHeight: "200px", maxWidth: "250px", maxHeight: "250px", backgroundImage: `url(${ presentInfo.advent_box_list[3] ? presentInfo.advent_box_list[3].wrapper : '' })` }} 
                        className={ styles.boxdayseven3 }
                    >
                        {presentInfo.advent_box_list[3].is_active_at === nowDate?
                            <SmallSnow effectImage={effectImage} />
                        :""}
                        <Box day={3} boxInfo={ presentInfo.advent_box_list[3] ? presentInfo.advent_box_list[3] : { active:false, active_day:'?' } } />
                    </Column>
                    <Column width={1}/>
                    <Column 
                        width={2} 
                        style={{ marginBottom:"20px", minWidth: "200px", minHeight: "200px", maxWidth: "250px", maxHeight: "250px", backgroundImage: `url(${ presentInfo.advent_box_list[4] ? presentInfo.advent_box_list[4].wrapper : '' })` }} 
                        className={ styles.boxdayseven2 }
                    >
                        {presentInfo.advent_box_list[4].is_active_at === nowDate?
                            <SmallSnow effectImage={effectImage} />
                        :""}
                        <Box day={2} boxInfo={ presentInfo.advent_box_list[4] ? presentInfo.advent_box_list[4] : { active:false, active_day:'?' } } />
                    </Column>
                    <Column width={1}/>
                    <Column 
                        width={2} 
                        style={{ marginBottom:"20px", minWidth: "200px", minHeight: "200px", maxWidth: "250px", maxHeight: "250px", backgroundImage: `url(${ presentInfo.advent_box_list[5] ? presentInfo.advent_box_list[5].wrapper : '' })` }} 
                        className={ styles.boxdayseven1 }
                    >
                        {presentInfo.advent_box_list[5].is_active_at === nowDate?
                            <SmallSnow effectImage={effectImage} />
                        :""}
                        <Box day={1} boxInfo={ presentInfo.advent_box_list[5] ? presentInfo.advent_box_list[5] : { active:false, active_day:'?' } } />
                    </Column>
                    <Column width={1}/>
                    <Column 
                        width={2} 
                        style={{ marginBottom:"20px", minWidth: "200px", minHeight: "200px", maxWidth: "250px", maxHeight: "250px", backgroundImage: `url(${ presentInfo.advent_box_list[6] ? presentInfo.advent_box_list[6].wrapper : '' })` }} 
                        className={ styles.boxdayseven0 }
                    >
                        {presentInfo.advent_box_list[6].is_active_at === nowDate?
                            <SmallSnow effectImage={effectImage} />
                        :""}
                        <Box day={0} boxInfo={ presentInfo.advent_box_list[6] ? presentInfo.advent_box_list[6] : { active:false, active_day:'?' } }/>
                    </Column>
                    <Column width={1}/>
                </Row>
            </Grid>
        </div>
    );
}