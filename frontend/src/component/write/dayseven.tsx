import { useRouter } from "next/router";
import { Button, Grid, Header } from "semantic-ui-react";
import styles from "../../../styles/write/write.module.css"

export default function Dayseven(){

    const router = useRouter()
    const id = router.query.id
    const { Row, Column } = Grid

    const writeDetail = (number: Number) => {
        router.push({ pathname: `/write/${id}/${number}`, query: { day: `${7}`}})
    }
    
    const writeWrap = (number: Number) => {
        router.push({ pathname: `/write/${id}/wrap/${number}`, query: { day: `${7}`} })
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
                    <Column width={3} textAlign="center">
                        <Button color="blue" onClick={writeAniversary}>개봉일 설정</Button>
                    </Column>
                </Row>

                <Row>
                    <Column width={2}/>
                    <Column width={2} className={ styles.box }>
                        <div >
                            <Header as="h3" textAlign="left" style={{ padding: "10%" }}>D-6</Header>
                            <Button color="pink" className={ styles.sevenopen } onClick={()=>{writeDetail(1)}}>열기</Button>
                            <br /><br />
                            <Button color="pink" className={ styles.sevenwrap } onClick={()=>{writeWrap(1)}}>포장지 선택</Button>
                            <br /><br />
                        </div>
                    </Column>
                    <Column width={1}/>
                    <Column width={2} className={ styles.box }>
                        <div>
                            <Header as="h3" textAlign="left" style={{ padding: "10%" }}>D-5</Header>
                            <Button color="pink" className={ styles.sevenopen } onClick={()=>{writeDetail(2)}}>열기</Button>
                            <br /><br />
                            <Button color="pink" className={ styles.sevenwrap } onClick={()=>{writeWrap(2)}}>포장지 선택</Button>
                            <br /><br />
                        </div>
                    </Column>
                    <Column width={1}/>
                    <Column width={2} className={ styles.box }>
                        <div>
                            <Header as="h3" textAlign="left" style={{ padding: "10%" }}>D-4</Header>
                            <Button color="pink" className={ styles.sevenopen } onClick={()=>{writeDetail(3)}}>열기</Button>
                            <br /><br />
                            <Button color="pink" className={ styles.sevenwrap } onClick={()=>{writeWrap(3)}}>포장지 선택</Button>
                            <br /><br />
                        </div>
                    </Column>
                    <Column width={2} />
                </Row>
                <Row>
                    <Column width={2}/>
                    <Column width={2} className={ styles.box }>
                        <div>
                            <Header as="h3" textAlign="left" style={{ padding: "10%" }}>D-3</Header>
                            <Button color="pink" className={ styles.sevenopen } onClick={()=>{writeDetail(4)}}>열기</Button>
                            <br /><br />
                            <Button color="pink" className={ styles.sevenwrap } onClick={()=>{writeWrap(4)}}>포장지 선택</Button>
                            <br /><br />
                        </div>
                    </Column>
                    <Column width={1}/>
                    <Column width={2} className={ styles.box }>
                        <div>
                            <Header as="h3" textAlign="left" style={{ padding: "10%" }}>D-2</Header>
                            <Button color="pink" className={ styles.sevenopen } onClick={()=>{writeDetail(5)}}>열기</Button>
                            <br /><br />
                            <Button color="pink" className={ styles.sevenwrap } onClick={()=>{writeWrap(5)}}>포장지 선택</Button>
                            <br /><br />
                        </div>
                    </Column>
                    <Column width={1}/>
                    <Column width={2} className={ styles.box }>
                        <div>
                            <Header as="h3" textAlign="left" style={{ padding: "10%" }}>D-1</Header>
                            <Button color="pink" className={ styles.sevenopen } onClick={()=>{writeDetail(6)}}>열기</Button>
                            <br /><br />
                            <Button color="pink" className={ styles.sevenwrap } onClick={()=>{writeWrap(6)}}>포장지 선택</Button>
                            <br /><br />
                        </div>
                    </Column>
                    <Column width={1}/>
                    <Column width={2} className={ styles.box }>
                        <div>
                            <Header as="h3" textAlign="left" style={{ padding: "10%" }}>D-day</Header>
                            <Button color="pink" className={ styles.sevenopen } onClick={()=>{writeDetail(7)}}>열기</Button>
                            <br /><br />
                            <Button color="pink" className={ styles.sevenwrap } onClick={()=>{writeWrap(7)}}>포장지 선택</Button>
                            <br /><br />
                        </div>
                    </Column>
                    <Column width={2}/>
                </Row>
            </Grid>
        </>
    );
}