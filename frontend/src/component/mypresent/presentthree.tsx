import { Grid } from "semantic-ui-react";
import Box from "./box";
import styles from "../../../styles/present/present.module.css"
import Title from "./title";

export default function PresentThree({presentInfo}:any){

    const { Row, Column } = Grid

    return(
        <div data-aos="zoom-out">
            <Title 
                title={presentInfo.title} 
                adventId={presentInfo.advent_id} 
                dday={presentInfo.advent_box_list[2].is_active_at} 
            />
            <Grid textAlign="center" stackable>

                <Row>
                    <Column 
                        width={2} 
                        style={{ minWidth: "200px", minHeight: "200px", maxWidth: "250px", maxHeight: "250px", backgroundImage: `url(${ presentInfo.advent_box_list[0] ? presentInfo.advent_box_list[0].wrapper : '' })` }} 
                        className={ styles.boxdaythree2 }
                    >
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
                        <Box day={1} boxInfo={ presentInfo.advent_box_list[1] ? presentInfo.advent_box_list[1] : { active:false, active_day:'???' } } />
                    </Column>
                    <Column width={1}/>
                    <Column 
                        width={2} 
                        style={{ minWidth: "200px", minHeight: "200px", maxWidth: "250px", maxHeight: "250px", backgroundImage: `url(${ presentInfo.advent_box_list[2] ? presentInfo.advent_box_list[2].wrapper : '' })` }} 
                        className={ styles.boxdaythree0 }
                    >
                        <Box day={0} boxInfo={ presentInfo.advent_box_list[2] ? presentInfo.advent_box_list[2] :  { active:false, active_day:'???' } } />
                    </Column>
                    <Column width={2}/>
                </Row>
            </Grid>
        </div>
    );
}