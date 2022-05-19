import { useRouter } from "next/router";
import { SetStateAction, useEffect, useState } from "react";
import { Grid, Header, Icon, Popup } from "semantic-ui-react";
import notify from "../notify/notify";
import allAxios from "../../lib/allAxios";
import styles from "../../../styles/present/password.module.css"

export default function PresentComponent(){

    const router = useRouter()
    const presentUrl = router.query.presenturl

    const [hint, setHint] = useState('')
    const [password, setPassword] = useState('')
    const [openPresent, setOpenPresent] = useState(true)


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

    const goPresent = (data:any) => {
        router.push(
            { pathname:`/present/${presentUrl}/content`, query: {data: JSON.stringify(data)} }, // query로 props를 넘김(JSON data를 문자열로)
            `/present/${presentUrl}/content`, // 보여줄 url (query.data url에서 보여지지 않도록 처리)
        )
    }

    const getAdventInfo = async () => {
        await allAxios
            .get(`/advents/${presentUrl}`)
            .then(({ data }) => {
                goPresent(data)
                
            })
            .catch((e) => {
                // console.log(e)
                notify('error', '선물 정보를 로딩하는데 에러가 발생했습니다.')
                router.push('/404')
            })
    }

    const loadIsPassword = async () => {
        await allAxios
            .get(`/advents/${presentUrl}/hints`)
            .then(({ data }) => {
                if (data.password === false){
                    getAdventInfo()

                } else {
                    setHint(data.password_hint)
                    setOpenPresent(false)
                    
                }
            })
            .catch((e) => {
                // console.log(e)
                notify('error', '선물 정보를 로딩하는데 에러가 발생했습니다.')
                router.push('/404')
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
                goPresent(data)
                
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
            <div className={styles.marginTop} data-aos="zoom-in">
                <Grid centered stackable>
                    <Row>
                        <Column textAlign="center">
                            <Header as="h1" className={ styles.inline }>
                                <span className={ styles.title1 }>선물 비밀번호</span>를 <span className={ styles.title2 }>입력하세요!</span>
                            </Header>&nbsp;
                            <Popup content="비밀번호를 맞춰야 선물을 확인할 수 있습니다." trigger={<Icon name='question circle' color='teal' className={ styles.pointer }/>}/>
                        </Column>
                    </Row>
                    {hint?
                        <>
                            <Row>
                                <Header as="h4" className={ styles.inline }>힌트: { hint }</Header>&nbsp;
                                <Popup content="비밀번호 힌트입니다." trigger={<Icon name='question circle' color='teal' className={ styles.pointer }/>}/>
                            </Row>
                        </>
                    :''}
                    <Row>
                        <Column textAlign="center">
                            <div className={ styles.formField }>
                                <input 
                                    type="password" 
                                    placeholder="비밀번호를 입력해주세요." 
                                    className={password ? styles.formInputIsActive:styles.formInput}
                                    required 
                                    onChange={writePassword} 
                                    onKeyUp={enterPassword}
                                    name="inputtext"
                                />
                            <button className={ styles.btn } onClick={submitPassword}>입력</button>
                            </div>
                        </Column>
                    </Row>
                </Grid>  
            </div>
            :''}
        </>
    );
}