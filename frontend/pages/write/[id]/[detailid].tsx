import { Grid } from "semantic-ui-react";

export default function Detail(){
    return(
        <>
            <Grid centered stackable>
                <Grid.Row />
                <Grid.Row>
                    <Grid.Column width={3} />
                    <Grid.Column>
                        <p>ddd</p>
                    </Grid.Column>
                    <Grid.Column width={3} />
                </Grid.Row>
                <Grid.Row />
                <Grid.Row>
                    <Grid.Column width={2}>
                        <p>배경선택</p>
                    </Grid.Column>
                    <Grid.Column width={2}>
                        <p>스티커</p>
                    </Grid.Column>
                    <Grid.Column width={2}>
                        <p>이미지 업로드</p>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </>
    );
}