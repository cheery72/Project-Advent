import Link from "next/link";
import { useRouter } from "next/router";
import { Button, Grid, Icon, Image } from "semantic-ui-react";
import styles from '../../../styles/sendbox/sendboxListItem.module.css'
import allAxios from "../../lib/allAxios";
import notify from "../notify/notify";
import Swal from 'sweetalert2'

const { Row, Column } = Grid

const BASE_URL = 'http://localhost:3000'

export default function SendboxListItem({ item, userId, username, getAdventsStorage }:any){
    const router = useRouter()
    
    const deleteAdvent = async () => {
        await allAxios.delete(`/advents/${item.advent_id}/${userId}/`)
            .then(() => {
                notify('success', '선물이 삭제되었습니다.', 3000)
                getAdventsStorage()
            })
            .catch((error) => {
                console.log(error)
            })
    }
    
    const goModify = () => {
        notify('success', '선물 수정페이지로 이동되었습니다.')
        router.push(`/write/${item.advent_id}`)
    }

    const readPassedPresent = () => {
        notify('success', '전달한 선물 확인페이지로 이동되었습니다.')
        router.push(`/my_present/${item.advent_id}`)
    }

    const goAniversary = () => {
        router.push(`/write/${item.advent_id}/anniversary`)
        notify('success', '기념일 수정 페이지로 이동되었습니다.')
    }

    const copyLink = (msg:string) => {
        navigator.clipboard.writeText(`${BASE_URL}/present/${item.url}`) // 임시
        Swal.fire(
            '클립보드에 선물 링크가 \n 복사되었습니다!',
            `복사된 링크를 붙여넣기하여 \n ${msg}`,
            'success'
        )
    }

    const confirmDelete = () => {
        Swal.fire({
            title: '삭제하시겠습니까?',
            text: "선물을 삭제하면 복구할 수 없습니다😥",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#F27117',
            cancelButtonColor: '#3085d6',
            confirmButtonText: '삭제',
            cancelButtonText: '취소'
            }).then((result) => {
                if (result.isConfirmed) {
                    deleteAdvent()
                } else {
                    notify('info', '삭제가 취소되었습니다.')
                }
        })
    }

    const confirmAniversary = () => {
        Swal.fire({
            title: '기념일을 설정하지 않은 선물은 \n 전달할 수 없습니다.',
            text: "기념일을 설정하시겠습니까?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#FC9D9A',
            cancelButtonColor: '#3085d6',
            confirmButtonText: '기념일 설정하기',
            cancelButtonText: '전달 취소'
            }).then((result) => {
                if (result.isConfirmed) {
                    goAniversary()
                } else {
                    notify('info', '전달이 취소되었습니다.')
                }
        })
    }

    const choiceModifyOrDelivery = (title:string) => {
        Swal.fire({
            title: title,
            text: '기념일을 수정하여 전달하시겠습니까?',
            icon: 'question',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonColor: '#FC9D9A',
            denyButtonColor: '#87adbd',
            cancelButtonColor: '#3085d6',
            confirmButtonText: '기념일 수정하기',
            denyButtonText: '그대로 전달하기',
            cancelButtonText: '전달 취소'
            }).then((result) => {
                if (result.isConfirmed) {
                goAniversary()
                } else if (result.isDenied) {
                choiceKakaoOrCopy()
                }
            })
    }
    const emptybox = [...item.un_create_box_list, ...item.un_content_box_list]
    emptybox.sort() // 정렬

    // 생성되지 않은 상자 / 내용이 없는 상자 있을 때
    const boxValidationCheck = () => {
        Swal.fire({
            title: `❝ ${item.un_create_box+item.un_content_box} ❞개의 선물 내용이 비어있어 \n 전달할 수 없습니다.`,
            text: `❝ ${emptybox} ❞일차 선물에 추가 작성이 필요합니다. \n 선물 수정페이지로 이동하시겠습니까?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#07bcb3',
            cancelButtonColor: '#3085d6',
            confirmButtonText: '선물 수정하기',
            cancelButtonText: '전달 취소'
            }).then((result) => {
                if (result.isConfirmed) {
                goModify()
                } else if (result.isDenied) {
                choiceKakaoOrCopy()
                }
            })
    }

    // 카카오 링크 공유하기
    const deliveryToKakao = () => {
        const { Kakao } = window
        try {
            if (Kakao) {
                Kakao.init(process.env.NEXT_PUBLIC_API_KAKAO_LINK)
            };
        } catch(e) {
            console.log(e)
        };
        Kakao.Link.sendCustom({
            templateId: 75804,
            templateArgs: {
                'title': `${item.title}`,
                'description': `${username}님께서 보내신 어드벤트 스페셜 데이 선물이 도착했습니다.`,
                'url': `${item.url}`
            }
        });
        Kakao.Link.cleanup()
    }

    // 전달하기 방법 선택
    const choiceKakaoOrCopy = () => {
        Swal.fire({
            title: '선물 전달하기',
            text: '전달 방법을 선택해주세요!',
            icon: 'info',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonColor: '#fbbd08',
            denyButtonColor: '#00B5AD',
            cancelButtonColor: '#3085d6',
            confirmButtonText: '카카오톡으로 전달하기',
            denyButtonText: '링크로 전달하기',
            cancelButtonText: '전달 취소'
            }).then((result) => {
                if (result.isConfirmed) {
                    deliveryToKakao()
                } else if (result.isDenied) {
                    copyLink('선물을 전달하세요!')
                }
        })
    }

    // 오늘 날짜 기준 기념일 계산 함수
    const dDay = () => {
        const { end_at } = item 
        const dDayDate = new Date(end_at.substring(0, 4), Number(end_at.substring(5, 7))-1, Number(end_at.substring(8, 10))) // month는 -1을 해줘야한다
        const now = new Date()
        const gap = now.getTime() - dDayDate.getTime()
        const result = Math.floor(gap / (1000 * 60 * 60 * 24)) * - 1

        return result
    }
    
    const adventPassing = () => {
        if (item.un_create_box || item.un_content_box) { 
            boxValidationCheck()
        } else if (item.end_at) {
            const dDayQualify = dDay()
            const { advent_day } = item
            if (dDayQualify >= advent_day) {
                choiceKakaoOrCopy()
            } else if (dDayQualify > 0) {
                choiceModifyOrDelivery(`기념일이 설정한 선물일수인 \n ❝ ${advent_day}일 ❞ 보다 적게 남았습니다.`)
            } else if (dDayQualify === 0) {
                choiceModifyOrDelivery('오늘은 기념일 입니다.')
            } else if (dDayQualify < 0) {
                choiceModifyOrDelivery('기념일이 경과되었습니다.')
            }
        } else {
            confirmAniversary()
        }
    }
    
    const dDayCount = () => {
        const { end_at } = item 
        if (end_at) {
            const result = dDay()
            if (result > 0) {
                return <span className={result>item.advent_day ? styles.dDayCntBefore : styles.dDayCnt }>D - {result}</span>
            } else if (result === 0) {
                return <span className={ styles.dDayDate }>기념일</span>
            } else if (result <= 0) {
                return <span className={ styles.dDayPast }>기념일<br />경과</span>
            } 
        } else {
            return <span className={ styles.dDayNotSet }>기념일<br />미설정</span>
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
                            &nbsp;&nbsp; { item.end_at.substring(0, 4) }년 { Number(item.end_at.substring(5, 7)) }월 { Number(item.end_at.substring(8, 10)) }일
                        </span>
                    }
                    <br />
                    <span 
                        className={ `${styles.title}` }
                    >
                        ❝{ item.title }❞ 
                    </span>
                    
                    <p className={styles.adventDay}>
                        <Icon name="gift" color="yellow" />
                        선물일수 : <span> { item.advent_day }</span>  DAYS
                    </p>
                    {
                        item.un_create_box && item.un_content_box ?
                        <p className={styles.adventDay2}>
                            <Icon name="pencil" color="red" />
                            미작성 선물 : <span> { item.un_create_box + item.un_content_box}</span> DAY ({emptybox.map((x, index) => index+1 !== emptybox.length ? x+', ' : x)} 일차)
                        </p>
                        :
                        <></>
                    }
                </Column>
                <Column width={3}>
                { !item.received ?// 전달 전에만 수정, 삭제가 가능
                    <>
                        <Button 
                            animated='fade' 
                            color='blue' 
                            style={{ margin:'5px 0', width:'100%'}}
                            onClick={() => goModify()}
                        >
                            <Button.Content hidden>수정</Button.Content>
                            <Button.Content visible>
                                <Icon name='pencil' style={{ fontSize:'1vw'}} />
                            </Button.Content>
                        </Button>
                        <Button 
                            animated='fade' 
                            color='orange'
                            style={{ margin:'5px 0', width:'100%'}}
                            onClick={() => confirmDelete()}
                        >
                            <Button.Content hidden>삭제</Button.Content>
                            <Button.Content visible>
                                <Icon name='trash alternate' style={{ fontSize:'1vw'}} />
                            </Button.Content>
                        </Button>
                    </>
                    :
                    <>
                        <Button 
                            animated='fade' 
                            color='teal' 
                            style={{ margin:'5px 0', width:'100%'}}
                            onClick={() => copyLink('보낸 선물을 다시 전달할 수 있습니다!')}
                        >
                            <Button.Content hidden>링크확인</Button.Content>
                            <Button.Content visible>
                                <Icon name='linkify' style={{ fontSize:'1vw'}} />
                            </Button.Content>
                        </Button>
                        {/* 보낸선물 삭제는 임시!!! */}
                        <Button 
                            animated='fade' 
                            color='orange'
                            style={{ margin:'5px 0', width:'100%'}}
                            onClick={() => confirmDelete()}
                        >
                            <Button.Content hidden>삭제</Button.Content>
                            <Button.Content visible>
                                <Icon name='trash alternate' style={{ fontSize:'1vw'}} />
                            </Button.Content>
                        </Button>
                    </>
                }
                </Column>

            </Row>
            <Row>
                <Column width={5}>    
                {
                    item.received ? 
                        <Button 
                            onClick={() => readPassedPresent()}
                            color="twitter"
                            style={{ height:'100%', width:'100%', lineHeight:'150%', fontSize: '0.9vw' }}
                        >
                            <Icon 
                                name='gift' 
                            />&nbsp;전달한 선물<br /> 확인하기
                        </Button>
                        :
                        <Button 
                            onClick={() => adventPassing()}
                            style={{ color:'black', background:'#F9E84F', height:'100%', width:'90%', fontSize: '0.9vw' }}
                        >
                            <Icon 
                                name='comment' 
                            />&nbsp;&nbsp;전달하기
                        </Button>
                }
                </Column>
                <Column width={8}>
                    <Icon name="write square" />
                    <span className={styles.modifyTime}>
                        작성(수정)일자 : { item.modified_at.substring(0, 4) }년 { Number(item.modified_at.substring(5, 7)) }월 { Number(item.modified_at.substring(8, 10)) }일 { item.modified_at.substring(11, 19) }
                    </span>
                </Column>
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