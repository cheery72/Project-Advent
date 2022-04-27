import Link from "next/link";
import { Button, Grid, Icon, Image } from "semantic-ui-react";
import styles from '../../../styles/sendbox/sendboxListItem.module.css'
import allAxios from "../../lib/allAxios";
import notify from "../notify/notify";

const { Row, Column } = Grid

                            // item 타입 어떻게 설정해야할지 잘 모르겠음(TS)
export default function SendboxListItem({ item, userId, getAdventsStorage }:any){
    const deleteAdvent = async () => {
        if (confirm('선물을 삭제하면 복구할 수 없습니다. 삭제하시겠습니까?')) {
            const response = await allAxios.delete(`/advents/${item.advent_id}/${userId}/`)
            .then(() =>{
                notify('success', '선물이 삭제되었습니다.', 3000)
                getAdventsStorage()
            })
            .catch((error) => {
                console.log(error)
            })
        } else {
            notify('info', '삭제가 취소되었습니다.', 2000)
        }
    }

    // 오늘 날짜 기준 d-day 계산 함수
    const dDayCount = () => {
        const { end_at } = item 
        if (end_at) {
            const dDayDate = new Date(end_at.substring(0, 4), Number(end_at.substring(5, 7))-1, end_at.substring(8, 10)) // month는 -1을 해줘야한다
            const now = new Date()
            const gap = now.getTime() - dDayDate.getTime()
            const result = Math.floor(gap / (1000 * 60 * 60 * 24)) * - 1

            if (result > 0) {
                return `D - ${result}`
            } else if (result === 0) {
                return <span className={ styles.dDayDate }>D-Day</span>
            } else if (result <= 0) {
                return <span className={ styles.dDayPast }>D-Day<br />경과</span>
            } 
        } else {
            return <span className={ styles.dDayNotSet }>D-Day<br />미설정</span>
        }
    }

    return (
        <Grid 
            columns={3} 
            data-aos="flip-up"
            className={ `${styles.sendboxListCard} ${item.received? styles.cardAfterColor : styles.cardBeforeColor}` } 
            style={{ padding: '20px 10px 10px', margin: '0 auto' }}
        >
            <Row>
                <Column width={5}>
                    <Image 
                        src={ `/sendbox/temp_sendbox_img-${item.received? 'after' : 'before'}.png` }
                        size='medium' 
                        wrapped 
                    />
                </Column>
                <Column 
                    width={8} 
                    style={{ paddingRight:'0', maginRight:'0' }}
                >
                    <Icon 
                        circular 
                        name='calendar check outline' 
                        size='large' 
                        inverted 
                        color={ item.received ? 'pink' : 'teal' } 
                        style={{ marginBottom: '10px' }}
                    />
                    { 
                        item.end_at
                        &&
                        <span className={styles.dDay}>
                            &nbsp;&nbsp; { item.end_at.substring(0, 4) }년 { Number(item.end_at.substring(5, 7)) }월 { item.end_at.substring(8, 10) }일
                        </span>
                    }
                    <br />
                    { 
                        // 전송완료인 선물만 제목 클릭시(난수정보 기준으로) 보낸 선물 상세보기 링크와 연결
                        <Link href={`/present/${item.advent_id}`}>
                            <a 
                                className={ `${styles.title} ${!item.received ? styles.hrefDisabled : ''}` }
                            >
                                ❝{ item.recipient_name }❞ 
                            </a>
                        </Link>

                    }
                </Column>
                <Column width={3}>
                { !item.received && // 전달 전에만 수정, 삭제가 가능
                    (<>
                        <Button 
                            animated='fade' 
                            color='blue' 
                            style={{ margin:'10px 0' }}
                        >
                            <Button.Content hidden>수정</Button.Content>
                            <Button.Content visible>
                                <Icon name='pencil' />
                            </Button.Content>
                        </Button>
                        <Button 
                            animated='fade' 
                            color='orange'
                            onClick={() => { deleteAdvent() }}
                        >
                            <Button.Content hidden>삭제</Button.Content>
                            <Button.Content visible>
                                <Icon name='trash alternate' />
                            </Button.Content>
                        </Button>
                    </>)
                }
                </Column>

            </Row>
            <Row>
                <Column width={6}>    
                {
                    item.received ? 
                        <></>
                        :
                        <Button style={{ color:'black', background:'#F9E84F' }}>
                            <Icon name='comment' />전달하기
                        </Button>
                }
                </Column>
                <Column width={7} />
                <Column
                    width={3} 
                    textAlign='center'
                >
                    <p className={ item.received ? styles.statusCircleSubmitted : styles.statusCircle }>
                        {item.received ? <>전달<br />완료</> : dDayCount() }
                    </p>
                </Column>
            </Row>
        </Grid>
    )
}