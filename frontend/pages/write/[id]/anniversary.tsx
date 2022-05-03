import Head from "next/head";
import { useRouter } from "next/router";
import { SetStateAction, useEffect, useState } from "react";
import { Button, Grid, Header, Icon, Popup } from "semantic-ui-react";
import notify from "../../../src/component/notify/notify";
import allAxios from "../../../src/lib/allAxios";
import userAxios from "../../../src/lib/userAxios";
import styles from "../../../styles/write/anniversary.module.css"

export default function Anniversary(){

    const router = useRouter()
    const adventId = router.query.id
    const { Row, Column } = Grid

    const today = new Date()
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const date = today.getDate();
    const totalDay = new Date(year, month, 0).getDate()

    const [anniversary, setAnniversary] = useState('')
    const [adventDay, setAdventDay] = useState(1)
    const [isHint, setIsHint] = useState(false)
    const [hint, setHint] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const [userInfo, setUserInfo]: any = useState([])

    const writeAnniversary = (e: any) => {
        if (Number(e.target.value.slice(0, 4)) < year){
            e.target.value=""
            notify('error', `올해부터 등록해주세요!`)
            return
        }
        if (Number(e.target.value.slice(5, 7)) < month){
            e.target.value=""
            notify('error', `이번달부터 등록해주세요!`)
            return
        }
        if (Number(e.target.value.slice(5, 7)) === month && Number(e.target.value.slice(8, 10)) < date+adventDay){
            e.target.value=""
            notify('error', `${adventDay}일 어드벤트 캘린더는 ${adventDay}일 이후로 등록할 수 있습니다.`)
            return
        }
        if (Number(e.target.value.slice(5, 7)) === month+1 && (date+adventDay) > totalDay && Number(e.target.value.slice(8, 10)) < (date+adventDay)%totalDay){
            e.target.value=""
            notify('error', `${adventDay}일 어드벤트 캘린더는 ${adventDay}일 이후로 등록할 수 있습니다.`)
            return
        } 
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
            notify('error', `기념일을 설정해주세요!`)
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
        if (Number(anniversary.slice(5, 7)) === month && Number(anniversary.slice(8, 10)) < date+adventDay){
            notify('error', `${adventDay}일 어드벤트 캘린더는 ${adventDay}일 이후로 등록할 수 있습니다.`)
            return
        }
        if (Number(anniversary.slice(5, 7)) === month+1 && (date+adventDay) > totalDay && Number(anniversary.slice(8, 10)) < (date+adventDay)%totalDay){
            notify('error', `${adventDay}일 어드벤트 캘린더는 ${adventDay}일 이후로 등록할 수 있습니다.`)
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
            advent_id: adventId,
            end_at: anniversary,
            password: password,
            password_hint: hint,
            password_val: password2,
            user_id: userInfo.id
        }
        await allAxios
            .patch(`/advents/days`, body)
            .then(() => {
                notify('success', `📅🎁어드벤트 캘린더가 완성되었습니다.`)
                router.push(`/sendbox`)
            })
            .catch((e) => {
                console.log(e)
            })
    }

    const getDay = async () => {
        await allAxios
            .get(`/advents/${adventId}/days`, {
                params: {
                    adventId: adventId
                }
            })
            .then(({ data }) => {
                setAdventDay(data.day)
            })
            .catch((e) => {
                console.log(e)
            })
    }

    useEffect(() => {
        getUserInfo()
    }, [])

    useEffect(() => {
        if (adventId) {
            getDay()
        }
    }, [adventId])

    return(
        <>
            <Head>
                <title>기념일 설정 | Make Our Special</title>
            </Head>
            <Grid 
                centered 
                stackable
                data-aos="zoom-out" data-aos-duration="2000"
            >
                <Row />
                <Row>
                    <Column textAlign="center">
                        <Header 
                            as="h1" 
                            className={ styles.inline }
                        >
                            <span><Icon name="calendar check outline" /></span>
                            <span className={ styles.title1 }> 기념일 </span>
                            &nbsp;<span className={ styles.title2}> 설정 </span>&nbsp;
                        </Header>
                        <Popup 
                            content="아래의 달력아이콘을 눌러서 기념일을 설정할 수 있습니다. (필수)" 
                            trigger={<Icon 
                                name='question circle' 
                                color='teal' 
                                className={ styles.pointer }/>}
                        />
                    </Column>  
                </Row>

                <Row>
                    <Column textAlign="center">
                        {/* <Input type="date" onChange={writeAnniversary} /> */}
                        <input 
                            type="date" 
                            onChange={writeAnniversary} 
                            className={ `${styles.datepicker} ${anniversary?styles.formValid:''}` }
                        />
                    </Column>
                </Row>

                <Row />

                <Row>
                    <Column textAlign="center">
                        
                        <Header
                            as="h1" 
                            className={ styles.inline }
                        >
                            <span><Icon name="shield alternate" /></span>
                            <span className={ styles.title3 }> 비밀번호 </span>&nbsp;
                            <span className={ styles.title2}> 설정 </span>&nbsp;
                            </Header>
                        <Popup 
                            content="힌트설정을 눌러 힌트 여부를 선택하여 입력할 수 있습니다." 
                            trigger={<Icon 
                                name='question circle' 
                                color='teal' 
                                className={ styles.pointer }/>}
                        />
                    </Column> 
                </Row>

                <Row>
                    <Column textAlign="center">
                        <Header 
                            as="h3" 
                            className={`${styles.pointer} ${styles.title4}` } 
                            onClick={isHints}>
                                <Icon 
                                    name='tag' 
                                    className={isHint?styles.hint:styles.hintNone}
                                />&nbsp;힌트 설정
                        </Header>
                    </Column> 
                </Row>
                {isHint?
                    <>
                        <Row>
                            {/* <Column textAlign="center" width={4}> */}
                                <form>
                                    <textarea 
                                        onChange={writeHint} 
                                        className={`${styles.textarea} ${hint?styles.formValid:''}`}
                                        cols={25} 
                                        rows={3} 
                                        placeholder="힌트를 작성해주세요."
                                    />
                                </form>
                                {/* <Form>
                                    <TextArea onChange={writeHint} rows={3} maxlength={50} className={styles.textarea} placeholder="힌트를 작성해주세요!"/>
                                </Form> */}
                            {/* </Column> */}
                        </Row>
                    </>
                :<></>}

                <Row>
                    <Column textAlign="center">
                        <Header 
                            as="h3" 
                            className={styles.title4}
                        >
                            <Icon 
                                name='lock' 
                                className={password.length>7?styles.valid:password.length>3?styles.semivalid:styles.invalid}
                            />&nbsp;비밀번호 입력
                        </Header>
                    </Column>  
                </Row>

                <Row>
                    {/* <Column textAlign="center"> */}
                        <div className={ styles.formField }>
                            <input 
                                type="password" 
                                placeholder="비밀번호를 입력해주세요." 
                                className={ styles.formInput } 
                                pattern=".{8,}" 
                                required 
                                onChange={writePassword} 
                            />
                            <span className={ styles.icon }></span>
                        </div>
                        {/* <Input type="password" placeholder="비밀번호를 입력해주세요." onChange={writePassword}/> */}
                    {/* </Column>  */}
                </Row>

                <Row>
                    <Column textAlign="center">
                        <Header 
                            as="h3" 
                            className={styles.title4}
                        >
                            <Icon 
                                name='lock' 
                                className={password===password2 && password2?styles.valid:styles.invalid}
                            />&nbsp;비밀번호 확인
                        </Header>
                    </Column>  
                </Row>

                <Row>
                    {/* <Column textAlign="center"> */}
                    <div className={ styles.formField }>
                        <input 
                            type="password" 
                            placeholder="비밀번호를 확인해주세요." 
                            className={ `${password===password2 && password2?styles.formInputPassCheckValid:styles.formInputPassCheck}` } 
                            required 
                            onChange={checkPassword} 
                        />
                        <span className={ styles.icon }>{password===password2 && password2?'⭕':''}</span>
                    </div>
                        {/* <Input type="password" placeholder="비밀번호를 확인해주세요." onChange={checkPassword}/> */}
                    {/* </Column>   */}
                </Row>
                
                <Row>
                    <Column 
                        textAlign="center"
                    >
                        <Button 
                            animated 
                            color="blue" 
                            onClick={goProfile} 
                            size="large"
                        >
                            <Button.Content visible>작성 완료</Button.Content>
                            <Button.Content hidden>
                                <Icon name="arrow circle right" />
                                <Icon name="gift" color="yellow" />
                            </Button.Content>
                        </Button>
                    </Column>  
                </Row>
            </Grid>
        </>
    );
}