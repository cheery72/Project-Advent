import { Button, Grid, Icon } from "semantic-ui-react";
import SendboxListItem from "./sendboxListItem";
import styles from '../../../styles/sendbox/sendboxList.module.css'
import { useEffect, useState } from "react";
import allAxios from "../../lib/allAxios";
import LoadingSpinner from "../loadingSpinner";
import Pagination from "./pagination"

const { Row, Column } = Grid

export default function sendboxList({ userId, username }:any){
    const [sendbox, setSendbox] = useState<any>('loading')
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)

    const getAdventsStorage = async () => {
        if (userId) {
            allAxios.get(`/advents/${userId}/storages?page=${currentPage-1}`)
                .then((response) =>{
                    setSendbox(response.data.content)
                    setTotalPages(response.data.total_pages)
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
                                    <SendboxListItem item={item} userId={userId} username={username} getAdventsStorage={getAdventsStorage} />
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