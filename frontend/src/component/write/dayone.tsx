import { useRouter } from "next/router";
import { SetStateAction, useEffect, useState } from "react";
import { Button, Grid } from "semantic-ui-react";
import styles from "../../../styles/write/write.module.css"
import allAxios from "../../lib/allAxios";
import Title from "./title";
import WriteOne from "./writeone";

export default function DayOne({ userInfo }: any){

    const router = useRouter()
    const id = router.query.id
    const { Row, Column } = Grid
    const [adventInfo, setAdventInfo]: any = useState([])
    const [oneWrapper, setOneWrapper] = useState("")

    const writeAniversary = () => {
        router.push(`/write/${id}/anniversary`)
    }

    const getAdventInfo = () => {
        allAxios
            .get(`/advents/${id}/${userInfo.id}/advent`)
            .then(({ data }) => {
                console.log(data)
                setAdventInfo(data.advent_box_list)
                data.advent_box_list.map((box: { advent_day: number; wrapper: SetStateAction<string>; }) => {
                    if (box.advent_day === 1){
                        setOneWrapper(box.wrapper)
                    }
                })
            })
            .catch((e) => {
                console.log(e)
            })
    }

    useEffect(() => {
        if (userInfo) {
            getAdventInfo()
        }
    }, [userInfo])

    return(
        <>
            <Title id={id} day={1} />
            <Grid stackable centered>
                <Row>
                    <Column width={10} />
                    <Column width={6} textAlign="center">
                        <Button color="blue" inverted size="large" onClick={writeAniversary}>기념일 설정</Button>
                    </Column>
                </Row>

                <Row>
                    <Column width={5}/>
                    <Column textAlign="center" style={{ minWidth: "300px", minHeight: "300px", maxWidth: "300px", maxHeight: "300px", backgroundImage: `url(${ oneWrapper })` }} className={ styles.box }>
                        <WriteOne />
                    </Column>
                    <Column width={5}/>
                </Row>
            </Grid>
        </>
    );
}