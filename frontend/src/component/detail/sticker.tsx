import React, { useState } from 'react'
import styles from "../../../styles/detail/sticker.module.css"


export default function Sticker ({setStickers}:any) {
    const[stickerIndex, setStickerIndex] = useState(0);
    // 스티커
    const selectSticker = (e:any) => {
        setStickers(e.target.currentSrc);
    }

    // 스티커 카테고리
    const stickerCategory:any = [
        ['a_alphabet1', 28], ['a_alphabet2', 28], ['a_alphabet3', 28], ['a_alphabet4', 26], 
        ['b_catchword', 40], ['c_number', 20], ['d_day', 35], ['e_birthday', 32], 
        ['f_love', 40], ['f_love2', 24], ['g_food', 40], ['h_animal', 20],
        ['h_animal2', 25], ['i_nature', 44], ['j_home', 20], ['k_study', 40]
    ]

    const StickerList:any = (category:any) => {
        const result = []
        for (let i = 1; i <= category[1]; i++) {
            result.push(
                <img 
                    key = {category[0]+i}
                    src={`/sticker/${category[0]}/${i}.png`} 
                    alt='스티커' 
                    onClick={selectSticker}
                />
            )
        }
        return result
    }



    return(
        <div>
            <div className={styles.tabs}>
                <div className={styles.tablist}>
                    <div className={stickerIndex===0?styles.selecttab:styles.tabhead} style={{ backgroundColor: stickerIndex==0?"#FFFF8C":"" }}  onClick={()=>{setStickerIndex(0)}}>
                        <img src='/stickercategory/alphabet.png' alt="stickercategoryimg"></img>
                    </div>
                    <div className={stickerIndex===1?styles.selecttab:styles.tabhead} style={{ backgroundColor: stickerIndex==1?"#FFFF8C":"" }} onClick={()=>{setStickerIndex(1)}}>
                        <img src='/stickercategory/alphabet2.png' alt="stickercategoryimg"></img>
                    </div>
                    <div className={stickerIndex===2?styles.selecttab:styles.tabhead} style={{ backgroundColor: stickerIndex==2?"#FFFF8C":"" }} onClick={()=>{setStickerIndex(2)}}>
                        <img src='/stickercategory/alphabet3.png' alt="stickercategoryimg"></img>
                    </div>
                    <div className={stickerIndex===3?styles.selecttab:styles.tabhead} style={{ backgroundColor: stickerIndex==3?"#FFFF8C":"" }} onClick={()=>{setStickerIndex(3)}}>
                        <img src='/stickercategory/alphabet4.png' alt="stickercategoryimg"></img>
                    </div>
                    <div className={stickerIndex===4?styles.selecttab:styles.tabhead} style={{ backgroundColor: stickerIndex==4?"#FFFF8C":"" }} onClick={()=>{setStickerIndex(4)}}>
                        <img src='/stickercategory/catchword.png' alt="stickercategoryimg"></img>
                    </div>
                    <div className={stickerIndex===5?styles.selecttab:styles.tabhead} style={{ backgroundColor: stickerIndex==5?"#FFFF8C":"" }} onClick={()=>{setStickerIndex(5)}}>
                        <img src='/stickercategory/number2.png' alt="stickercategoryimg"></img>
                    </div>
                    <div className={stickerIndex===6?styles.selecttab:styles.tabhead} style={{ backgroundColor: stickerIndex==6?"#FFFF8C":"" }} onClick={()=>{setStickerIndex(6)}}>
                        <img src='/stickercategory/day.png' alt="stickercategoryimg"></img>
                    </div>
                    <div className={stickerIndex===7?styles.selecttab:styles.tabhead} style={{ backgroundColor: stickerIndex==7?"#FFFF8C":"" }} onClick={()=>{setStickerIndex(7)}}>
                        <img src='/stickercategory/birthday.png' alt="stickercategoryimg"></img>
                    </div>
                </div>
                <div className={styles.tablist}>
                    <div className={stickerIndex===8?styles.selecttab:styles.tabhead} style={{ backgroundColor: stickerIndex==8?"#FFFF8C":"" }} onClick={()=>{setStickerIndex(8)}}>
                        <img src='/stickercategory/love.png' alt="stickercategoryimg"></img>
                    </div>
                    <div className={stickerIndex===9?styles.selecttab:styles.tabhead} style={{ backgroundColor: stickerIndex==9?"#FFFF8C":"" }} onClick={()=>{setStickerIndex(9)}}>
                        <img src='/stickercategory/love2.png' alt="stickercategoryimg"></img>
                    </div>
                    <div className={stickerIndex===10?styles.selecttab:styles.tabhead} style={{ backgroundColor: stickerIndex==10?"#FFFF8C":"" }} onClick={()=>{setStickerIndex(10)}}>
                        <img src='/stickercategory/food.png' alt="stickercategoryimg"></img>
                    </div>
                    <div className={stickerIndex===11?styles.selecttab:styles.tabhead} style={{ backgroundColor: stickerIndex==11?"#FFFF8C":"" }} onClick={()=>{setStickerIndex(11)}}>
                        <img src='/stickercategory/animal.png' alt="stickercategoryimg"></img>
                    </div>
                    <div className={stickerIndex===12?styles.selecttab:styles.tabhead} style={{ backgroundColor: stickerIndex==12?"#FFFF8C":"" }} onClick={()=>{setStickerIndex(12)}}>
                        <img src='/stickercategory/animal2.png' alt="stickercategoryimg"></img>
                    </div>
                    <div className={stickerIndex===13?styles.selecttab:styles.tabhead} style={{ backgroundColor: stickerIndex==13?"#FFFF8C":"" }} onClick={()=>{setStickerIndex(13)}}>
                        <img src='/stickercategory/nature4.png' alt="stickercategoryimg"></img>
                    </div>
                    <div className={stickerIndex===14?styles.selecttab:styles.tabhead} style={{ backgroundColor: stickerIndex==14?"#FFFF8C":"" }} onClick={()=>{setStickerIndex(14)}}>
                        <img src='/stickercategory/home.png' alt="stickercategoryimg"></img>
                    </div>
                    <div className={stickerIndex===15?styles.selecttab:styles.tabhead} style={{ backgroundColor: stickerIndex==15?"#FFFF8C":"" }} onClick={()=>{setStickerIndex(15)}}>
                        <img src='/stickercategory/study.png' alt="stickercategoryimg"></img>
                    </div>
                </div>

            {
                stickerCategory.map((category:any, index:number) => {
                    return(
                        <div className={styles.tabcontent} hidden={stickerIndex != index} key={`${category}-${index}`}>
                        {    
                            StickerList(category)
                        }
                        </div>
                    )
                })
            }
            </div>
        </div>
    )
}
