import { useRouter } from "next/router";
import { SetStateAction, useEffect, useState } from "react";
import { Button, Grid } from "semantic-ui-react";
import styles from "../../../styles/write/write.module.css"
import allAxios from "../../lib/allAxios";
import Title from "./title";
import WriteThree from "./writethree";

export default function DayThree({ userInfo }: any){

    const router = useRouter()
    const id = router.query.id
    const { Row, Column } = Grid
    const [adventInfo, setAdventInfo]: any = useState([])
    const [wrapper1, setWrapper1] = useState("")
    const [wrapper2, setWrapper2] = useState("")
    const [wrapper3, setWrapper3] = useState("")

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
                        setWrapper1(box.wrapper)
                    } else if (box.advent_day === 2){
                        setWrapper2(box.wrapper)
                    } else if (box.advent_day === 3){
                        setWrapper3(box.wrapper)
                    }
                    
                })
            })
            .catch((e) => {
                console.log(e)
            })
    }

    useEffect(() => {
        if (userInfo){
            getAdventInfo()
        }
    }, [userInfo])

    return(
        <>
            <Title id={id} day={3}/>
            <Grid textAlign="center" stackable>
                <Row>
                    <Column width={10} />
                    <Column width={6}>
                        <Button color="blue" inverted size="large" onClick={writeAniversary}>기념일 설정</Button>
                    </Column>
                </Row>
                
                <Row>
                    <Column width={2} style={{ minWidth: "200px", minHeight: "200px", maxWidth: "250px", maxHeight: "250px", backgroundImage: `url(${ wrapper1 })` }} className={ styles.boxdaythree2 }>
                        <WriteThree num={1} />
                    </Column>
                </Row>

                <Row>
                    <Column width={2}/>
                    <Column width={2} style={{ minWidth: "200px", minHeight: "200px", maxWidth: "250px", maxHeight: "250px", backgroundImage: `url(${ wrapper2 })` }} className={ styles.boxdaythree1 }>
                        <WriteThree num={2} />
                    </Column>
                    <Column width={1}/>
                    <Column width={2} style={{ minWidth: "200px", minHeight: "200px", maxWidth: "250px", maxHeight: "250px", backgroundImage: `url(${ wrapper3 })` }} className={ styles.boxdaythree0 }>
                        <WriteThree num={3} />
                    </Column>
                    <Column width={2}/>
                </Row>
            </Grid>
        </>
    );
}