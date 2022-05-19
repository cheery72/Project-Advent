import { SetStateAction, useEffect, useState } from "react";
import { Button, Grid, Header, Icon, Input, Popup } from "semantic-ui-react";
import styles from "../../../styles/write/title.module.css"
import allAxios from "../../lib/allAxios";
import userAxios from "../../lib/userAxios";
import notify from "../notify/notify";

export default function Title({ id, day }: any){

    const [title, setTitle] = useState("")
    const [tempTitle, setTempTitle] = useState('')
    const [openTitle, setOpenTitle] = useState(false)
    const [userInfo, setUserInfo]: any = useState()

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
        if (tempTitle.length < 1  ||  tempTitle.length> 20){
            notify('error', `제목은 1~20 글자수로 작성해야합니다.`)
            return
        }
        saveTitle()
    }

    const enterTitle = (e: { key: string; }) => {
        if (e.key === "Enter") {
            saveTitle()
        }
    }

    const getUserInfo = async () => {
        await userAxios
            .get(`/auth/users`)
            .then(({ data }) => {
                setUserInfo(data.body.user)
            })
            .catch((e) => {
                // console.log(e)
            });
        };

    const saveTitle = async () => {
        const body: any = {
            title: tempTitle
        }
        await allAxios
            .patch(`/advents/${id}/recipients`, body)
            .then(() => {
                notify('success', `👋제목이 저장되었습니다.`)
                setOpenTitle(!openTitle)
                setTitle(tempTitle)
                setTempTitle('')
            })
            .catch((e) => {
                // console.log(e)
            })
    }

    const getAdventInfo = async () => {
        await allAxios
            .get(`/advents/${id}/${userInfo.id}/advent`)
            .then(({ data }) => {
                setTitle(data.title)
            })
            .catch((e) => {
                // console.log(e)
            })
    }

    useEffect(() => {
        if (userInfo) {
            getAdventInfo()
        }
    }, [title, userInfo])

    useEffect(() => {
        getUserInfo()
    }, [])

    return(
        <>
            <Grid centered>
                <Row />
                <Row>
                    <Column />
                    <Column textAlign="center" computer={6} mobile={14} onClick={isOpen} className={ styles.title }>
                        <Header as="h1" className={ styles.inline }><span>&nbsp;{title}&nbsp;</span></Header>&nbsp;
                        <Popup content='클릭하여 선물 제목을 편집할 수 있습니다.' trigger={<Icon name="pencil alternate" color="teal"/>} />
                    </Column>
                    <Column />
                </Row>
                {openTitle?
                <>
                    <Row>
                        <Column textAlign="center">
                            <Input type="text" maxLength={20} onChange={writeTempTitle} onKeyUp={enterTitle}/>
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