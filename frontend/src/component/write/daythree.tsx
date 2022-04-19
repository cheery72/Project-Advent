import { useRouter } from "next/router";
import { Button, Grid, Header } from "semantic-ui-react";
import styles from "../../../styles/write/write.module.css"

export default function Daythree(){

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
            <Grid textAlign="center" stackable>
                <Grid.Row />
                <Grid.Row />
                <Grid.Row>
                    <Grid.Column width={13} />
                    <Grid.Column width={3}>
                        <Button color="blue" onClick={writeAniversary}>개봉일 설정</Button>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={3}/>
                    <Grid.Column width={3} className={ styles.box }>
                        <div >
                            <Header as="h3" textAlign="left" style={{ padding: "10%" }}>D-2</Header>
                            <Button className={styles.threeopen} color="pink" onClick={()=>{writeDetail(1)}}>열기</Button>
                            <br /><br />
                            <Button className={styles.threewrap} color="pink" onClick={()=>{writeWrap(1)}}>포장지 선택</Button>
                            <br /><br />
                        </div>
                    </Grid.Column>
                    <Grid.Column width={3} />
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={2}/>
                    <Grid.Column width={3} className={ styles.box }>
                        <div>
                            <Header as="h3" textAlign="left" style={{ padding: "10%" }}>D-1</Header>
                            <Button className={styles.threeopen} color="pink" onClick={()=>{writeDetail(2)}}>열기</Button>
                            <br /><br />
                            <Button className={styles.threewrap} color="pink" onClick={()=>{writeWrap(2)}}>포장지 선택</Button>
                            <br /><br />
                        </div>
                    </Grid.Column>
                    <Grid.Column width={1}/>
                    <Grid.Column width={3} className={ styles.box }>
                        <div>
                            <Header as="h3" textAlign="left" style={{ padding: "10%" }}>D-day</Header>
                            <Button className={styles.threeopen} color="pink" onClick={()=>{writeDetail(3)}}>열기</Button>
                            <br /><br />
                            <Button className={styles.threewrap} color="pink" onClick={()=>{writeWrap(3)}}>포장지 선택</Button>
                            <br /><br />
                        </div>
                    </Grid.Column>
                    <Grid.Column width={2}/>
                </Grid.Row>
            </Grid>
        </>
    );
}