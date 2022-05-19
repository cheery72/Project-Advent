import styles from "../../../styles/present/present.module.css"
import { Grid, Header } from "semantic-ui-react";

export default function Title({ title }:any){

    const { Row, Column } = Grid   
    return(
        <Grid centered>
            <Row />
            <Row>
                <Column 
                    textAlign="center" 
                    computer={6}
                    mobile={14}
                    className={ styles.title }
                >
                    <Header as="h1">
                        <span className={ styles.titleText }>{ title }</span>
                    </Header>
                </Column>
            </Row>
            <Row />
        </Grid>
    );
}