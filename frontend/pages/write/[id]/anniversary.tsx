import { useRouter } from "next/router";
import { SetStateAction, useEffect, useState } from "react";
import { Button, Form, Grid, Header, Icon, Input, Popup, TextArea } from "semantic-ui-react";
import notify from "../../../src/component/notify/notify";
import allAxios from "../../../src/lib/allAxios";
import userAxios from "../../../src/lib/userAxios";
import styles from "../../../styles/write/anniversary.module.css"

export default function Anniversary(){

    const router = useRouter()
    const advent_id = router.query.id
    const { Row, Column } = Grid

    const today = new Date()
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const date = today.getDate();

    const [anniversary, setAnniversary] = useState('')
    const [adventDay, setAdventDay] = useState(1)
    const [isHint, setIsHint] = useState(false)
    const [hint, setHint] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const [userInfo, setUserInfo]: any = useState([])

    const writeAnniversary = (e: { target: { value: SetStateAction<string>; }; }) => {
        setAnniversary(e.target.value)
    }

    const isHints = () => {
        setIsHint(!isHint)
    }

    const writeHint = (e: { target: { value: SetStateAction<string>; }; }) => {
        setHint(e.target.value)
    }
    
    const writePassword = (e: { target: { value: SetStateAction<string>; }; }) => {
        setPassword(e.target.value)
    }

    const checkPassword = (e: { target: { value: SetStateAction<string>; }; }) => {
        setPassword2(e.target.value)
    }
    
    const goProfile = () => {
        if (!anniversary){
            notify('error', `기념일을 등록해주세요!`)
            return
        }
        if (Number(anniversary.slice(0, 4)) < year){
            notify('error', `올해부터 등록해주세요!`)
            return
        }
        if (Number(anniversary.slice(5, 7)) < month){
            notify('error', `이번달부터 등록해주세요!`)
            return
        }
        if (isHint && !hint){
            notify('error', `힌트를 작성해주세요!`)
            return
        }
        if (password !== password2 || !password2){
            notify('error', `비밀번호가 일치하지 않습니다.`)
            return
        }
        saveAnniversary()
    }

    const getUserInfo = async () => {
        await userAxios
            .get(`/auth/users`)
            .then(({ data }) => {
                setUserInfo(data.body.user)
            })
            .catch((e) => {
                console.log(e)
            });
        };

    const saveAnniversary = async () => {
        const body = {
            advent_id: advent_id,
            end_at: anniversary,
            password: password,
            password_hint: hint,
            password_val: password2,
            user_id: userInfo.id
        }
        await allAxios
            .patch(`/advents/days`, body)
            .then((data) => {
                notify('success', `👋어드벤트 캘린더가 완성되었습니다.`)
                router.push(`/sendbox`)
            })
            .catch((e) => {
                console.log(e)
            })
    }

    useEffect(() => {
        getUserInfo()
    }, [])

    return(
        <>
            <Grid centered stackable>
                <Row />
                <Row>
                    <Column textAlign="center">
                        <Header as="h1" className={ styles.inline }>기념일 설정</Header>
                        <Popup content="달력아이콘을 눌러서 D-day를 선택할 수 있습니다." trigger={<Icon name='question circle' className={ styles.pointer }/>}/>
                    </Column>  
                </Row>

                <Row>
                    <Column textAlign="center">
                        <Input type="date" onChange={writeAnniversary}/>
                    </Column>
                </Row>

                <Row>
                    <Column textAlign="center">
                        <Header as="h1" className={ styles.inline }>비밀번호 설정</Header>
                        <Popup content="힌트설정을 눌러 힌트여부를 선택할 수 있습니다." trigger={<Icon name='question circle' className={ styles.pointer }/>}/>
                    </Column> 
                </Row>

                <Row>
                    <Column textAlign="center">
                        <Header as="h3" className={ styles.pointer } onClick={isHints}><Icon name='tag' className={isHint?styles.hint:''}/>&nbsp;힌트 설정</Header>
                    </Column> 
                </Row>
                {isHint?
                    <>
                        <Row>
                            <Column textAlign="center" width={4}>
                                <Form>
                                    <TextArea onChange={writeHint} rows={3} maxlength={50} className={styles.textarea} placeholder="힌트를 작성해주세요!"/>
                                </Form>
                                
                            </Column>
                        </Row>
                    </>
                :''}

                <Row>
                    <Column textAlign="center">
                        <Header as="h3"><Icon name='lock' className={password.length>7?styles.valid:password.length>3?styles.semivalid:styles.invalid}/>&nbsp;비밀번호 입력</Header>
                    </Column>  
                </Row>

                <Row>
                    <Column textAlign="center">
                        <Input type="password" onChange={writePassword}/>
                    </Column> 
                </Row>

                <Row>
                    <Column textAlign="center">
                        <Header as="h3"><Icon name='lock' className={password===password2 && password2?styles.valid:styles.invalid}/>&nbsp;비밀번호 확인</Header>
                    </Column>  
                </Row>

                <Row>
                    <Column textAlign="center">
                        <Input type="password" onChange={checkPassword}/>
                    </Column>  
                </Row>
                
                <Row>
                    <Column textAlign="center">
                        <Button color="blue" onClick={goProfile}>작성 완료</Button>
                    </Column>  
                </Row>
            </Grid>
        </>
    );
}