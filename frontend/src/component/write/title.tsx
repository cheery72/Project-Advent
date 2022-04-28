import axios from "axios";
import { SetStateAction, useEffect, useState } from "react";
import { Button, Grid, Header, Icon, Input, Popup } from "semantic-ui-react";
import styles from "../../../styles/write/title.module.css"
import allAxios from "../../lib/allAxios";
import notify from "../notify/notify";

export default function Title({ id, day }: any){

    const [title, setTitle] = useState("")
    const [tempTitle, setTempTitle] = useState('')
    const [openTitle, setOpenTitle] = useState(false)

    const { Row, Column } = Grid

    const isOpen = () => {
        setOpenTitle(!openTitle)
        if (openTitle){
            setTempTitle('')
        }
    }

    const writeTempTitle = (e: { target: { value: SetStateAction<string>; }; }) => {
        setTempTitle(e.target.value)
    }

    const writeTitle = () => {
        if (tempTitle.length < 1  ||  tempTitle.length> 12){
            notify('error', `제목은 1~12 글자수로 작성해야합니다.`)
            return
        }
        saveTitle()
    }

    const saveTitle = () => {
        const body: any = {
            advent_id: id,
            title: tempTitle
        }
        allAxios
            .patch(`/advents/recipients`, body)
            .then((data) => {
                console.log(data)
                notify('success', `👋제목이 저장되었습니다.`)
                setOpenTitle(!openTitle)
                setTitle(tempTitle)
                setTempTitle('')
            })
            .catch((e) => {
                console.log(e)
            })
    }

    const getAdventInfo = () => {
        allAxios
            .get(`/advents/${id}/advent`)
            .then(({ data }) => {
                setTitle(data.title)
            })
            .catch((e) => {
                console.log(e)
            })
    }

    useEffect(() => {
        getAdventInfo()
    }, [title])

    return(
        <>
            <Grid centered>
                <Row />
                <Row>
                    <Column />
                    <Column textAlign="center" width={6} onClick={isOpen} className={ styles.title }>
                        <Header as="h1" className={ styles.inline }>{title}</Header>&nbsp;
                        <Popup content='제목을 편집할 수 있습니다.' trigger={<Icon name="pencil alternate"/>} />
                    </Column>
                    <Column />
                </Row>
                {openTitle?
                <>
                    <Row>
                        <Column textAlign="center">
                            <Input type="text" maxLength={12} onChange={writeTempTitle}/>
                            <Button color="blue" onClick={writeTitle}>저장</Button>
                            <Button onClick={isOpen}>취소</Button>
                        </Column>
                    </Row>
                </>
                :''}
            </Grid>

        </>
    );
}