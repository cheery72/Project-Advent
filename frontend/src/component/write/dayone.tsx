import { useRouter } from "next/router";
import { Button, Grid, GridColumn, Header } from "semantic-ui-react";
import styles from "../../../styles/write/write.module.css"

export default function Dayone(){

    const router = useRouter()
    const id = router.query.id

    function writeDetail(number: Number) {
        router.push(`/write/${id}/${number}`)
    }

    function writeWrap(number: Number) {
        router.push(`/write/${id}/wrap/${number}`)
    }

    function writeAniversary(){
        router.push(`/write/${id}/anniversary`)
    }

    return(
        <>
            <Grid stackable centered>
                <Grid.Row />
                <Grid.Row>
                    <Grid.Column width={13} />
                    <Grid.Column width={3} textAlign="center">
                        <Button color="blue" onClick={writeAniversary}>개봉일 설정</Button>
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                    <Grid.Column width={5}/>
                    <GridColumn textAlign="center" width={6}>
                        <div className={ styles.box }>
                            <Header as="h3" textAlign="left" style={{ padding: "5%" }}>D-day</Header>
                            <br />
                            <Button className={ styles.oneopen } color="pink" onClick={()=>{writeDetail(1)}}>열기</Button>
                            <br /><br /><br />
                            <Button className={ styles.onewrap } color="pink" onClick={()=>{writeWrap(1)}}>포장지 선택</Button>
                            <br /><br />
                            <br /><br />
                        </div>
                    </GridColumn>
                    <Grid.Column width={5}/>
                </Grid.Row>
            </Grid>
        </>
    );
}