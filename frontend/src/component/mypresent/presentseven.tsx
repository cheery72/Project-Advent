import { Grid } from "semantic-ui-react";
import Box from "./box";
import styles from "../../../styles/present/present.module.css"
import Title from "./title";

export default function PresentSeven({presentInfo}:any){
    const { Row, Column } = Grid
    
    return(
        <div data-aos="zoom-out">
            <Title 
                title={presentInfo.title} 
                adventId={presentInfo.advent_id} 
                dday={presentInfo.advent_box_list[6].is_active_at} 
            />
            <Grid textAlign="center" stackable>
                <Row>
                    <Column largeScreen={2} tablet={16}/>
                    <Column 
                        width={2} 
                        style={{ minWidth: "200px", minHeight: "200px", maxWidth: "250px", maxHeight: "250px", backgroundImage: `url(${ presentInfo.advent_box_list[0] ? presentInfo.advent_box_list[0].wrapper : '' })` }} 
                        className={ styles.boxdayseven6 }
                    >
                        <Box day={6} boxInfo={ presentInfo.advent_box_list[0] ? presentInfo.advent_box_list[0] :  { active:false, active_day:'?' } } />
                    </Column>
                    <Column width={1}/>
                    <Column 
                        width={2} 
                        style={{ minWidth: "200px", minHeight: "200px", maxWidth: "250px", maxHeight: "250px", backgroundImage: `url(${ presentInfo.advent_box_list[1] ? presentInfo.advent_box_list[1].wrapper : '' })` }} 
                        className={ styles.boxdayseven5 }
                    >
                        <Box day={5} boxInfo={ presentInfo.advent_box_list[1] ? presentInfo.advent_box_list[1] : { active:false, active_day:'?' } } />
                    </Column>
                    <Column width={1}/>
                    <Column width={2} 
                        style={{ minWidth: "200px", minHeight: "200px", maxWidth: "250px", maxHeight: "250px", backgroundImage: `url(${ presentInfo.advent_box_list[2] ? presentInfo.advent_box_list[2].wrapper : '' })` }} 
                        className={ styles.boxdayseven4 }
                    >
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
                        <Box day={3} boxInfo={ presentInfo.advent_box_list[3] ? presentInfo.advent_box_list[3] : { active:false, active_day:'?' } } />
                    </Column>
                    <Column width={1}/>
                    <Column 
                        width={2} 
                        style={{ marginBottom:"20px", minWidth: "200px", minHeight: "200px", maxWidth: "250px", maxHeight: "250px", backgroundImage: `url(${ presentInfo.advent_box_list[4] ? presentInfo.advent_box_list[4].wrapper : '' })` }} 
                        className={ styles.boxdayseven2 }
                    >
                        <Box day={2} boxInfo={ presentInfo.advent_box_list[4] ? presentInfo.advent_box_list[4] : { active:false, active_day:'?' } } />
                    </Column>
                    <Column width={1}/>
                    <Column 
                        width={2} 
                        style={{ marginBottom:"20px", minWidth: "200px", minHeight: "200px", maxWidth: "250px", maxHeight: "250px", backgroundImage: `url(${ presentInfo.advent_box_list[5] ? presentInfo.advent_box_list[5].wrapper : '' })` }} 
                        className={ styles.boxdayseven1 }
                    >
                        <Box day={1} boxInfo={ presentInfo.advent_box_list[5] ? presentInfo.advent_box_list[5] : { active:false, active_day:'?' } } />
                    </Column>
                    <Column width={1}/>
                    <Column 
                        width={2} 
                        style={{ marginBottom:"20px", minWidth: "200px", minHeight: "200px", maxWidth: "250px", maxHeight: "250px", backgroundImage: `url(${ presentInfo.advent_box_list[6] ? presentInfo.advent_box_list[6].wrapper : '' })` }} 
                        className={ styles.boxdayseven0 }
                    >
                        <Box day={0} boxInfo={ presentInfo.advent_box_list[6] ? presentInfo.advent_box_list[6] : { active:false, active_day:'?' } }/>
                    </Column>
                    <Column width={1}/>
                </Row>
            </Grid>
        </div>
    );
}