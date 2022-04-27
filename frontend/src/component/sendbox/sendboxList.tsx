import { Button, Grid, Icon } from "semantic-ui-react";
import SendboxListItem from "./sendboxListItem";
import styles from '../../../styles/sendbox/sendboxList.module.css'
import { useEffect, useState } from "react";
import allAxios from "../../lib/allAxios";
import LoadingSpinner from "../loadingSpinner";

const { Row, Column } = Grid

                            // item 타입 어떻게 설정해야할지 모르겠음(TS)
export default function sendboxList({userId}:any){
    const [sendbox, setSendbox] = useState<any>('loading')
    // console.log(sendbox)

    const getAdventsStorage = async () => {
        const response = await allAxios.get(`/advents/${userId}/storages`)
            .then((response) =>{
                setSendbox(response.data.content)
            })
        
    }

    useEffect(() => {
        getAdventsStorage()
    }, [userId])

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
                    <h3>
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
        </div>
    )
}