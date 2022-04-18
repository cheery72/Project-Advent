import { useRouter } from "next/router";
import { useState } from "react";
import { Grid, Button, Image } from "semantic-ui-react";

export default function WritePresent(){

    const router = useRouter()
    console.log(router)

    function edit(number: Number) {
        router.push(`/write/testid/${number}`)
    }

    function editwrap(number: Number) {
        router.push(`/write/testid/wrap/${number}`)
    }

    function editAniversary(){
        router.push(`/write/testid/anniversary`)
    }

    return(
        <>
            <Grid textAlign="center" stackable>
                <Grid.Row />
                <Grid.Row />
                <Grid.Row>
                    <Grid.Column width={2}/>
                    <Grid.Column width={2}>
                        <div >
                            <br /><br />
                            <Button color="pink" onClick={()=>{edit(1)}}>열기</Button>
                            <br /><br />
                            <Button color="pink" onClick={()=>{editwrap(1)}}>포장지 선택</Button>
                            <br /><br />
                        </div>
                    </Grid.Column>
                    <Grid.Column width={2}>
                        <div>
                            <br /><br />
                            <Button color="pink">열기</Button>
                            <br /><br />
                            <Button color="pink">포장지 선택</Button>
                            <br /><br />
                        </div>
                    </Grid.Column>
                    <Grid.Column width={2}>
                        <div>
                            <br /><br />
                            <Button color="pink">열기</Button>
                            <br /><br />
                            <Button color="pink">포장지 선택</Button>
                            <br /><br />
                        </div>
                    </Grid.Column>
                    <Grid.Column width={2}>
                        <Button color="blue" onClick={editAniversary}>개봉일 설정</Button>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={2}/>
                    <Grid.Column width={2}>
                        <div>
                            <br /><br />
                            <Button color="pink">열기</Button>
                            <br /><br />
                            <Button color="pink">포장지 선택</Button>
                            <br /><br />
                        </div>
                    </Grid.Column>
                    <Grid.Column width={2}>
                        <div>
                            <br /><br />
                            <Button color="pink">열기</Button>
                            <br /><br />
                            <Button color="pink">포장지 선택</Button>
                            <br /><br />
                        </div>
                    </Grid.Column>
                    <Grid.Column width={2}>
                        <div>
                            <br /><br />
                            <Button color="pink">열기</Button>
                            <br /><br />
                            <Button color="pink">포장지 선택</Button>
                            <br /><br />
                        </div>
                    </Grid.Column>
                    <Grid.Column width={2}>
                        <div>
                            <br /><br />
                            <Button color="pink">열기</Button>
                            <br /><br />
                            <Button color="pink">포장지 선택</Button>
                            <br /><br />
                        </div>
                    </Grid.Column>
                    <Grid.Column width={2}/>
                </Grid.Row>
            </Grid>
        </>
    );
}