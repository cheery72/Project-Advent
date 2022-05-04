import { Grid } from "semantic-ui-react";
import Box from "./box";
import styles from "../../../styles/present/present.module.css"
import { useState } from "react";
import Title from "./title";

export default function PresentOne(){

    const { Row, Column } = Grid

    const [title, setTitle] = useState<string>("Advent Special Day")
    const [oneWrapper, setOneWrapper] = useState("")

    return(
        <>
            <Title title={title} />
            <Grid stackable centered>

                <Row>
                    <Column width={5}/>
                    <Column 
                        textAlign="center" 
                        style={{ minWidth: "300px", minHeight: "300px", maxWidth: "300px", maxHeight: "300px", backgroundImage: `url(${ oneWrapper })` }} 
                        className={ styles.box }
                    >
                        <Box />
                    </Column>
                    <Column width={5}/>
                </Row>
            </Grid>
        </>
    );
}