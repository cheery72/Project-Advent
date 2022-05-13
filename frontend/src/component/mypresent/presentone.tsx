import { Grid, Icon } from "semantic-ui-react";
import styles from "../../../styles/present/present.module.css"
import Title from "./title";
import Box from "./box";
import { useRouter } from "next/router";
import notify from "../notify/notify";

export default function PresentOne({presentInfo}:any){

    const { Row, Column } = Grid
    const router = useRouter()

    const goAniversary = () => {
        router.push(`/write/${presentInfo.advent_id}/anniversary`)
        notify('success', '기념일 설정 페이지로 이동되었습니다.')
    }

    return(
        <div data-aos="zoom-out">
            <Title title={presentInfo.title} />
            <div className={styles.dateStyle}>
                <span>
                    🗓️ D-DAY | 
                    { presentInfo.advent_box_list[0].is_active_at ? 
                        presentInfo.advent_box_list[0].is_active_at 
                        : 
                        <>
                            <span>기념일 미설정</span>
                            <div onClick={() => goAniversary()} className={styles.writeDDay}>
                                &nbsp;&nbsp;기념일 설정하기
                                <Icon name="arrow alternate circle right outline" color="blue" />
                            </div>
                        </>
                    }
                </span>
            </div>
            <Grid stackable centered>

                <Row>
                    <Column width={5}/>
                    <Column 
                        textAlign="center" 
                        style={{ minWidth: "300px", minHeight: "300px", maxWidth: "300px", maxHeight: "300px", backgroundImage: `url(${ presentInfo.advent_box_list[0] ? presentInfo.advent_box_list[0].wrapper : '' })` }} 
                        className={ styles.box }
                    >
                        <Box boxInfo={ presentInfo.advent_box_list[0] ? presentInfo.advent_box_list[0] : { active:false, active_day:'???' } } />
                    </Column>
                    <Column width={5}/>
                </Row>
            </Grid>
        </div>
    );
}