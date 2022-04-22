import { Grid, Header } from "semantic-ui-react";
import BoxThree from "./boxthree";

export default function PresentThree(){

    const { Row, Column } = Grid

    return(
        <>
            <Grid textAlign="center" stackable>
                <Row />
                <Row>
                    <Header as="h1">임시 제목</Header>
                </Row>

                <Row>
                    <Column width={3}/>
                    <Column width={3}>
                        <BoxThree num={1} />
                    </Column>
                    
                    <Column width={3} />
                </Row>

                <Row>
                    <Column width={2}/>
                    <Column width={3}>
                        <BoxThree num={2} />
                    </Column>
                    <Column width={1}/>
                    <Column width={3}>
                        <BoxThree num={3} />
                    </Column>
                    <Column width={2}/>
                </Row>
            </Grid>
        </>
    );
}