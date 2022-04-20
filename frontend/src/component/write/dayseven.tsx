import { useRouter } from "next/router";
import { Button, Grid, Header } from "semantic-ui-react";
import styles from "../../../styles/write/write.module.css"

export default function Dayseven(){

    const router = useRouter()
    const id = router.query.id

    function writeDetail(number: Number) {
        router.push(`/write/${id}/${number}`)
    }

    function writeWrap(number: Number) {
        router.push({ pathname: `/write/${id}/wrap/${number}`, query: { day: `${7}`} })
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
                    <Grid.Column width={3} textAlign="center">
                        <Button color="blue" onClick={writeAniversary}>개봉일 설정</Button>
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                    <Grid.Column width={2}/>
                    <Grid.Column width={2} className={ styles.box }>
                        <div >
                            <Header as="h3" textAlign="left" style={{ padding: "10%" }}>D-6</Header>
                            <Button color="pink" className={ styles.sevenopen } onClick={()=>{writeDetail(1)}}>열기</Button>
                            <br /><br />
                            <Button color="pink" className={ styles.sevenwrap } onClick={()=>{writeWrap(1)}}>포장지 선택</Button>
                            <br /><br />
                        </div>
                    </Grid.Column>
                    <Grid.Column width={1}/>
                    <Grid.Column width={2} className={ styles.box }>
                        <div>
                            <Header as="h3" textAlign="left" style={{ padding: "10%" }}>D-5</Header>
                            <Button color="pink" className={ styles.sevenopen } onClick={()=>{writeDetail(2)}}>열기</Button>
                            <br /><br />
                            <Button color="pink" className={ styles.sevenwrap } onClick={()=>{writeWrap(2)}}>포장지 선택</Button>
                            <br /><br />
                        </div>
                    </Grid.Column>
                    <Grid.Column width={1}/>
                    <Grid.Column width={2} className={ styles.box }>
                        <div>
                            <Header as="h3" textAlign="left" style={{ padding: "10%" }}>D-4</Header>
                            <Button color="pink" className={ styles.sevenopen } onClick={()=>{writeDetail(3)}}>열기</Button>
                            <br /><br />
                            <Button color="pink" className={ styles.sevenwrap } onClick={()=>{writeWrap(3)}}>포장지 선택</Button>
                            <br /><br />
                        </div>
                    </Grid.Column>
                    <Grid.Column width={2} />
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={2}/>
                    <Grid.Column width={2} className={ styles.box }>
                        <div>
                            <Header as="h3" textAlign="left" style={{ padding: "10%" }}>D-3</Header>
                            <Button color="pink" className={ styles.sevenopen } onClick={()=>{writeDetail(4)}}>열기</Button>
                            <br /><br />
                            <Button color="pink" className={ styles.sevenwrap } onClick={()=>{writeWrap(4)}}>포장지 선택</Button>
                            <br /><br />
                        </div>
                    </Grid.Column>
                    <Grid.Column width={1}/>
                    <Grid.Column width={2} className={ styles.box }>
                        <div>
                            <Header as="h3" textAlign="left" style={{ padding: "10%" }}>D-2</Header>
                            <Button color="pink" className={ styles.sevenopen } onClick={()=>{writeDetail(5)}}>열기</Button>
                            <br /><br />
                            <Button color="pink" className={ styles.sevenwrap } onClick={()=>{writeWrap(5)}}>포장지 선택</Button>
                            <br /><br />
                        </div>
                    </Grid.Column>
                    <Grid.Column width={1}/>
                    <Grid.Column width={2} className={ styles.box }>
                        <div>
                            <Header as="h3" textAlign="left" style={{ padding: "10%" }}>D-1</Header>
                            <Button color="pink" className={ styles.sevenopen } onClick={()=>{writeDetail(6)}}>열기</Button>
                            <br /><br />
                            <Button color="pink" className={ styles.sevenwrap } onClick={()=>{writeWrap(6)}}>포장지 선택</Button>
                            <br /><br />
                        </div>
                    </Grid.Column>
                    <Grid.Column width={1}/>
                    <Grid.Column width={2} className={ styles.box }>
                        <div>
                            <Header as="h3" textAlign="left" style={{ padding: "10%" }}>D-day</Header>
                            <Button color="pink" className={ styles.sevenopen } onClick={()=>{writeDetail(7)}}>열기</Button>
                            <br /><br />
                            <Button color="pink" className={ styles.sevenwrap } onClick={()=>{writeWrap(7)}}>포장지 선택</Button>
                            <br /><br />
                        </div>
                    </Grid.Column>
                    <Grid.Column width={2}/>
                </Grid.Row>
            </Grid>
        </>
    );
}