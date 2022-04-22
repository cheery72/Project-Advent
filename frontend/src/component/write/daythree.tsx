import { useRouter } from "next/router";
import { Button, Grid } from "semantic-ui-react";
import styles from "../../../styles/write/write.module.css"
import Title from "./title";
import WriteThree from "./writethree";

export default function DayThree(){

    const router = useRouter()
    const id = router.query.id
    const { Row, Column } = Grid

    const writeAniversary = () => {
        router.push(`/write/${id}/anniversary`)
    }

    return(
        <>
            <Title id={id} day={3}/>
            <Grid textAlign="center" stackable>
                <Row>
                    <Column width={13} />
                    <Column width={3}>
                        <Button color="blue" onClick={writeAniversary}>개봉일 설정</Button>
                    </Column>
                </Row>
                
                <Row>
                    <Column width={3}/>
                    <Column width={3} className={ styles.box }>
                        <WriteThree num={1} />
                    </Column>
                    <Column width={3} />
                </Row>

                <Row>
                    <Column width={2}/>
                    <Column width={3} className={ styles.box }>
                        <WriteThree num={2} />
                    </Column>
                    <Column width={1}/>
                    <Column width={3} className={ styles.box }>
                        <WriteThree num={3} />
                    </Column>
                    <Column width={2}/>
                </Row>
            </Grid>
        </>
    );
}