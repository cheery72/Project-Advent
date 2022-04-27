import { Grid, Header } from "semantic-ui-react";
import BoxOne from "./boxone";

export default function PresentOne(){

    const { Row, Column } = Grid

    return(
        <>
            <Grid stackable centered>
                <Row />
                <Row>
                    <Header as="h1">임시 제목</Header>
                </Row>

                <Row>
                    <Column width={5}/>
                    <Column textAlign="center" width={6}>
                        <BoxOne />
                    </Column>
                    <Column width={5}/>
                </Row>
            </Grid>
        </>
    );
}