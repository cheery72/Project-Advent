import { useRouter } from "next/router";
import { Button, Grid, Header } from "semantic-ui-react";
import styles from "../../styles/write/period.module.css"

export default function Write(){

    const router = useRouter()

    function goWrite(day: Number){
        alert(`어드벤트 켈린더(${day}일)이 생성되었습니다.`)
        router.push({ pathname: '/write/testid', query: { day: `${day}` }})
    }
    
    return(
        <>
            <div className={ styles.back }>
            <Grid stackable>
                <Grid.Row />
                <Grid.Row>
                    <Grid.Column width={5} />
                    <Grid.Column width={6} >
                        <Header as='h1' textAlign='center'>선물할 기간을 선택하세요</Header>
                    </Grid.Column>
                    <Grid.Column width={5} />
                </Grid.Row>

                <Grid.Row />

                <Grid.Row textAlign="center">
                    <Grid.Column width={3}/>
                    <Grid.Column width={10}>
                        <Button style={{ backgroundColor: "#82F0F0" }} className={ styles.button } onClick={() => {goWrite(1)}}>1일</Button>
                    </Grid.Column>
                    <Grid.Column width={3}/>
                </Grid.Row>

                <Grid.Row />
                <Grid.Row />

                <Grid.Row textAlign="center">
                    <Grid.Column width={4}/>
                    <Grid.Column width={3}>
                        <Button style={{ backgroundColor: "#82F0F0" }} className={ styles.button } onClick={() => {goWrite(3)}}>3일</Button>
                    </Grid.Column>
                    <Grid.Column width={2}/>
                    <Grid.Column width={3}>
                        <Button style={{ backgroundColor: "#82F0F0" }} className={ styles.button } onClick={() => {goWrite(7)}}>7일</Button>
                    </Grid.Column>
                    <Grid.Column width={4}/>
                </Grid.Row>
            </Grid>

            <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
            </div>
        </>
    );
}