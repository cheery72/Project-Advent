import { Grid } from "semantic-ui-react";
import Box from "./box";
import styles from "../../../styles/present/present.module.css"
import { useState } from "react";
import Title from "./title";

export default function PresentThree(){

    const { Row, Column } = Grid

    const [title, setTitle] = useState<string>("Advent Special Day")
    const [wrapper1, setWrapper1] = useState("")
    const [wrapper2, setWrapper2] = useState("")
    const [wrapper3, setWrapper3] = useState("")

    return(
        <>
            <Title title={title} /> 
            <Grid textAlign="center" stackable>

                <Row>
                    <Column 
                        width={2} 
                        style={{ minWidth: "200px", minHeight: "200px", maxWidth: "250px", maxHeight: "250px", backgroundImage: `url(${ wrapper1 })` }} 
                        className={ styles.boxdaythree2 }
                    >
                        <Box day={2} />
                    </Column>
                </Row>

                <Row>
                    <Column width={2}/>
                    <Column 
                        width={2} 
                        style={{ minWidth: "200px", minHeight: "200px", maxWidth: "250px", maxHeight: "250px", backgroundImage: `url(${ wrapper2 })` }} 
                        className={ styles.boxdaythree1 }
                    >
                        <Box day={1} />
                    </Column>
                    <Column width={1}/>
                    <Column 
                        width={2} 
                        style={{ minWidth: "200px", minHeight: "200px", maxWidth: "250px", maxHeight: "250px", backgroundImage: `url(${ wrapper3 })` }} 
                        className={ styles.boxdaythree0 }
                    >
                        <Box day={0} />
                    </Column>
                    <Column width={2}/>
                </Row>
            </Grid>
        </>
    );
}