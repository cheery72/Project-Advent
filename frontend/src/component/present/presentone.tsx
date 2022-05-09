import { Grid } from "semantic-ui-react";
import styles from "../../../styles/present/present.module.css"
import Title from "./title";
import Box from "./box";

export default function PresentOne({presentInfo}:any){

    const { Row, Column } = Grid


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
                        <Box boxInfo={ presentInfo.advent_box_list[0] ? presentInfo.advent_box_list[0] : { active:false, active_day:'???' } } />
                    </Column>
                    <Column width={5}/>
                </Row>
            </Grid>
        </div>
    );
}