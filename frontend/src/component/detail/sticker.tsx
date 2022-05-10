import React, {useState, useEffect} from 'react'
import styles from "../../../styles/detail/sticker.module.css"
import {Icon} from "semantic-ui-react";

export default function Sticker ({pattern, setPattern, setStickers}:any) {
    const[stickerIndex, setStickerIndex] = useState(0);
    // 스티커
    const selectSticker = (e:any) => {
        setStickers(e.target.currentSrc);
    }

    return(
        <>
        <div>
            <div className={styles.tabs}>
                <div className={styles.tablist}>
                    <div className={stickerIndex===0?styles.selecttab:styles.tabhead} onClick={()=>{setStickerIndex(0)}}>
                        <img src='/stickercategory/alphabet.png' alt="stickercategoryimg"></img>
                    </div>
                    <div className={stickerIndex===1?styles.selecttab:styles.tabhead} onClick={()=>{setStickerIndex(1)}}>
                        <img src='/stickercategory/alphabet2.png' alt="stickercategoryimg"></img>
                    </div>
                    <div className={stickerIndex===2?styles.selecttab:styles.tabhead} onClick={()=>{setStickerIndex(2)}}>
                        <img src='/stickercategory/alphabet3.png' alt="stickercategoryimg"></img>
                    </div>
                    <div className={stickerIndex===3?styles.selecttab:styles.tabhead} onClick={()=>{setStickerIndex(3)}}>
                        <img src='/stickercategory/alphabet4.png' alt="stickercategoryimg"></img>
                    </div>
                    <div className={stickerIndex===4?styles.selecttab:styles.tabhead} onClick={()=>{setStickerIndex(4)}}>
                        <img src='/stickercategory/catchword.png' alt="stickercategoryimg"></img>
                    </div>
                    <div className={stickerIndex===5?styles.selecttab:styles.tabhead} onClick={()=>{setStickerIndex(5)}}>
                        <img src='/stickercategory/number2.png' alt="stickercategoryimg"></img>
                    </div>
                    <div className={stickerIndex===6?styles.selecttab:styles.tabhead} onClick={()=>{setStickerIndex(6)}}>
                        <img src='/stickercategory/day.png' alt="stickercategoryimg"></img>
                    </div>
                    <div className={stickerIndex===7?styles.selecttab:styles.tabhead} onClick={()=>{setStickerIndex(7)}}>
                        <img src='/stickercategory/birthday.png' alt="stickercategoryimg"></img>
                    </div>
                </div>
                <div className={styles.tablist}>
                    <div className={stickerIndex===8?styles.selecttab:styles.tabhead} onClick={()=>{setStickerIndex(8)}}>
                        <img src='/stickercategory/love.png' alt="stickercategoryimg"></img>
                    </div>
                    <div className={stickerIndex===9?styles.selecttab:styles.tabhead} onClick={()=>{setStickerIndex(9)}}>
                        <img src='/stickercategory/love2.png' alt="stickercategoryimg"></img>
                    </div>
                    <div className={stickerIndex===10?styles.selecttab:styles.tabhead} onClick={()=>{setStickerIndex(10)}}>
                        <img src='/stickercategory/food.png' alt="stickercategoryimg"></img>
                    </div>
                    <div className={stickerIndex===11?styles.selecttab:styles.tabhead} onClick={()=>{setStickerIndex(11)}}>
                        <img src='/stickercategory/animal.png' alt="stickercategoryimg"></img>
                    </div>
                    <div className={stickerIndex===12?styles.selecttab:styles.tabhead} onClick={()=>{setStickerIndex(12)}}>
                        <img src='/stickercategory/animal2.png' alt="stickercategoryimg"></img>
                    </div>
                    <div className={stickerIndex===13?styles.selecttab:styles.tabhead} onClick={()=>{setStickerIndex(13)}}>
                        <img src='/stickercategory/nature4.png' alt="stickercategoryimg"></img>
                    </div>
                    <div className={stickerIndex===14?styles.selecttab:styles.tabhead} onClick={()=>{setStickerIndex(14)}}>
                        <img src='/stickercategory/home.png' alt="stickercategoryimg"></img>
                    </div>
                    <div className={stickerIndex===15?styles.selecttab:styles.tabhead} onClick={()=>{setStickerIndex(15)}}>
                        <img src='/stickercategory/study.png' alt="stickercategoryimg"></img>
                    </div>
                </div>
            </div>
            <div className={styles.tabcontent} hidden={stickerIndex != 0}>
            <img src='/stickersample/sample1.png' onClick={selectSticker} alt="stickerimg"></img>
            <img src='/stickersample/sample2.png' onClick={selectSticker} alt="stickerimg"></img>
            <img src='/stickersample/sample3.png' onClick={selectSticker} alt="stickerimg"></img>
            <img src='/stickersample/sample4.png' onClick={selectSticker} alt="stickerimg"></img>
            </div>
            <div className={styles.tabcontent} hidden={stickerIndex != 1}>
            
            </div>
            <div className={styles.tabcontent} hidden={stickerIndex != 2}>
            
            </div>
            <div className={styles.tabcontent} hidden={stickerIndex != 3}>
            
            </div>
            <div className={styles.tabcontent} hidden={stickerIndex != 4}>
            
            </div>
            <div className={styles.tabcontent} hidden={stickerIndex != 5}>
            
            </div>
            <div className={styles.tabcontent} hidden={stickerIndex != 6}>
            
            </div>
            <div className={styles.tabcontent} hidden={stickerIndex != 7}>
            
            </div>
            <div className={styles.tabcontent} hidden={stickerIndex != 8}>
            
            </div>
            <div className={styles.tabcontent} hidden={stickerIndex != 9}>
            
            </div>
            <div className={styles.tabcontent} hidden={stickerIndex != 10}>
            
            </div>
            <div className={styles.tabcontent} hidden={stickerIndex != 11}>
            
            </div>
            <div className={styles.tabcontent} hidden={stickerIndex != 12}>
            
            </div>
            <div className={styles.tabcontent} hidden={stickerIndex != 13}>
            
            </div>
            <div className={styles.tabcontent} hidden={stickerIndex != 3}>
            
            </div>
            <div className={styles.tabcontent} hidden={stickerIndex != 3}>
            
            </div>







            {/* <div className={styles.backgroundtitle} style={{ backgroundColor: pattern==1?"#FFFF8C":"" }} onClick={() => {setPattern(1)}}>
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

            </div> */}
        </div>
        </>
    )
}