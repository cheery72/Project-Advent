import { useRouter } from "next/router";
import { useEffect } from "react";
import { Button, Grid } from "semantic-ui-react";
import styles from "../../../styles/write/write.module.css"
import allAxios from "../../lib/allAxios";
import Title from "./title";
import WriteOne from "./writeone";

export default function DayOne(){

    const router = useRouter()
    const id = router.query.id
    const { Row, Column } = Grid

    const writeAniversary = () => {
        router.push(`/write/${id}/anniversary`)
    }

    const getAdventInfo = () => {
        allAxios
            .get(`/advents/${id}/advent`)
            .then(({ data }) => {
                console.log(data)
            })
            .catch((e) => {
                console.log(e)
            })
    }

    useEffect(() => {
        getAdventInfo()
    }, [])

    return(
        <>
            <Title id={id} day={1}/>
            <Grid stackable centered>
                <Row>
                    <Column width={13} />
                    <Column width={3} textAlign="center">
                        <Button color="blue" inverted size="large" onClick={writeAniversary}>개봉일 설정</Button>
                    </Column>
                </Row>

                <Row>
                    <Column width={5}/>
                    <Column textAlign="center" style={{ minWidth: "300px", minHeight: "300px", maxWidth: "300px", maxHeight: "300px" }} className={ styles.box }>
                        <WriteOne />
                    </Column>
                    <Column width={5}/>
                </Row>
            </Grid>
        </>
    );
}