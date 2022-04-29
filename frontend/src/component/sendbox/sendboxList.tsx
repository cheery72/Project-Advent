import { Button, Grid, Icon } from "semantic-ui-react";
import SendboxListItem from "./sendboxListItem";
import styles from '../../../styles/sendbox/sendboxList.module.css'
import { useEffect, useState } from "react";
import allAxios from "../../lib/allAxios";
import LoadingSpinner from "../loadingSpinner";
import Pagination from "./pagination"

const { Row, Column } = Grid

                            // item 타입 어떻게 설정해야할지 모르겠음(TS)
export default function sendboxList({ userId }:any){
    const [sendbox, setSendbox] = useState<any>('loading')
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)

    // 카카오 링크 공유하기 기능
    const KAKAO_API_KEY = 'fee4389053b0873a7e46c5134141b59a'
    interface IProps {
        children: React.ReactNode;
    }

    useEffect(() => {
        window.Kakao.init(KAKAO_API_KEY);
    }, []);

    const getAdventsStorage = async () => {
        if (userId) {
            allAxios.get(`/advents/${userId}/storages?page=${currentPage-1}`)
                .then((response) =>{
                    setSendbox(response.data.content)
                    setTotalPages(response.data.total_pages)
                    // setSendbox([
                    //     {advent_id:1, received:false, title:'테스트님께 보내는 선물🎇✨🎉🍀🎁🎀🎈🎄', end_at:'2022-04-25', advent_day:7},
                    //     {advent_id:2, received:false, title:'테스트께 보내는 선물', end_at:'2022-04-30', advent_day:7},
                    //     {advent_id:3, received:false, title:'테스트님께 보내는 선물🎁', end_at:'2022-04-28', advent_day:7},
                    //     {advent_id:4, received:false, title:'테스트님에게 보내는 선물💍', end_at:'', advent_day:3},
                    //     {advent_id:5, received:false, title:'테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트', end_at:'2022-05-25', advent_day:1},
                    //     {advent_id:6, received:true, title:'test test test test test test test test test test test test test test', end_at:'2022-04-25', advent_day:3},
                    // ]) // test data
                })
        }        
    }

    useEffect(() => {
        getAdventsStorage()
    }, [userId, currentPage])

    return (
        <div className={ styles.sendboxListWrapper }>
            {
                sendbox === 'loading' 
                ?
                <LoadingSpinner />
                :
                sendbox.length === 0
                ?
                <div className={ styles.empty }>
                    {/* 이 자리에 빈 상자 일러스트 표시를 고려 */}
                    <h3 data-aos="zoom-in-up">
                        아직 보낸 선물이 없어요 . . 😗
                    </h3>
                    <Button 
                        color='twitter' 
                        animated 
                        href='/write'
                    >
                        <Button.Content visible>
                            <Icon name='gift' color='yellow'/>선물하러 가기!
                        </Button.Content>
                        <Button.Content hidden>
                            <Icon name='arrow right' />Go!
                        </Button.Content>
                    </Button>
                </div>
                :
                <Grid columns={2} doubling>
                    {
                        sendbox.map((item:any) => 
                            <Column key={item.advent_id}>
                                <Row width={8} style={{ height: '100%' }}>
                                    <SendboxListItem item={item} userId={userId} getAdventsStorage={getAdventsStorage} />
                                </Row> 
                            </Column>)
                    }
                </Grid>
            }
            
            {/* 페이지네이션 */}
            {    
            totalPages ?
                <Pagination 
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage} 
                    totalPages={totalPages}
                />
                :
                <></>
            }
        </div>
    )
}