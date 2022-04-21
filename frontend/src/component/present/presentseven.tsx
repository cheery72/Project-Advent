import { Grid, Header } from "semantic-ui-react";
import BoxSeven from "./boxseven";

export default function PresentSeven(){

    const { Row, Column } = Grid
    
    return(
        <>
            <Grid textAlign="center" stackable>
                <Row />
                <Row>
                    <Header as="h1">임시 제목</Header>
                </Row>

                <Row>
                    <Column width={2}/>
                    <Column width={2}>
                        <BoxSeven />
                    </Column>
                    <Column width={1}/>
                    <Column width={2}>
                        <BoxSeven />
                    </Column>
                    <Column width={1}/>
                    <Column width={2}>
                        <BoxSeven />
                    </Column>
                    <Column width={2} />
                </Row>
                <Row>
                    <Column width={2}/>
                    <Column width={2}>
                        <BoxSeven />
                    </Column>
                    <Column width={1}/>
                    <Column width={2}>
                        <BoxSeven />
                    </Column>
                    <Column width={1}/>
                    <Column width={2}>
                        <BoxSeven />
                    </Column>
                    <Column width={1}/>
                    <Column width={2}>
                        <BoxSeven />
                    </Column>
                    <Column width={2}/>
                </Row>
            </Grid>
        </>
    );
}