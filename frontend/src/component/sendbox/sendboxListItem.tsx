import Link from "next/link";
import { Button, Grid, Icon, Image } from "semantic-ui-react";
import styles from '../../../styles/sendbox/sendboxListItem.module.css'

const { Row, Column } = Grid

                            // item 타입 모르겠음(TS)
export default function SendboxListItem({item}:any){

    // 오늘 날짜 : d-day 계산
    let today = new Date();   

    let year = today.getFullYear(); // 년도
    let month = today.getMonth() + 1;  // 월
    let date = today.getDate();  // 날짜
    
    // 같은 달 현재 이후 날짜 기준으로만 임시 구현 : d-day가 다른 달인 경우에는 이후에 추가 구현
    const dDayCount = () => {
        return Number(item.dDay.substr(8)) - date
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
                        
                        <Link href=''>
                            <a 
                                className={ `${styles.title} ${!item.isSubmitted ? styles.hrefDisabled : ''}` }
                            > {/*  */}
                                ❝{ item.presentTitle }❞ 
                            </a>
                        </Link>

                    }
                </Column>
                { !item.isSubmitted && // 전달 전에만 수정, 삭제가 가능
                    ( <Column width={3}>
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
                    </Column> )
                }

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