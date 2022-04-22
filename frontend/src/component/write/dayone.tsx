import { useRouter } from "next/router";
import { Button, Grid } from "semantic-ui-react";
import styles from "../../../styles/write/write.module.css"
import Title from "./title";
import WriteOne from "./writeone";

export default function DayOne(){

    const router = useRouter()
    const id = router.query.id
    const { Row, Column } = Grid

    const writeAniversary = () => {
        router.push(`/write/${id}/anniversary`)
    }

    return(
        <>
            <Title id={id} day={1}/>
            <Grid stackable centered>
                <Row>
                    <Column width={13} />
                    <Column width={3} textAlign="center">
                        <Button color="blue" onClick={writeAniversary}>개봉일 설정</Button>
                    </Column>
                </Row>

                <Row>
                    <Column width={5}/>
                    <Column textAlign="center" width={6} className={ styles.box }>
                        <WriteOne />
                    </Column>
                    <Column width={5}/>
                </Row>
            </Grid>
        </>
    );
}