import { useRouter } from "next/router";
import { Button, Grid, Header } from "semantic-ui-react";
import styles from "../../styles/write/period.module.css"

export default function Write(){

    const router = useRouter()
    const { Row, Column } = Grid

    const goWrite = (day: Number) => {
        alert(`어드벤트 켈린더(${day}일)이 생성되었습니다.`)
        router.push({ pathname: '/write/testid', query: { day: `${day}` }})

    }
    
    return(
        <>
            <div className={ styles.back }>
            <Grid stackable>
                <Row />
                <Row>
                    <Column width={5} />
                    <Column width={6} >
                        <Header as='h1' textAlign='center'>선물할 기간을 선택하세요</Header>
                    </Column>
                    <Column width={5} />
                </Row>

                <Row />

                <Row textAlign="center">
                    <Column width={3}/>
                    <Column width={10}>
                        <Button style={{ backgroundColor: "#82F0F0" }} className={ styles.button } onClick={() => {goWrite(1)}}>1일</Button>
                    </Column>
                    <Column width={3}/>
                </Row>

                <Row />
                <Row />

                <Row textAlign="center">
                    <Column width={4}/>
                    <Column width={3}>
                        <Button style={{ backgroundColor: "#82F0F0" }} className={ styles.button } onClick={() => {goWrite(3)}}>3일</Button>
                    </Column>
                    <Column width={2}/>
                    <Column width={3}>
                        <Button style={{ backgroundColor: "#82F0F0" }} className={ styles.button } onClick={() => {goWrite(7)}}>7일</Button>
                    </Column>
                    <Column width={4}/>
                </Row>
            </Grid>

            <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
            </div>
        </>
    );
}