import { useRouter } from "next/router";
import { Button, Grid, Header } from "semantic-ui-react";
import styles from "../../../styles/write/write.module.css"
import Title from "./title";

export default function Dayone(){

    const router = useRouter()
    const id = router.query.id
    const { Row, Column } = Grid

    const writeDetail = (number: Number) => {
        router.push({ pathname: `/write/${id}/${number}`, query: { day: `${1}`}})
    }
    
    const writeWrap = (number: Number) => {
        router.push({ pathname: `/write/${id}/wrap/${number}`, query: { day: `${1}`} })
    }

    const writeAniversary = () => {
        router.push(`/write/${id}/anniversary`)
    }

    return(
        <>
            <Title id={id} day={1}/>
            <Grid stackable centered>
                <Row>
                    <Column width={13} />
                    <Column width={3} textAlign="center">
                        <Button color="blue" onClick={writeAniversary}>개봉일 설정</Button>
                    </Column>
                </Row>

                <Row>
                    <Column width={5}/>
                    <Column textAlign="center" width={6} className={ styles.box }>
                        <div>
                            <Header as="h3" textAlign="left" style={{ padding: "5%" }}>D-day</Header>
                            <br />
                            <Button className={ styles.oneopen } color="pink" onClick={()=>{ writeDetail(1) }}>열기</Button>
                            <br /><br /><br />
                            <Button className={ styles.onewrap } color="pink" onClick={()=>{writeWrap(1)}}>포장지 선택</Button>
                            <br /><br />
                            <br /><br />
                        </div>
                    </Column>
                    <Column width={5}/>
                </Row>
            </Grid>
        </>
    );
}