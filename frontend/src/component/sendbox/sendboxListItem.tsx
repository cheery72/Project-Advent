import Link from "next/link";
import { useState } from "react";
import { Button, Grid, Icon, Image } from "semantic-ui-react";
import styles from '../../../styles/sendbox/sendboxListItem.module.css'

const { Row, Column } = Grid

export default function SendboxListItem(){
    const item = {isSubmitted:false, presentTitle:'OO님께 보내는 선물', dDay:'2022-04-30'}

    // 오늘 날짜 : d-day 계산


    return (
        <Grid columns={3} style={{boxSizing: 'border-box', width:'500px', height:'230px', backgroundColor:'AliceBlue', borderRadius:'10px', boxShadow:'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px', padding:'15px 15px', marginLeft:'20px'}}>
            <Row>
                <Column width={5}>
                    <Image src="/sendbox/temp_sendbox_img.png" size='medium' wrapped />
                </Column>
                <Column width={8}>
                    { 
                        item.isSubmitted ? 
                        <Icon circular name='gift' size='large' inverted color='purple' style={{marginBottom:'10px'}}/>
                        :
                        <Icon circular name='gift' size='large' inverted color='yellow' style={{marginBottom:'10px'}}/>
                    }
                    <br />
                    <Link href=''><a className={styles.title}>❝{item.presentTitle}❞</a></Link>
                </Column>
                { !item.isSubmitted && // 전달 전에만 수정, 삭제가 가능
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
                        <Button color='yellow' style={{color:'black', background:'#F9E84F'}}>
                            <Icon name='comment' />전달하기
                        </Button>
                }
                </Column>
                <Column width={7} />
                <Column width={3} textAlign='center'>
                    <p style={{ boxSizing: 'border-box', height:'30px', padding:'4px', borderRadius: '100%', backgroundColor: 'white', fontWeight: 'bold', boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;'}}>
                        {item.isSubmitted ? '보냄' : 'D - 1'}
                    </p>
                </Column>
            </Row>
        </Grid>
    )
}