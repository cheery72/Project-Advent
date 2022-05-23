import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Button, Grid } from "semantic-ui-react";
import Swal from "sweetalert2";
import styles from "../../../styles/write/write.module.css"
import allAxios from "../../lib/allAxios";
import Title from "./title";
import WriteSeven from "./writeseven";

export default function DaySeven({ userInfo }: any){

    const router = useRouter()
    const adventId = router.query.id
    const { Row, Column } = Grid
    const [box1, setBox1]: any = useState([])
    const [box2, setBox2]: any = useState([])
    const [box3, setBox3]: any = useState([])
    const [box4, setBox4]: any = useState([])
    const [box5, setBox5]: any = useState([])
    const [box6, setBox6]: any = useState([])
    const [box7, setBox7]: any = useState([])

    const writeAniversary = () => {
        router.push(`/write/${adventId}/anniversary`)
    }

    const boxValidationCheck = (data:any) => {
        const emptybox = [...data.un_create_box_list, ...data.un_content_box_list]
        emptybox.sort() // 정렬

        Swal.fire({
            title: `❝ ${data.un_create_box + data.un_content_box} ❞개의 선물 내용이 비어있어 \n 기념일을 설정할 수 없습니다.`,
            text: `❝ ${emptybox} ❞번째 선물에 추가 작성이 필요합니다.`,
            icon: 'warning',
            showCancelButton: false,
            confirmButtonColor: '#07bcb3',
            confirmButtonText: '확인',
        })
    }

    const getBoxValidationInfo = async () => {
        await allAxios
            .get(`/advents/${adventId}/creation`)
            .then(({ data }) => {
                if (data.un_create_box + data.un_content_box) {
                    boxValidationCheck(data)
                } else {
                    writeAniversary()
                }
            })
            .catch((e) => {
                // console.log(e)
            })
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
                    } else if (box.advent_day === 4){
                        setBox4(box)
                    } else if (box.advent_day === 5){
                        setBox5(box)
                    } else if (box.advent_day === 6){
                        setBox6(box)
                    } else if (box.advent_day === 7){
                        setBox7(box)
                    }
                })
            })
            .catch((e) => {
                // console.log(e)
            })
    }

    useEffect(() => {
        if (userInfo){
            getAdventInfo()
        }    
    }, [userInfo])

    return(
        <>
            <Title id={adventId} day={7}/>
            <Grid textAlign="center" stackable>
                <Row>
                    <Column width={10} />
                    <Column width={6} textAlign="center">
                        <Button color="blue" inverted size="large" onClick={getBoxValidationInfo} style={{width:"140px"}}>기념일 설정</Button>
                    </Column>
                </Row>

                <Row>
                    <Column largeScreen={2} tablet={16}/>
                    <Column width={2} style={{ minWidth: "200px", minHeight: "200px", maxWidth: "250px", maxHeight: "250px", backgroundImage: `url(${ box1.wrapper })` }} className={ styles.boxdayseven6 }>
                        <WriteSeven num={1} userInfo={userInfo} boxId={box1.box_id} />
                    </Column>
                    <Column width={1}/>
                    <Column width={2} style={{ minWidth: "200px", minHeight: "200px", maxWidth: "250px", maxHeight: "250px", backgroundImage: `url(${ box2.wrapper })` }} className={ styles.boxdayseven5 }>
                        <WriteSeven num={2} userInfo={userInfo} boxId={box2.box_id} />
                    </Column>
                    <Column width={1}/>
                    <Column width={2} style={{ minWidth: "200px", minHeight: "200px", maxWidth: "250px", maxHeight: "250px", backgroundImage: `url(${ box3.wrapper })` }} className={ styles.boxdayseven4 }>
                        <WriteSeven num={3} userInfo={userInfo} boxId={box3.box_id} />
                    </Column>
                    <Column largeScreen={2} tablet={16}/>
                </Row>

                <Row>
                    <Column width={1}/>
                    <Column width={2} style={{ minWidth: "200px", minHeight: "200px", maxWidth: "250px", maxHeight: "250px", marginBottom: "30px", backgroundImage: `url(${ box4.wrapper })` }} className={ styles.boxdayseven3 }>
                        <WriteSeven num={4} userInfo={userInfo} boxId={box4.box_id} />
                    </Column>
                    <Column width={1}/>
                    <Column width={2} style={{ minWidth: "200px", minHeight: "200px", maxWidth: "250px", maxHeight: "250px", marginBottom: "30px", backgroundImage: `url(${ box5.wrapper })` }} className={ styles.boxdayseven2 }>
                        <WriteSeven num={5} userInfo={userInfo} boxId={box5.box_id} />
                    </Column>
                    <Column width={1}/>
                    <Column width={2} style={{ minWidth: "200px", minHeight: "200px", maxWidth: "250px", maxHeight: "250px", marginBottom: "30px", backgroundImage: `url(${ box6.wrapper })` }} className={ styles.boxdayseven1 }>
                        <WriteSeven num={6} userInfo={userInfo} boxId={box6.box_id} />
                    </Column>
                    <Column width={1}/>
                    <Column width={2} style={{ minWidth: "200px", minHeight: "200px", maxWidth: "250px", maxHeight: "250px", marginBottom: "30px", backgroundImage: `url(${ box7.wrapper })` }} className={ styles.boxdayseven0 }>
                        <WriteSeven num={7} userInfo={userInfo} boxId={box7.box_id} />
                    </Column>
                    <Column width={1}/>
                </Row>
            </Grid>
        </>
    );
}