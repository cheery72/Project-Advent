import axios from "axios";
import { useRouter } from "next/router";
import { SetStateAction, useState } from "react";
import { Button, Grid, Header, Image, Input } from "semantic-ui-react";
import notify from "../../../../src/component/notify/notify";
import styles from "../../../../styles/write/wrap.module.css"

export default function Wrap(){

    const router = useRouter()
    const day = router.query.day
    const wrapid = router.query.wrapid

    const { Row, Column } = Grid

    const [backgroundImage, setBackgroundImage] = useState('')
    const [imageType, setImageType] = useState(1)
    const [pattern, setPattern] = useState(1)
    const [searchWord, setSearchWord] = useState('')

    const selectImage = (e: { target: { currentSrc: SetStateAction<string>; }; }) => {
        setBackgroundImage(e.target.currentSrc)
    }

    const deleteImage = () => {
        setBackgroundImage('')
    }

    // 배경선택 
    const selectImageType = (num: SetStateAction<number>) => {
        setImageType(num)
    }

    // 배경 이미지 업로드
    const saveImage = (e:any) => {
        if(e.target.files.length !== 0){
        setBackgroundImage(URL.createObjectURL(e.target.files[0]))};
    };

    const deleteBackgroundImageupload = () => {
        URL.revokeObjectURL(backgroundImage);
        setBackgroundImage('');
    }

    const writeWrap = () => {
        notify('success', `👋${wrapid}번 포장지가 변경되었습니다.`)
        router.push({ pathname: '/write/testid', query: { day: `${day}` }})
    }

    const closeWrap = () => {
        router.push({ pathname: '/write/testid', query: { day: `${day}` }})
    }

    const writeSearchWord = (e: { target: { value: SetStateAction<string>; }; }) => {
        setSearchWord(e.target.value)
    }

    return(
        <>
            <Grid centered stackable>
                <Row>
                    <Column textAlign="center" className={styles.selectimage}>
                        <div className={styles.selecttitle}>내가 선택한 배경</div>
                    </Column>
                </Row>

                <Row>
                    <Column width={3}/>
                    <Column textAlign="center" width={10}>
                        <Image src={backgroundImage} alt="" wrapped onClick={deleteImage} size="small" />
                    </Column>
                    <Column width={2} textAlign="center">
                        <Button color="blue" inverted className={ styles.button } onClick={()=>{ writeWrap()}}>저장</Button>
                        <br /><br />
                        <Button inverted className={ styles.button } onClick={()=>{ closeWrap()}}>취소</Button>
                    </Column>
                    <Column width={1}/>
                </Row>
            
                <Row>
                    <Column>
                        <div className={styles.imagetitle}>
                            <div onClick={()=>{selectImageType(1)}} className={imageType===1?styles.selecttab:styles.tabhead }>이미지 찾기</div>
                            <div onClick={()=>{selectImageType(2)}} className={imageType===2?styles.selecttab:styles.tabhead }>기존 이미지 선택</div>
                            <div onClick={()=>{selectImageType(3)}} className={imageType===3?styles.selecttab:styles.tabhead }>이미지 검색</div>
                        </div>
                    </Column>
                </Row>
           
                <Row>
                    <Column textAlign="center">
                        {imageType===1?
                            <div>
                                <div className={styles.imageupload}>
                                    <label className={styles.filebutton} htmlFor="background">이미지 업로드</label>
                                    <input
                                        id="background"
                                        type="file"
                                        accept="image/gif, image/jpeg, image/png"
                                        style={{ display: "none" }}
                                        onChange={saveImage}
                                    />
                                    <button className={styles.deletebutton} onClick={() => deleteBackgroundImageupload()}>
                                        삭제
                                    </button>
                                </div>
                            </div>
                        :
                        ''}

                        {imageType===2?
                            <div>
                                <div className={styles.backgroundtitle} style={{ backgroundColor: pattern==1?"yellow":"" }} onClick={() => {setPattern(1)}}>
                                    # 전통무늬
                                </div>
                                <div className={styles.backgroundcontent} hidden={pattern != 1}>
                                
                                </div>
                                <div className={styles.backgroundtitle} style={{ backgroundColor: pattern==2?"yellow":"" }}  onClick={() => {setPattern(2)}}>
                                    # 선물상자
                                </div>
                                <div className={styles.backgroundcontent} hidden={pattern != 2}>

                                </div>
                                <div className={styles.backgroundtitle} style={{ backgroundColor: pattern==3?"yellow":"" }}  onClick={() => {setPattern(3)}}>
                                    # 반복패턴 
                                </div>
                                <div className={styles.backgroundcontent} hidden={pattern != 3}>
                                    <Image src='/backgroundsample/background.jpg' alt="" wrapped onClick={selectImage}/>
                                    <Image src='/backgroundsample/background1.jpg' alt="" wrapped onClick={selectImage}/>
                                    <Image src='/backgroundsample/background2.jpg' alt="" wrapped onClick={selectImage}/>
                                    <Image src='/backgroundsample/background3.jpg' alt="" wrapped onClick={selectImage}/>
                                </div>
                                <div className={styles.backgroundtitle} style={{ backgroundColor: pattern==4?"yellow":"" }}  onClick={() => {setPattern(4)}}>
                                    # 색상선택
                                </div>
                                <div className={styles.backgroundcontent} hidden={pattern != 4}>

                                </div>
                            </div>
                        :
                        ''}

                        {imageType===3?
                            <>
                                <div>
                                    <Header as="h5">검색할 단어를 입력하세요!</Header>
                                    <Input type="text" placeholder="단어로 입력해주세요" maxLength={10} onChange={writeSearchWord}/>
                                    <Button color="blue" inverted>검색</Button>
                                </div>
                                <div className={styles.backgroundcontent}>   
                                    
                                </div>       
                            </>
                        :
                        ''}

                    </Column>
                </Row>
            </Grid>
        </>
    );
}