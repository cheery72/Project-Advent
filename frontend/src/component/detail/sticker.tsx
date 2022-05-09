import React, {useState, useEffect} from 'react'
import styles from "../../../styles/detail/sticker.module.css"

export default function Sticker ({pattern, setPattern, stickers, setStickers}:any) {
    
    // 스티커
    const selectSticker = (e:any) => {
        setStickers(e.target.currentSrc);
    }

    return(
        <>
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
        </>
    )
}