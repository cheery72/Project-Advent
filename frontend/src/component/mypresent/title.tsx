import styles from "../../../styles/present/present.module.css"
import { Grid, Header, Icon } from "semantic-ui-react";

export default function Title({ title }:any){

    const { Row, Column } = Grid   
    return(
        <Grid centered>
            <Row />
            <Row>
                <Column 
                    textAlign="center" 
                    width={6} 
                    className={ styles.title }
                >
                    <span className={ styles.titleNotice }>(<Icon name="asterisk" color="red" />발송자 확인용)</span>
                    <Header as="h1">
                        <span className={ styles.titleText }>{ title }</span>
                    </Header>
                </Column>
            </Row>
            <Row />
        </Grid>
    );
}