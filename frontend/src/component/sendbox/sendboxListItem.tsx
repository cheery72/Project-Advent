import Link from "next/link";
import { Button, Grid, Icon, Image } from "semantic-ui-react";
import styles from '../../../styles/sendbox/sendboxListItem.module.css'

const { Row, Column } = Grid

                            // item 타입 어떻게 설정해야할지 잘 모르겠음(TS)
export default function SendboxListItem({ item }:any){

    // 오늘 날짜 기준 d-day 계산 함수
    const dDayCount = () => {
        const { dDay } = item 
        const dDayDate = new Date(dDay.substring(0, 4), Number(dDay.substring(5, 7))-1, dDay.substring(8)) // month는 -1을 해줘야한다
        const now = new Date()
        const gap = now.getTime() - dDayDate.getTime()
        const result = Math.floor(gap / (1000 * 60 * 60 * 24)) * -1;
        return result
    }

    return (
        <Grid 
            columns={3} 
            data-aos="flip-up"
            className={ `${styles.sendboxListCard} ${item.isSubmitted? styles.cardAfterColor : styles.cardBeforeColor}` } 
            style={{ padding: '20px 10px', margin: '0 auto' }}
        >
            <Row>
                <Column width={5}>
                    <Image 
                        src="/sendbox/temp_sendbox_img.png" 
                        size='medium' wrapped 
                    />
                </Column>
                <Column 
                    width={8} 
                    style={{ paddingRight:'0', maginRight:'0' }}
                >
                    <Icon 
                        circular 
                        name='gift' 
                        size='large' 
                        inverted 
                        color={ item.isSubmitted ? 'pink' : 'yellow' } 
                        style={{ marginBottom: '10px', display: 'block'}}
                    />
                    
                    { 
                        // 임시경로임 / 전송완료인 선물만 제목 클릭시(난수정보 기준으로) 보낸 선물 상세보기 링크와 연결 예정
                        <Link href='/'>
                            <a 
                                className={ `${styles.title} ${!item.isSubmitted ? styles.hrefDisabled : ''}` }
                            >
                                ❝{ item.presentTitle }❞ 
                            </a>
                        </Link>

                    }
                </Column>
                <Column width={3}>
                { !item.isSubmitted && // 전달 전에만 수정, 삭제가 가능
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
                    item.isSubmitted ? 
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
                    <p className={ styles.statusCircle }>
                        {item.isSubmitted ? '전송완료' : `D - ${dDayCount()}`}
                    </p>
                </Column>
            </Row>
        </Grid>
    )
}