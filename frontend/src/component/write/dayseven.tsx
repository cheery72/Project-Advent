import { useRouter } from "next/router";
import { Button, Grid } from "semantic-ui-react";
import styles from "../../../styles/write/write.module.css"
import Title from "./title";
import WriteSeven from "./writeseven";

export default function DaySeven(){

    const router = useRouter()
    const id = router.query.id
    const { Row, Column } = Grid

    const writeAniversary = () => {
        router.push(`/write/${id}/anniversary`)
    }

    return(
        <>
            <Title id={id} day={7}/>
            <Grid textAlign="center" stackable>
                <Row>
                    <Column width={13} />
                    <Column width={3} textAlign="center">
                        <Button color="blue" inverted size="large" onClick={writeAniversary}>개봉일 설정</Button>
                    </Column>
                </Row>

                <Row>
                    <Column largeScreen={2} tablet={16}/>
                    <Column width={2} style={{ minWidth: "200px", minHeight: "200px", maxWidth: "250px", maxHeight: "250px" }} className={ styles.box }>
                        <WriteSeven num={1} />
                    </Column>
                    <Column width={1}/>
                    <Column width={2} style={{ minWidth: "200px", minHeight: "200px", maxWidth: "250px", maxHeight: "250px" }} className={ styles.box }>
                        <WriteSeven num={2} />
                    </Column>
                    <Column width={1}/>
                    <Column width={2} style={{ minWidth: "200px", minHeight: "200px", maxWidth: "250px", maxHeight: "250px" }} className={ styles.box }>
                        <WriteSeven num={3} />
                    </Column>
                    <Column largeScreen={2} tablet={16}/>
                </Row>
                
                <Row>
                    <Column largeScreen={1} tablet={3}/>
                    <Column width={2} style={{ minWidth: "200px", minHeight: "200px", maxWidth: "250px", maxHeight: "250px", marginBottom: "30px" }} className={ styles.box }>
                        <WriteSeven num={4} />
                    </Column>
                    <Column largeScreen={1} tablet={2}/>
                    <Column width={2} style={{ minWidth: "200px", minHeight: "200px", maxWidth: "250px", maxHeight: "250px", marginBottom: "30px" }} className={ styles.box }>
                        <WriteSeven num={5} />
                    </Column>
                    <Column largeScreen={1} tablet={3}/>
                    <Column width={2} style={{ minWidth: "200px", minHeight: "200px", maxWidth: "250px", maxHeight: "250px", marginBottom: "30px" }} className={ styles.box }>
                        <WriteSeven num={6} />
                    </Column>
                    <Column largeScreen={1} tablet={2}/>
                    <Column width={2} style={{ minWidth: "200px", minHeight: "200px", maxWidth: "250px", maxHeight: "250px", marginBottom: "30px" }} className={ styles.box }>
                        <WriteSeven num={7} />
                    </Column>
                    <Column largeScreen={1} tablet={16}/>
                </Row>
            </Grid>
        </>
    );
}