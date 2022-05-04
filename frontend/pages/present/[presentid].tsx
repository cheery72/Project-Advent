import { useRouter } from "next/router";
import { SetStateAction, useEffect, useState } from "react";
import { Button, Grid, Header, Icon, Input, Popup } from "semantic-ui-react";
import notify from "../../src/component/notify/notify";
import PresentOne from "../../src/component/present/presentone";
import PresentSeven from "../../src/component/present/presentseven";
import PresentThree from "../../src/component/present/presentthree";
import allAxios from "../../src/lib/allAxios";
import styles from "../../styles/present/present.module.css"

export default function Present(){

    const router = useRouter()
    const presentUrl = router.query.presentid

    const [isHint, setIsHint] = useState(false)
    const [hint, setHint] = useState('')
    const [password, setPassword] = useState('')
    const [openPresent, setOpenPresent] =useState(false)
    const [adventDay, setAdventDay] = useState(0)

    const {Row, Column} = Grid

    const writePassword = (e: { target: { value: SetStateAction<string>; }; }) => {
        setPassword(e.target.value)
    }

    const enterPassword = (e: { code: string; }) => {
        if (e.code === 'Enter') {
            submitPassword()
        }
    }

    const submitPassword = () => {
        checkPassword()
        setPassword('')
        const inputText: any = document.getElementsByName('inputtext')[0]
        inputText['value'] = ''
    }

    const loadIsPassword = async () => {
        await allAxios
            .get(`/advents/${presentUrl}/hints`)
            .then(({ data }) => {
                if (data.password === false){
                    setOpenPresent(true)
                    setAdventDay(data.day)
                } else {
                    setIsHint(true)
                    setHint(data.password_hint)
                }
            })
            .catch((e) => {
                console.log(e)
            })
    }

    const checkPassword = async () => {
        const body = {
            password: password,
            url: presentUrl
        }
        await allAxios
            .post(`/advents/auths`, body)
            .then(({ data }) => {
                setOpenPresent(true)
                setAdventDay(data.day)
            })
            .catch(() => {
                notify('error', `잘못된 비밀번호 입니다.`)
            })
    }

    useEffect(() => {
        if (presentUrl) {
            loadIsPassword()
        }
    }, [presentUrl])

    return(
        <>
            {!openPresent?
            <>
                <Grid centered stackable>
                    <Row />
                    <Row>
                        <Column textAlign="center">
                            <Header as="h3" className={ styles.inline }>선물 비밀번호를 입력하세요!</Header>&nbsp;
                            <Popup content="비밀번호를 맞춰야 선물을 확인할 수 있습니다." trigger={<Icon name='question circle' className={ styles.pointer }/>}/>
                        </Column>
                    </Row>
                    {isHint?
                        <>
                            <Row>
                                <Header as="h5" className={ styles.inline }>{ hint }</Header>&nbsp;
                                <Popup content="힌트입니다." trigger={<Icon name='question circle' className={ styles.pointer }/>}/>
                            </Row>
                        </>
                    :''}
                    <Row>
                        <Column textAlign="center">
                            <Input type="password" name="inputtext" onChange={writePassword} onKeyUp={enterPassword}/>
                            <Button color="blue" onClick={submitPassword}>입력</Button>
                        </Column>
                    </Row>
                </Grid>  
            </>
            :''}
            
            {openPresent?
                adventDay === 1?
                    <PresentOne />
                :adventDay === 3?
                    <PresentThree />
                :adventDay === 7?
                    <PresentSeven />
                :""
            :''}
        </>
    );
}