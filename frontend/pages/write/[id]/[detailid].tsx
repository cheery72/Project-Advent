import { Grid, Button, Icon, Checkbox } from "semantic-ui-react";
import React, {useState, useEffect} from 'react'
import { useRouter } from "next/router";

import styles from "../../../styles/detail/detail.module.css"
import Selectbackground from "../../../src/component/detail/selectbackground"
import { HexColorPicker } from "react-colorful";

export default function Detail(){
    const router = useRouter();
    const day = router.query.day
    const {Row, Column} = Grid

    //decorativeframe
    const[index, setIndex] = useState(0);
    const [image, setImage] = useState('')
    const [pattern, setPattern] = useState(1)

    // 배경선택
    const [backgroundColor, setBackgroundColor] = useState('');
    const [backImage, setBackImage] = useState('');

    // 스티커
    const [stickers, setStickers] = useState('')
    const selectSticker = (e:any) => {
        setStickers(e.target.currentSrc);
    }

    // 이미지 업로드
    const saveImage = (e:any) => {
        setImage('');
        if(e.target.files.length !== 0){
        setImage(URL.createObjectURL(e.target.files[0]))};
    };

    const deleteImage = () => {
        URL.revokeObjectURL(image);
        setImage('');
    }

    // 텍스트 입력
    const [text, setText] = useState('');
    const [color, setColor] = useState("#000000");
    const createText = (e:any) => {
        setText(e.target.value);
        };

    // 텍스트 굵기
    const [fontweight, setFontweight]:any = React.useState('normal')
    
    // 텍스트 사이즈
    const [fontsize, setFontsize]:any = useState(30)
    
    function changefontsize(e:any){
        setFontsize(e.target.value)
    }

    // 초기화 버튼
    const resetbutton = () => {
        setText('');
        setColor("#000000");
    }

return(
    <>
        <div className={styles.total}>
        <div className={styles.presentdetailhead}>
            D-7
        </div>
        <Grid stackable>
        <Row>
            <Column width={4}></Column>
            <Column width={8}>
            <div className={styles.boxlocation}>
            <div className={styles.box} style={{ background:backgroundColor, backgroundImage:`url(${backImage})`, backgroundSize:'cover'}}>
                <div style={{position:'absolute', cursor:'grab'}} draggable>
                    {stickers && (
                            <img
                                alt="sticker"
                                src={stickers}
                                style={{height:100, maxWidth:100}}
                            />
                    )}
                </div>
                <div className={styles.box_image}>
                {image && (
                    <img
                        alt="imguploadfile"
                        src={image}
                        style={{height:150, maxWidth:300}}
                    />
                    )}
                </div>
                <div className={styles.box_text} style={{color:color, fontWeight:fontweight, fontSize:`${fontsize}px`, lineHeight:'100%'}}>
                    {text}
                </div>
                
            </div>
            </div>
            </Column>
            <Column width={4}>
                <div className={styles.buttonbetween}>
                    <Button inverted color='blue' onClick={() => {router.push({ pathname: `/write/testid` });}}>&nbsp;&nbsp;&nbsp;&nbsp;저&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;장&nbsp;&nbsp;&nbsp;&nbsp;</Button>
                </div>
                <div className={styles.cancelbutton}>    
                    <Button inverted color='blue' onClick={() => {router.push({ pathname: `/write/testid` });}}>&nbsp;&nbsp;&nbsp;&nbsp;취&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;소&nbsp;&nbsp;&nbsp;&nbsp;</Button>  
                </div>             
            </Column>
        </Row>
        </Grid>
        <div className={styles.listbetween}>
            <div className={styles.tabs}>
                <div className={styles.tablist}>
                    <div className={index===0?styles.selecttab:styles.tabhead} onClick={()=>{setIndex(0)}}>
                        <Icon name='file outline'/>배경선택
                    </div>
                    <div className={index===1?styles.selecttab:styles.tabhead} onClick={()=>{setIndex(1)}}>
                        <Icon name='smile outline'/>스티커
                    </div>
                    <div className={index===2?styles.selecttab:styles.tabhead} onClick={()=>{setIndex(2)}}>
                        <Icon name='upload'/>이미지업로드
                    </div>
                    <div className={index===3?styles.selecttab:styles.tabhead} onClick={()=>{setIndex(3)}}>
                        <Icon name='pencil alternate'/>텍스트 입력
                    </div>
                </div>
            </div>
            <div className={styles.tabcontent} hidden={index != 0}>
            <Selectbackground setBackgroundColor={setBackgroundColor} setBackImage={setBackImage}></Selectbackground>
            </div>
            <div className={styles.tabcontent} hidden={index != 1}>
            <div>
                <div className={styles.backgroundtitle} style={{ backgroundColor: pattern==1?"#FFFF8C":"" }} onClick={() => {setPattern(1)}}>
                # 알파벳
                </div>
                <div className={styles.backgroundcontent} hidden={pattern != 1}>
                
                </div>
                <div className={styles.backgroundtitle} style={{ backgroundColor: pattern==2?"#FFFF8C":"" }}  onClick={() => {setPattern(2)}}>
                # 축하
                </div>
                <div className={styles.backgroundcontent} hidden={pattern != 2}>

                </div>
                <div className={styles.backgroundtitle} style={{ backgroundColor: pattern==3?"#FFFF8C":"" }}  onClick={() => {setPattern(3)}}>
                # 하트 
                </div>
                <div className={styles.backgroundcontent} hidden={pattern != 3}>
                <img src='/stickersample/sample1.png' onClick={selectSticker} alt="stickerimg"></img>
                <img src='/stickersample/sample2.png' onClick={selectSticker} alt="stickerimg"></img>
                <img src='/stickersample/sample3.png' onClick={selectSticker} alt="stickerimg"></img>
                <img src='/stickersample/sample4.png' onClick={selectSticker} alt="stickerimg"></img>
                </div>
                <div className={styles.backgroundtitle} style={{ backgroundColor: pattern==4?"#FFFF8C":"" }}  onClick={() => {setPattern(4)}}>
                # 숫자
                </div>
                <div className={styles.backgroundcontent} hidden={pattern != 4}>

                </div>
            </div>
            </div>
            <div className={styles.tabcontent} hidden={index != 2}>
                <div>
                    <div className={styles.imageupload}>
                    <label className={styles.filebutton} htmlFor="file">이미지 업로드</label>
                    <input
                        id="file"
                        type="file"
                        accept="image/gif, image/jpeg, image/png"
                        style={{ display: "none" }}
                        onChange={saveImage}
                    />
                    <button className={styles.deletebutton} onClick={() => deleteImage()}>
                        삭제
                    </button>
                    </div>
                </div>
            </div>
            <div className={styles.tabcontent} hidden={index != 3}>
                <div className={styles.inputtextbox}>
                    <textarea  id="textarea" style={{color:color}} value={text} placeholder="내용을 입력해 주세요" onChange={createText} className={styles.contentbox}></textarea>
                    {/* onKeyUp={onChange} , height: textareaheight*/}
                </div>
                <div className={styles.fontweight}>                    
                    글자 굵기 : &nbsp;&nbsp;
                    <Checkbox
                    radio
                    label = '보통'
                    name = 'checkboxRadioGroup'
                    value='normal'
                    checked={fontweight === 'normal'}
                    onChange={(e, data) => setFontweight(data.value)}
                    ></Checkbox>&nbsp;&nbsp;&nbsp;&nbsp;
                    <Checkbox
                    radio
                    label = '굵게'
                    name = 'checkboxRadioGroup'
                    value='bolder'
                    checked={fontweight === 'bolder'}
                    onChange={(e, data) => setFontweight(data.value)}
                    ></Checkbox>
                </div>
                <div className={styles.fontsize}>                    
                    글자 크기 : &nbsp;&nbsp;
                    <input
                        type='range'
                        min={10}
                        max={100}
                        value={fontsize}
                        onChange={changefontsize}
                        />
                </div>
                <div className={styles.changetextcolor}>
                    현재 선택된 글자색      
                    <div style={{background:color, width:"15px", height:"15px", marginLeft:"5px"}}></div>
                </div>
                <div className={styles.rgbacolorpicker}>
                    <HexColorPicker color={color} onChange={setColor} />
                </div>
                <div>
                    <button className={styles.deletebutton} onClick={() => resetbutton()}>
                        초기화
                    </button>
                </div>
            </div>
        
        </div>
        </div>
    </>
);
}