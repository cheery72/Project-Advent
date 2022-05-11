import React, {useState, useEffect} from 'react'
import styles from "../../../styles/detail/sticker.module.css"
import allAxios from "../..//lib/allAxios";
import { Image } from "semantic-ui-react";

export default function Sticker ({pattern, setPattern, setStickers}:any) {
    const[stickerIndex, setStickerIndex] = useState(0);
    // 스티커
    const selectSticker = (e:any) => {
        setStickers(e.target.currentSrc);
    }
    const [imageListInfo, setImageListInfo]: any = useState([])
    const getImageListInfo = async () => {
        await allAxios
            .get(`/images/stickers`)
            .then(({ data }) => {
                setImageListInfo(data)
            })
            .catch((e) => {
                console.log(e)
            })
    }

    useEffect(() => {
        getImageListInfo()
    }, [])



    return(
        <>
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
            </div>
            <div className={styles.tabcontent} hidden={stickerIndex != 0}>
            {imageListInfo.alphabet?imageListInfo.alphabet.map((imageURL: string) => {
                return(
                    <img src={imageURL} key={imageURL} alt="" onClick={selectSticker}/>
                );
            }):""}

            </div>
            <div className={styles.tabcontent} hidden={stickerIndex != 1}>
            {imageListInfo.alphabet2?imageListInfo.alphabet2.map((imageURL: string) => {
                return(
                    <img src={imageURL} key={imageURL} alt=""  onClick={selectSticker}/>
                );
                }):""}
            </div>
            <div className={styles.tabcontent} hidden={stickerIndex != 2}>
            {imageListInfo.alphabet3?imageListInfo.alphabet3.map((imageURL: string) => {
                return(
                    <img src={imageURL} key={imageURL} alt=""  onClick={selectSticker}/>
                );
                }):""}
            </div>
            <div className={styles.tabcontent} hidden={stickerIndex != 3}>
            {imageListInfo.alphabet4?imageListInfo.alphabet4.map((imageURL: string) => {
                return(
                    <img src={imageURL} key={imageURL} alt="" onClick={selectSticker}/>
                );
                }):""}
            </div>
            <div className={styles.tabcontent} hidden={stickerIndex != 4}>
            {imageListInfo.catchword?imageListInfo.catchword.map((imageURL: string) => {
                return(
                    <img src={imageURL} key={imageURL} alt="" onClick={selectSticker}/>
                );
                }):""}
            </div>
            <div className={styles.tabcontent} hidden={stickerIndex != 5}>
            {imageListInfo.number?imageListInfo.number.map((imageURL: string) => {
                return(
                    <img src={imageURL} key={imageURL} alt=""  onClick={selectSticker}/>
                );
                }):""}
            </div>
            <div className={styles.tabcontent} hidden={stickerIndex != 6}>
            {imageListInfo.day?imageListInfo.day.map((imageURL: string) => {
                return(
                    <img src={imageURL} key={imageURL} alt="" onClick={selectSticker}/>
                );
                }):""}
            </div>
            <div className={styles.tabcontent} hidden={stickerIndex != 7}>
            {imageListInfo.birthday?imageListInfo.birthday.map((imageURL: string) => {
                return(
                    <img src={imageURL} key={imageURL} alt="" onClick={selectSticker}/>
                );
                }):""}
            </div>
            <div className={styles.tabcontent} hidden={stickerIndex != 8}>
            {imageListInfo.love?imageListInfo.love.map((imageURL: string) => {
                return(
                    <img src={imageURL} key={imageURL} alt="" onClick={selectSticker}/>
                );
                }):""}
            </div>
            <div className={styles.tabcontent} hidden={stickerIndex != 9}>
            {imageListInfo.love2?imageListInfo.love2.map((imageURL: string) => {
                return(
                    <img src={imageURL} key={imageURL} alt="" onClick={selectSticker}/>
                );
                }):""}
            </div>
            <div className={styles.tabcontent} hidden={stickerIndex != 10}>
            {imageListInfo.food?imageListInfo.food.map((imageURL: string) => {
                return(
                    <img src={imageURL} key={imageURL} alt="" onClick={selectSticker}/>
                );
                }):""}
            </div>
            <div className={styles.tabcontent} hidden={stickerIndex != 11}>
            {imageListInfo.animal?imageListInfo.animal.map((imageURL: string) => {
                return(
                    <img src={imageURL} key={imageURL} alt="" onClick={selectSticker}/>
                );
                }):""}
            </div>
            <div className={styles.tabcontent} hidden={stickerIndex != 12}>
            {imageListInfo.animal2?imageListInfo.animal2.map((imageURL: string) => {
                return(
                    <img src={imageURL} key={imageURL} alt="" onClick={selectSticker}/>
                );
                }):""}
            </div>
            <div className={styles.tabcontent} hidden={stickerIndex != 13}>
            {imageListInfo.nature?imageListInfo.nature.map((imageURL: string) => {
                return(
                    <img src={imageURL} key={imageURL} alt="" onClick={selectSticker}/>
                );
                }):""}
            </div>
            <div className={styles.tabcontent} hidden={stickerIndex != 14}>
            {imageListInfo.home?imageListInfo.home.map((imageURL: string) => {
                return(
                    <img src={imageURL} key={imageURL} alt="" onClick={selectSticker}/>
                );
                }):""}
            </div>
            <div className={styles.tabcontent} hidden={stickerIndex != 15}>
            {imageListInfo.study?imageListInfo.study.map((imageURL: string) => {
                return(
                    <img src={imageURL} key={imageURL} alt="" onClick={selectSticker}/>
                );
                }):""}
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