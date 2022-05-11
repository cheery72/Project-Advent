import { useEffect, useState } from "react";
import { Image } from "semantic-ui-react";
import styles from "../../../../styles/write/wrap.module.css"
import allAxios from "../../../lib/allAxios";

export default function ImageList({ setBackgroundImage, setFileImage }: any){

    const [pattern, setPattern] = useState(0)
    const [imageListInfo, setImageListInfo]: any = useState([])

    const selectImage = (e: { target: { currentSrc: any; }; }) => {
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
                console.log(e)
            })
    }

    useEffect(() => {
        getImageListInfo()
    }, [])

    return(
        
            <div>
                <span className={styles.backgroundtitle} style={{ backgroundColor: pattern==1?"#FFFF8C":"" }} onClick={() => {setPattern(1)}}>
                    <img src='/wrapcategory/animal.png' alt="stickercategoryimg" width={30} height={30}/>
                </span>
                &nbsp;
                <span className={styles.backgroundtitle} style={{ backgroundColor: pattern==2?"#FFFF8C":"" }}  onClick={() => {setPattern(2)}}>
                    <img src='/wrapcategory/animal2.png' alt="stickercategoryimg" width={30} height={30}/>
                </span>
                &nbsp;
                <span className={styles.backgroundtitle} style={{ backgroundColor: pattern==3?"#FFFF8C":"" }}  onClick={() => {setPattern(3)}}>
                    <img src='/wrapcategory/birthday.png' alt="stickercategoryimg" width={30} height={30}/>
                </span>
                &nbsp;
                <span className={styles.backgroundtitle} style={{ backgroundColor: pattern==4?"#FFFF8C":"" }}  onClick={() => {setPattern(4)}}>
                    <img src='/wrapcategory/nature4.png' alt="stickercategoryimg" width={30} height={30}/>
                </span>
                &nbsp;
                <span className={styles.backgroundtitle} style={{ backgroundColor: pattern==5?"#FFFF8C":"" }}  onClick={() => {setPattern(5)}}>
                    <img src='/wrapcategory/brush.png' alt="stickercategoryimg" width={30} height={30}/>
                </span>
                &nbsp;
                <span className={styles.backgroundtitle} style={{ backgroundColor: pattern==6?"#FFFF8C":"" }}  onClick={() => {setPattern(6)}}>
                    <img src='/wrapcategory/love2.png' alt="stickercategoryimg" width={30} height={30}/>
                </span>
                &nbsp;
                <span className={styles.backgroundtitle} style={{ backgroundColor: pattern==7?"#FFFF8C":"" }}  onClick={() => {setPattern(7)}}>
                    <img src='/wrapcategory/luckybag.png' alt="stickercategoryimg" width={30} height={30}/>
                </span>

                <div className={styles.backgroundcontent} hidden={pattern != 1}>
                    {imageListInfo.animal?imageListInfo.animal.map((imageURL: string) => {
                        return(
                            <Image src={imageURL} alt="" wrapped onClick={selectImage}/>
                        );
                    }):""}
                </div>

                <div className={styles.backgroundcontent} hidden={pattern != 2}>
                    {imageListInfo.animalWrap?imageListInfo.animalWrap.map((imageURL: string) => {
                        return(
                            <Image src={imageURL} alt="" wrapped onClick={selectImage}/>
                        );
                    }):""}
                </div>
                
                <div className={styles.backgroundcontent} hidden={pattern != 3}>
                    {imageListInfo.birthday?imageListInfo.birthday.map((imageURL: string) => {
                        return(
                            <Image src={imageURL} alt="" wrapped onClick={selectImage}/>
                        );
                    }):""}
                </div>
                
                <div className={styles.backgroundcontent} hidden={pattern != 4}>
                    {imageListInfo.flower?imageListInfo.flower.map((imageURL: string) => {
                        return(
                            <Image src={imageURL} alt="" wrapped onClick={selectImage}/>
                        );
                    }):""}
                </div>
                
                <div className={styles.backgroundcontent} hidden={pattern != 5}>
                    {imageListInfo.gradation?imageListInfo.gradation.map((imageURL: string) => {
                        return(
                            <Image src={imageURL} alt="" wrapped onClick={selectImage}/>
                        );
                    }):""}
                </div>
                
                <div className={styles.backgroundcontent} hidden={pattern != 6}>
                    {imageListInfo.heart?imageListInfo.heart.map((imageURL: string) => {
                        return(
                            <Image src={imageURL} alt="" wrapped onClick={selectImage}/>
                        );
                    }):""}
                </div>
                
                <div className={styles.backgroundcontent} hidden={pattern != 7}>
                    {imageListInfo.tradition?imageListInfo.tradition.map((imageURL: string) => {
                        return(
                            <Image src={imageURL} alt="" wrapped onClick={selectImage}/>
                        );
                    }):""}
                </div>
            </div>
        );
}