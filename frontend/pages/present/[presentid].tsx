import { SetStateAction, useState } from "react";
import { Button, Grid, Header, Icon, Input, Popup } from "semantic-ui-react";
import PresentOne from "../../src/component/present/presentone";
import PresentSeven from "../../src/component/present/presentseven";
import PresentThree from "../../src/component/present/presentthree";
import styles from "../../styles/present/present.module.css"

export default function Present(){

    const [password, setPassword] = useState('')
    const [isHint, setIsHint] = useState(true)
    const [openPresent, setOpenPresent] =useState(true)
    const [day, setDay] = useState(3)

    const {Row, Column} = Grid

    const writePassword = (e: { target: { value: SetStateAction<string>; }; }) => {
        setPassword(e.target.value)
    }

    const submitPassword = () => {
        setPassword('')
        const inputText: any = document.getElementsByName('inputtext')[0]
        inputText['value'] = ''
        console.log(`제출된 비밀번호: ${password}`)
    }

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
                                <Header as="h5" className={ styles.inline }>힌트입니다.</Header>&nbsp;
                                <Popup content="힌트입니다." trigger={<Icon name='question circle' className={ styles.pointer }/>}/>
                            </Row>
                        </>
                    :''}
                    <Row>
                        <Column textAlign="center">
                            <Input type="password" name="inputtext" onChange={writePassword}/>
                            <Button color="blue" onClick={submitPassword}>입력</Button>
                        </Column>
                    </Row>
                </Grid>  
            </>
            :''}
            
            {openPresent?
                day === 1?
                    <PresentOne />
                :day === 3?
                    <PresentThree />
                :day === 7?
                    <PresentSeven />
                :""
            :''}
        </>
    );
}