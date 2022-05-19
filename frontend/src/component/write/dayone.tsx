import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Button, Grid } from "semantic-ui-react";
import styles from "../../../styles/write/write.module.css"
import allAxios from "../../lib/allAxios";
import Title from "./title";
import WriteOne from "./writeone";


export default function DayOne({ userInfo }: any){

    const router = useRouter()
    const adventId = router.query.id
    const { Row, Column } = Grid
    const [box1, setBox1]: any = useState([])

    const writeAniversary = () => {
        router.push(`/write/${adventId}/anniversary`)
    }

    const getAdventInfo = async () => {
        await allAxios
            .get(`/advents/${adventId}/${userInfo.id}/advent`)
            .then(({ data }) => {
                data.advent_box_list.map((box: any) => {
                    if (box.advent_day === 1){
                        setBox1(box)
                    }
                })
            })
            .catch((e) => {
                // console.log(e)
            })
    }

    useEffect(() => {
        if (userInfo) {
            getAdventInfo()
        }
    }, [userInfo])

    return(
        <>
            <Title id={adventId} day={1} />
            <Grid stackable centered>
                <Row>
                    <Column width={10} />
                    <Column width={6} textAlign="center">
                        <Button color="blue" inverted size="large" onClick={writeAniversary} style={{width:"140px"}}>기념일 설정</Button>
                    </Column>
                </Row>

                <Row>
                    <Column width={5}/>
                    <Column textAlign="center" style={{ minWidth: "300px", minHeight: "300px", maxWidth: "300px", maxHeight: "300px", backgroundImage: `url(${ box1.wrapper })` }} className={ styles.box }>
                        <WriteOne userInfo={userInfo} boxId={box1.box_id}/>
                    </Column>
                    <Column width={5}/>
                </Row>
            </Grid>
        </>
    );
}