import Link from "next/link";
import { useState } from "react";
import { Button, Grid, Icon, Image } from "semantic-ui-react";
import styles from '../../../styles/sendbox/sendboxListItem.module.css'

const { Row, Column } = Grid

export default function SendboxListItem({item}:any){

    const { isSubmitted, dDay, presentTitle } = item

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
        <Grid columns={3} style={{boxSizing: 'border-box', width:'100%', height:'100%', backgroundColor:'AliceBlue', borderRadius:'10px', boxShadow:'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px', padding:'20px 10px', margin:'0 auto'}}>
            <Row>
                <Column width={5}>
                    <Image src="/sendbox/temp_sendbox_img.png" size='medium' wrapped />
                </Column>
                <Column width={8}>
                    { 
                        isSubmitted ? 
                        <Icon circular name='gift' size='large' inverted color='purple' style={{marginBottom:'10px'}}/>
                        :
                        <Icon circular name='gift' size='large' inverted color='yellow' style={{marginBottom:'10px'}}/>
                    }
                    <br />
                    <Link href=''><a className={styles.title}>❝{presentTitle}❞</a></Link>
                </Column>
                { !isSubmitted && // 전달 전에만 수정, 삭제가 가능
                ( <Column width={3}>
                    <Button animated='fade' color='blue' style={{margin:'10px 0'}}>
                        <Button.Content hidden>수정</Button.Content>
                        <Button.Content visible>
                            <Icon name='pencil' />
                        </Button.Content>
                    </Button>
                    <Button animated='fade' color='orange'>
                        <Button.Content hidden>삭제</Button.Content>
                        <Button.Content visible>
                            <Icon name='trash alternate' />
                        </Button.Content>
                    </Button>
                </Column> )}

            </Row>
            <Row>
                <Column width={6}>    
                {
                    item.isSubmitted ? 
                        <></>
                        :
                        <Button style={{ color:'black', background:'#F9E84F' }}> {/* hover설정 별도로 주기 */}
                            <Icon name='comment' />전달하기
                        </Button>
                }
                </Column>
                <Column width={7} />
                <Column width={3} textAlign='center'>
                    <p style={{ boxSizing: 'border-box', height:'30px', padding:'4px', borderRadius: '100%', backgroundColor: 'white', fontWeight: 'bold', boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px'}}>
                        {item.isSubmitted ? '보냄' : `D - ${dDayCount()}`}
                    </p>
                </Column>
            </Row>
        </Grid>
    )
}