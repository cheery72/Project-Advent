import { Input, Icon, Button } from "semantic-ui-react";
import React from 'react';
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "../../../styles/detail/decorativeframe.module.css"
import Selectbackground from "./selectbackground"

export default function Decorativeframe () {
    const router = useRouter();
    const[index, setIndex] = useState(0);
    const [image, setImage] = useState('')
    const [pattern, setPattern] = useState(1)
    
    // 배경선택 

    // 스티커
    const [sticker, setSticker] = useState('')
    const selectSticker = (e:any) => {
        setSticker(e.target.currentSrc)
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
    const createText = (e:any) => {
        setText(e.target.value);
      };


    return (
        <>
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
            <Selectbackground></Selectbackground>
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
                <img src='/stickersample/sample1.png' onClick={selectSticker}></img>
                <img src='/stickersample/sample1.png' onClick={selectSticker}></img>
                <img src='/stickersample/sample2.png' onClick={selectSticker}></img>
                <img src='/stickersample/sample3.png' onClick={selectSticker}></img>
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
                    {image && (
                    <img
                        alt="img"
                        src={image}
                        style={{height:100}}
                    />
                    )}
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
                <div>
                작성내용 : {text}
                </div>
                <div className={styles.inputtextbox}>
                    <textarea value={text} placeholder="내용을 입력해 주세요" onChange={createText} className={styles.contentbox}></textarea>
                </div>
                <div>
                    <button className={styles.filebutton} >
                        입력
                    </button>
                    <button className={styles.deletebutton} >
                        삭제
                    </button>
                </div>
            </div>
        </>
    );
}