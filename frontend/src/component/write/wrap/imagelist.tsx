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
                console.log(data)
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
                <div className={styles.backgroundtitle} style={{ backgroundColor: pattern==1?"#FFFF8C":"" }} onClick={() => {setPattern(1)}}>
                    # 동물
                </div>
                <div className={styles.backgroundcontent} hidden={pattern != 1}>
                    {imageListInfo.animal?imageListInfo.animal.map((imageURL: string) => {
                        return(
                            <Image src={imageURL} alt="" wrapped onClick={selectImage}/>
                        );
                    }):""}
                </div>
                <div className={styles.backgroundtitle} style={{ backgroundColor: pattern==2?"#FFFF8C":"" }}  onClick={() => {setPattern(2)}}>
                    # 동물2
                </div>
                <div className={styles.backgroundcontent} hidden={pattern != 2}>
                    {imageListInfo.animalWrap?imageListInfo.animalWrap.map((imageURL: string) => {
                        return(
                            <Image src={imageURL} alt="" wrapped onClick={selectImage}/>
                        );
                    }):""}
                </div>
                <div className={styles.backgroundtitle} style={{ backgroundColor: pattern==3?"#FFFF8C":"" }}  onClick={() => {setPattern(3)}}>
                    # 생일
                </div>
                <div className={styles.backgroundcontent} hidden={pattern != 3}>
                    {imageListInfo.birthday?imageListInfo.birthday.map((imageURL: string) => {
                        return(
                            <Image src={imageURL} alt="" wrapped onClick={selectImage}/>
                        );
                    }):""}
                </div>
                <div className={styles.backgroundtitle} style={{ backgroundColor: pattern==4?"#FFFF8C":"" }}  onClick={() => {setPattern(4)}}>
                    # 꽃
                </div>
                <div className={styles.backgroundcontent} hidden={pattern != 4}>
                    {imageListInfo.flower?imageListInfo.flower.map((imageURL: string) => {
                        return(
                            <Image src={imageURL} alt="" wrapped onClick={selectImage}/>
                        );
                    }):""}
                </div>
                <div className={styles.backgroundtitle} style={{ backgroundColor: pattern==5?"#FFFF8C":"" }}  onClick={() => {setPattern(5)}}>
                    # 그라데이션
                </div>
                <div className={styles.backgroundcontent} hidden={pattern != 5}>
                    {imageListInfo.gradation?imageListInfo.gradation.map((imageURL: string) => {
                        return(
                            <Image src={imageURL} alt="" wrapped onClick={selectImage}/>
                        );
                    }):""}
                </div>
                <div className={styles.backgroundtitle} style={{ backgroundColor: pattern==6?"#FFFF8C":"" }}  onClick={() => {setPattern(6)}}>
                    # 하트
                </div>
                <div className={styles.backgroundcontent} hidden={pattern != 6}>
                    {imageListInfo.heart?imageListInfo.heart.map((imageURL: string) => {
                        return(
                            <Image src={imageURL} alt="" wrapped onClick={selectImage}/>
                        );
                    }):""}
                </div>
                <div className={styles.backgroundtitle} style={{ backgroundColor: pattern==7?"#FFFF8C":"" }}  onClick={() => {setPattern(7)}}>
                    # 전통무늬
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