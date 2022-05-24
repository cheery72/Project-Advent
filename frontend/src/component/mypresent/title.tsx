import styles from "../../../styles/present/present.module.css"
import { Grid, Header, Icon } from "semantic-ui-react";
import notify from "../notify/notify";
import { useRouter } from "next/router";

export default function Title({ title, dday, adventId }:any){

    const { Row, Column } = Grid   

    const router = useRouter()
    
    const goAniversary = () => {
        router.push(`/write/${adventId}/anniversary`)
        notify('success', '기념일 설정 페이지로 이동되었습니다.')
    }

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
                    <span className={ styles.titleNotice }>(<Icon name="asterisk" color="red" />발송자 확인용)</span>
                    <Header as="h1">
                        <span className={ styles.titleText }>{ title }</span>
                    </Header>
                </Column>
            </Row>
            <Row>
                <div className={styles.dateStyle}>
                    <span>
                        🗓️ D-DAY | 
                        { dday ? 
                            <>&nbsp;{dday}</>
                            : 
                            <>
                                <span> 기념일 미설정</span>
                            </>
                        }
                    </span>
                </div>
            </Row>
            <Row />
        </Grid>
    );
}