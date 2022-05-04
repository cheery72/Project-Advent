import { Grid } from "semantic-ui-react";
import Box from "./box";
import styles from "../../../styles/present/present.module.css"
import { useState } from "react";
import Title from "./title";

export default function PresentSeven(){
    const { Row, Column } = Grid

    const [title, setTitle] = useState<string>("Advent Special Day")
    const [wrapper1, setWrapper1] = useState("")
    const [wrapper2, setWrapper2] = useState("")
    const [wrapper3, setWrapper3] = useState("")
    const [wrapper4, setWrapper4] = useState("")
    const [wrapper5, setWrapper5] = useState("")
    const [wrapper6, setWrapper6] = useState("")
    const [wrapper7, setWrapper7] = useState("")
    
    return(
        <>
            <Title title={title} />
            <Grid textAlign="center" stackable>
                <Row>
                    <Column largeScreen={2} tablet={16}/>
                    <Column 
                        width={2} 
                        style={{ minWidth: "200px", minHeight: "200px", maxWidth: "250px", maxHeight: "250px", backgroundImage: `url(${ wrapper1 })` }} 
                        className={ styles.boxdayseven6 }
                    >
                        {/* <BoxSeven num={1} /> */}
                        <Box day={6} />
                    </Column>
                    <Column width={1}/>
                    <Column 
                        width={2} 
                        style={{ minWidth: "200px", minHeight: "200px", maxWidth: "250px", maxHeight: "250px", backgroundImage: `url(${ wrapper2 })` }} 
                        className={ styles.boxdayseven5 }
                    >
                        <Box day={5} />
                    </Column>
                    <Column width={1}/>
                    <Column width={2} 
                        style={{ minWidth: "200px", minHeight: "200px", maxWidth: "250px", maxHeight: "250px", backgroundImage: `url(${ wrapper3 })` }} 
                        className={ styles.boxdayseven4 }
                    >
                        <Box day={4} />
                    </Column>
                    <Column largeScreen={2} tablet={16}/>
                </Row>

                <Row>
                    <Column largeScreen={1} tablet={3}/>
                    <Column 
                        width={2} 
                        style={{ marginBottom:"20px", minWidth: "200px", minHeight: "200px", maxWidth: "250px", maxHeight: "250px", backgroundImage: `url(${ wrapper4 })` }} 
                        className={ styles.boxdayseven3 }
                    >
                        <Box day={3} />
                    </Column>
                    <Column largeScreen={1} tablet={2}/>
                    <Column 
                        width={2} 
                        style={{ marginBottom:"20px", minWidth: "200px", minHeight: "200px", maxWidth: "250px", maxHeight: "250px", backgroundImage: `url(${ wrapper5 })` }} 
                        className={ styles.boxdayseven2 }
                    >
                        <Box day={2} />
                    </Column>
                    <Column largeScreen={1} tablet={3}/>
                    <Column 
                        width={2} 
                        style={{ marginBottom:"20px", minWidth: "200px", minHeight: "200px", maxWidth: "250px", maxHeight: "250px", backgroundImage: `url(${ wrapper6 })` }} 
                        className={ styles.boxdayseven1 }
                    >
                        <Box day={1} />
                    </Column>
                    <Column largeScreen={1} tablet={2}/>
                    <Column 
                        width={2} 
                        style={{ marginBottom:"20px", minWidth: "200px", minHeight: "200px", maxWidth: "250px", maxHeight: "250px", backgroundImage: `url(${ wrapper7 })` }} 
                        className={ styles.boxdayseven0 }
                    >
                        <Box day={0} />
                    </Column>
                    <Column largeScreen={1} tablet={16}/>
                </Row>
            </Grid>
        </>
    );
}