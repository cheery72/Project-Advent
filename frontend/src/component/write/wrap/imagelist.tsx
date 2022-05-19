import { useEffect, useState } from "react";
import styles from "../../../../styles/write/wrap.module.css"
import allAxios from "../../../lib/allAxios";

export default function ImageList({ setBackgroundImage, setFileImage }: any){

    const[index, setIndex] = useState(0);
    const [imageListInfo, setImageListInfo]: any = useState([])

    const selectImage = (e: any) => {
        setBackgroundImage(e.target.currentSrc)
        setFileImage()
    }

    const getImageListInfo = async () => {
        await allAxios
            .get(`/images/backgrounds`)
            .then(({ data }) => {
                setImageListInfo(data)
            })
            .catch((e) => {
                // console.log(e)
            })
    }

    useEffect(() => {
        getImageListInfo()
    }, [])

    return(
        
            <div>
                <div className={styles.tabs}> 
                    <div className={styles.tablist}>
                        <div className={index===0?styles.selecttab:styles.tabhead} style={{ backgroundColor: index==0?"#FFFF8C":"" }}  onClick={()=>{setIndex(0)}}>
                            <img src='/wrapcategory/animal.png' alt="stickercategoryimg"></img>
                        </div>
                        <div className={index===1?styles.selecttab:styles.tabhead} style={{ backgroundColor: index==1?"#FFFF8C":"" }}  onClick={()=>{setIndex(1)}}>
                            <img src='/wrapcategory/animal2.png' alt="stickercategoryimg"></img>
                        </div>
                        <div className={index===2?styles.selecttab:styles.tabhead} style={{ backgroundColor: index==2?"#FFFF8C":"" }} onClick={()=>{setIndex(2)}}>
                            <img src='/wrapcategory/birthday.png' alt="stickercategoryimg"></img>
                        </div>
                        <div className={index===3?styles.selecttab:styles.tabhead} style={{ backgroundColor: index==3?"#FFFF8C":"" }} onClick={()=>{setIndex(3)}}>
                            <img src='/wrapcategory/nature4.png' alt="stickercategoryimg"></img>
                        </div>
                        <div className={index===4?styles.selecttab:styles.tabhead} style={{ backgroundColor: index==4?"#FFFF8C":"" }} onClick={()=>{setIndex(4)}}>
                            <img src='/wrapcategory/brush.png' alt="stickercategoryimg"></img>
                        </div>
                        <div className={index===5?styles.selecttab:styles.tabhead} style={{ backgroundColor: index==5?"#FFFF8C":"" }} onClick={()=>{setIndex(5)}}>
                            <img src='/wrapcategory/love2.png' alt="stickercategoryimg"></img>
                        </div>
                        <div className={index===6?styles.selecttab:styles.tabhead} style={{ backgroundColor: index==6?"#FFFF8C":"" }} onClick={()=>{setIndex(6)}}>
                            <img src='/wrapcategory/luckybag.png' alt="stickercategoryimg"></img>
                        </div>
                    </div>
                    <div className={styles.tabcontent} hidden={index != 0}>
                        {imageListInfo.animal?imageListInfo.animal.map((imageURL: string) => {
                        return(
                        <img src={imageURL} key={imageURL} alt="" onClick={selectImage}/>
                        );
                    }):""}
                    </div>
                    <div className={styles.tabcontent} hidden={index != 1}>
                        {imageListInfo.animalWrap?imageListInfo.animalWrap.map((imageURL: string) => {
                        return(
                        <img src={imageURL} key={imageURL} alt="" onClick={selectImage}/>
                        );
                    }):""}
                    </div>
                    <div className={styles.tabcontent} hidden={index != 2}>
                        {imageListInfo.birthday?imageListInfo.birthday.map((imageURL: string) => {
                        return(
                        <img src={imageURL} key={imageURL} alt="" onClick={selectImage}/>
                        );
                    }):""}
                    </div>
                    <div className={styles.tabcontent} hidden={index != 3}>
                        {imageListInfo.flower?imageListInfo.flower.map((imageURL: string) => {
                        return(
                        <img src={imageURL} key={imageURL} alt="" onClick={selectImage}/>
                        );
                    }):""}
                    </div>
                    <div className={styles.tabcontent} hidden={index != 4}>
                        {imageListInfo.gradation?imageListInfo.gradation.map((imageURL: string) => {
                        return(
                        <img src={imageURL} key={imageURL} alt="" onClick={selectImage}/>
                        );
                    }):""}
                    </div>
                    <div className={styles.tabcontent} hidden={index != 5}>
                        {imageListInfo.heart?imageListInfo.heart.map((imageURL: string) => {
                        return(
                        <img src={imageURL} key={imageURL} alt="" onClick={selectImage}/>
                        );
                    }):""}
                    </div>
                    <div className={styles.tabcontent} hidden={index != 6}>
                        {imageListInfo.tradition?imageListInfo.tradition.map((imageURL: string) => {
                        return(
                        <img src={imageURL} key={imageURL} alt="" onClick={selectImage}/>
                        );
                    }):""}
                    </div>
                </div>
            </div>
        );
}