import { useRouter } from "next/router";
import { SetStateAction, useEffect, useState } from "react";
import { Button, Grid } from "semantic-ui-react";
import styles from "../../../styles/write/write.module.css"
import allAxios from "../../lib/allAxios";
import Title from "./title";
import WriteSeven from "./writeseven";

export default function DaySeven({ userInfo }: any){

    const router = useRouter()
    const id = router.query.id
    const { Row, Column } = Grid
    const [adventInfo, setAdventInfo]: any = useState([])
    const [wrapper1, setWrapper1] = useState("")
    const [wrapper2, setWrapper2] = useState("")
    const [wrapper3, setWrapper3] = useState("")
    const [wrapper4, setWrapper4] = useState("")
    const [wrapper5, setWrapper5] = useState("")
    const [wrapper6, setWrapper6] = useState("")
    const [wrapper7, setWrapper7] = useState("")

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
                    } else if (box.advent_day === 4){
                        setWrapper4(box.wrapper)
                    } else if (box.advent_day === 5){
                        setWrapper5(box.wrapper)
                    } else if (box.advent_day === 6){
                        setWrapper6(box.wrapper)
                    } else if (box.advent_day === 7){
                        setWrapper7(box.wrapper)
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
                    <Column width={2} style={{ minWidth: "200px", minHeight: "200px", maxWidth: "250px", maxHeight: "250px", backgroundImage: `url(${ wrapper1 })` }} className={ styles.boxdayseven6 }>
                        <WriteSeven num={1} />
                    </Column>
                    <Column width={1}/>
                    <Column width={2} style={{ minWidth: "200px", minHeight: "200px", maxWidth: "250px", maxHeight: "250px", backgroundImage: `url(${ wrapper2 })` }} className={ styles.boxdayseven5 }>
                        <WriteSeven num={2} />
                    </Column>
                    <Column width={1}/>
                    <Column width={2} style={{ minWidth: "200px", minHeight: "200px", maxWidth: "250px", maxHeight: "250px", backgroundImage: `url(${ wrapper3 })` }} className={ styles.boxdayseven4 }>
                        <WriteSeven num={3} />
                    </Column>
                    <Column largeScreen={2} tablet={16}/>
                </Row>
                
                <Row>
                    <Column largeScreen={1} tablet={3}/>
                    <Column width={2} style={{ minWidth: "200px", minHeight: "200px", maxWidth: "250px", maxHeight: "250px", marginBottom: "30px", backgroundImage: `url(${ wrapper4 })` }} className={ styles.boxdayseven3 }>
                        <WriteSeven num={4} />
                    </Column>
                    <Column largeScreen={1} tablet={2}/>
                    <Column width={2} style={{ minWidth: "200px", minHeight: "200px", maxWidth: "250px", maxHeight: "250px", marginBottom: "30px", backgroundImage: `url(${ wrapper5 })` }} className={ styles.boxdayseven2 }>
                        <WriteSeven num={5} />
                    </Column>
                    <Column largeScreen={1} tablet={3}/>
                    <Column width={2} style={{ minWidth: "200px", minHeight: "200px", maxWidth: "250px", maxHeight: "250px", marginBottom: "30px", backgroundImage: `url(${ wrapper6 })` }} className={ styles.boxdayseven1 }>
                        <WriteSeven num={6} />
                    </Column>
                    <Column largeScreen={1} tablet={2}/>
                    <Column width={2} style={{ minWidth: "200px", minHeight: "200px", maxWidth: "250px", maxHeight: "250px", marginBottom: "30px", backgroundImage: `url(${ wrapper7 })` }} className={ styles.boxdayseven0 }>
                        <WriteSeven num={7} />
                    </Column>
                    <Column largeScreen={1} tablet={16}/>
                </Row>
            </Grid>
        </>
    );
}