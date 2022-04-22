import { Grid } from "semantic-ui-react";
import SendboxListItem from "./sendboxListItem";

const { Row, Column } = Grid

export default function sendboxList(){
    // 테스트용 임시데이터
    const items = [
        {id:1, isSubmitted:false, presentTitle:'지애님께 보내는 선물', dDay:'2022-04-30'},
        {id:2, isSubmitted:false, presentTitle:'흔들리는 꽃들 속 에서 네 샴푸 향이 느껴진 거야', dDay:'2022-04-23'},
        {id:3, isSubmitted:false, presentTitle:'My precious💍', dDay:'2022-04-24'},
        {id:4, isSubmitted:true, presentTitle:'6팀 화이팅~🎇', dDay:'2022-04-25'},
        {id:5, isSubmitted:true, presentTitle:'7팀 화이팅~🎇', dDay:'2022-04-25'},
        {id:6, isSubmitted:true, presentTitle:'8팀 화이팅~🎇', dDay:'2022-04-25'},
    ]
    
    return (
        <div style={{margin:'30px 10%'}}>
            <Grid columns={2}>
                {items.map((item:any) => 
                    <Column>
                        <Row width={8}>
                            <SendboxListItem key={item.id} item={item} />
                        </Row> 
                    </Column>)
                }
            </Grid>
        </div>
    )
}