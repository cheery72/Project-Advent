import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Button, Grid } from "semantic-ui-react";
import styles from "../../../styles/write/write.module.css"
import allAxios from "../../lib/allAxios";
import Title from "./title";
import WriteThree from "./writethree";

export default function DayThree({ userInfo }: any){

    const router = useRouter()
    const adventId = router.query.id
    const { Row, Column } = Grid
    const [box1, setBox1]: any = useState([])
    const [box2, setBox2]: any = useState([])
    const [box3, setBox3]: any = useState([])

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
                    } else if (box.advent_day === 2){
                        setBox2(box)
                    } else if (box.advent_day === 3){
                        setBox3(box)
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
            <Title id={adventId} day={3}/>
            <Grid textAlign="center" stackable>
                <Row>
                    <Column width={10} />
                    <Column width={6}>
                        <Button color="blue" inverted size="large" onClick={writeAniversary}>기념일 설정</Button>
                    </Column>
                </Row>
                
                <Row>
                    <Column width={2} style={{ minWidth: "200px", minHeight: "200px", maxWidth: "250px", maxHeight: "250px", backgroundImage: `url(${ box1.wrapper })` }} className={ styles.boxdaythree2 }>
                        <WriteThree num={1} userInfo={userInfo} boxId={box1.box_id} />
                    </Column>
                </Row>

                <Row>
                    <Column width={2}/>
                    <Column width={2} style={{ minWidth: "200px", minHeight: "200px", maxWidth: "250px", maxHeight: "250px", backgroundImage: `url(${ box2.wrapper })` }} className={ styles.boxdaythree1 }>
                        <WriteThree num={2} userInfo={userInfo} boxId={box2.box_id} />
                    </Column>
                    <Column width={1}/>
                    <Column width={2} style={{ minWidth: "200px", minHeight: "200px", maxWidth: "250px", maxHeight: "250px", backgroundImage: `url(${ box3.wrapper })` }} className={ styles.boxdaythree0 }>
                        <WriteThree num={3} userInfo={userInfo} boxId={box3.box_id} />
                    </Column>
                    <Column width={2}/>
                </Row>
            </Grid>
        </>
    );
}