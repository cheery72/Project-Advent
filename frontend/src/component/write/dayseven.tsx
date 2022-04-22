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
                        <Button color="blue" onClick={writeAniversary}>개봉일 설정</Button>
                    </Column>
                </Row>

                <Row>
                    <Column width={2}/>
                    <Column width={2} className={ styles.box }>
                        <WriteSeven num={1} />
                    </Column>
                    <Column width={1}/>
                    <Column width={2} className={ styles.box }>
                        <WriteSeven num={2} />
                    </Column>
                    <Column width={1}/>
                    <Column width={2} className={ styles.box }>
                        <WriteSeven num={3} />
                    </Column>
                    <Column width={2} />
                </Row>
                
                <Row>
                    <Column width={2}/>
                    <Column width={2} className={ styles.box }>
                        <WriteSeven num={4} />
                    </Column>
                    <Column width={1}/>
                    <Column width={2} className={ styles.box }>
                        <WriteSeven num={5} />
                    </Column>
                    <Column width={1}/>
                    <Column width={2} className={ styles.box }>
                        <WriteSeven num={6} />
                    </Column>
                    <Column width={1}/>
                    <Column width={2} className={ styles.box }>
                        <WriteSeven num={7} />
                    </Column>
                    <Column width={2}/>
                </Row>
            </Grid>
        </>
    );
}