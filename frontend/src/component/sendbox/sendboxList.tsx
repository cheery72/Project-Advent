import { Grid } from "semantic-ui-react";
import SendboxListItem from "./sendboxListItem";
import styles from '../../../styles/sendbox/sendboxList.module.css'

const { Row, Column } = Grid

interface Item {
    id: number,
    isSubmitted: boolean,
    presentTitle: string,
    dDay: string // api에서 어떻게 주느냐에 따라 다를 수도 있음
}

export default function sendboxList(){
    // 테스트용 임시데이터 / 추후 axios(get)로 데이터를 받아올 예정
    const items = [
        {id:1, isSubmitted:false, presentTitle:'테스트님께 보내는 선물🎇✨🎉🍀🎁🎀🎈🎄', dDay:'2022-04-25'},
        {id:2, isSubmitted:false, presentTitle:'테스트께 보내는 선물', dDay:'2022-04-30'},
        {id:3, isSubmitted:false, presentTitle:'테스트님께 보내는 선물🎁', dDay:'2022-04-23'},
        {id:4, isSubmitted:false, presentTitle:'테스트님에게 보내는 선물💍', dDay:''},
        {id:5, isSubmitted:true, presentTitle:'테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트', dDay:'2022-04-25'},
        {id:6, isSubmitted:true, presentTitle:'test test test test test test test test test test test test test test', dDay:'2022-04-25'},
    ]
    // 텍스트가 4줄이 넘어가면 카드 높이가 달라짐(*화면 해상도에 따라 줄수가 달라짐)
    // : 글자수 적절히 제한하거나 카드 css를 조정하거나 해야함(아직 미해결)

    return (
        <div className={ styles.sendboxListWrapper }>
            <Grid columns={2} doubling>
                {
                    items.map((item:Item) => 
                        <Column key={item.id}>
                            <Row width={8}>
                                <SendboxListItem item={item} />
                            </Row> 
                        </Column>)
                }
            </Grid>
        </div>
    )
}