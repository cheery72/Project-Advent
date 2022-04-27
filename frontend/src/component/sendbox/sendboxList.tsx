import { Grid, Icon } from "semantic-ui-react";
import SendboxListItem from "./sendboxListItem";
import styles from '../../../styles/sendbox/sendboxList.module.css'
import { useEffect, useState } from "react";
import allAxios from "../../lib/allAxios";

const { Row, Column } = Grid

export default function sendboxList({userId}:any){
    const [sendbox, setSendbox] = useState<any>('loading')
    console.log(sendbox)

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
                <Icon loading name='spinner' />
                :
                sendbox.length === 0
                ?
                <p>보낸 선물이 없어요...</p>
                :
                <Grid columns={2} doubling>
                    {
                        sendbox.map((item:any) => 
                            <Column key={item.advent_id}>
                                <Row width={8}>
                                    <SendboxListItem item={item} />
                                </Row> 
                            </Column>)
                    }
                </Grid>
            }
        </div>
    )
}