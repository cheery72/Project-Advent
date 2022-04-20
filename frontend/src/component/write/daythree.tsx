import { useRouter } from "next/router";
import { Button, Grid, Header } from "semantic-ui-react";
import styles from "../../../styles/write/write.module.css"

export default function Daythree(){

    const router = useRouter()
    const id = router.query.id
    const { Row, Column } = Grid

    const writeDetail = (number: Number) => {
        router.push({ pathname: `/write/${id}/${number}`, query: { day: `${3}`}})
    }

    const writeWrap = (number: Number) => {
        router.push({ pathname: `/write/${id}/wrap/${number}`, query: { day: `${3}`} })
    }

    const writeAniversary = () => {
        router.push(`/write/${id}/anniversary`)
    }

    return(
        <>
            <Grid textAlign="center" stackable>
                <Row />
                <Row />
                <Row>
                    <Column width={13} />
                    <Column width={3}>
                        <Button color="blue" onClick={writeAniversary}>개봉일 설정</Button>
                    </Column>
                </Row>
                <Row>
                    <Column width={3}/>
                    <Column width={3} className={ styles.box }>
                        <div>
                            <Header as="h3" textAlign="left" style={{ padding: "10%" }}>D-2</Header>
                            <Button className={styles.threeopen} color="pink" onClick={()=>{ writeDetail(1) }}>열기</Button>
                            <br /><br />
                            <Button className={styles.threewrap} color="pink" onClick={()=>{ writeWrap(1) }}>포장지 선택</Button>
                            <br /><br />
                        </div>
                    </Column>
                    
                    <Column width={3} />
                </Row>
                <Row>
                    <Column width={2}/>
                    <Column width={3} className={ styles.box }>
                        <div>
                            <Header as="h3" textAlign="left" style={{ padding: "10%" }}>D-1</Header>
                            <Button className={styles.threeopen} color="pink" onClick={()=>{ writeDetail(2) }}>열기</Button>
                            <br /><br />
                            <Button className={styles.threewrap} color="pink" onClick={()=>{ writeWrap(2) }}>포장지 선택</Button>
                            <br /><br />
                        </div>
                    </Column>
                    <Column width={1}/>
                    <Column width={3} className={ styles.box }>
                        <div>
                            <Header as="h3" textAlign="left" style={{ padding: "10%" }}>D-day</Header>
                            <Button className={styles.threeopen} color="pink" onClick={()=>{ writeDetail(3) }}>열기</Button>
                            <br /><br />
                            <Button className={styles.threewrap} color="pink" onClick={()=>{ writeWrap(3) }}>포장지 선택</Button>
                            <br /><br />
                        </div>
                    </Column>
                    <Column width={2}/>
                </Row>
                <Row></Row>
            </Grid>
        </>
    );
}