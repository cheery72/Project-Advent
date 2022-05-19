import React, { SetStateAction, useState } from "react";
import styles from "../../../styles/detail/selectbackground.module.css"
import { HexColorPicker } from "react-colorful";

export default function Selectbackground ({setBackgroundColor, setBackImage, backgroundcolor}:any) {

    const [backgroundImage, setBackgroundImage] = useState('')
    const [imageType, setImageType] = useState(0)
    const[index, setIndex] = useState(0);

    const selectImage = (e:any) => {
        setBackImage(e.target.currentSrc);
    }

    // tab
    const selectImageType = (num: SetStateAction<number>) => {
        setImageType(num)
    }


    // 배경 이미지 업로드
    const saveImage = (e:any) => {
        if(e.target.files.length !== 0){
            setBackgroundColor('')
            setBackImage(URL.createObjectURL(e.target.files[0]))};
    };

    const deleteBackgroundImageupload = () => {
        URL.revokeObjectURL(backgroundImage);
        setBackImage('');
    }

    // Cololrpicker 배경선택 
    const selectbackgroundcolor = (updatedcolor:any) => {
        setBackImage('')
        setBackgroundColor(updatedcolor)
    }

    // 기본 이미지
    const backgroundCategory:any = [
        ['animal', 24], ['birthday', 28], ['flower', 40], ['gradation',20], ['heart',24], ['tradition', 24]
    ]

    const backgroundList:any = (category:any) => {
        const result = []
        for (let i = 1; i <= category[1]; i++) {
            result.push(
                <img
                    key = {category[0]+i}
                    src={`/background/${category[0]}/${i}.png`}
                    alt='배경'
                    onClick={selectImage}
                />
            )
        }
        return result
    }





    return (
        <>
            <div>
            <div className={styles.imagetitle}>
            <div onClick={()=>{selectImageType(0)}} className={imageType===0?styles.selecttab:styles.tabhead }>기존 이미지 선택</div>
                <div onClick={()=>{selectImageType(1)}} className={imageType===1?styles.selecttab:styles.tabhead }>내 이미지 찾기</div>
                <div onClick={()=>{selectImageType(2)}} className={imageType===2?styles.selecttab:styles.tabhead }>색상 선택</div>
            </div>
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
                    </div>
                    <div className={styles.imageupload}>
                    <button className={styles.deletebutton} onClick={() => deleteBackgroundImageupload()}>
                        삭제
                    </button>
                    </div>
                </div>
            :
            ''}

            {imageType===0?
                    
            <div className={styles.tabs}> 
                <div className={styles.tablist}>
                    <div className={index===0?styles.selecttab:styles.tabhead} style={{ backgroundColor: index==0?"#FFFF8C":"" }}  onClick={()=>{setIndex(0)}}>
                        <img src='/wrapcategory/animal.png' alt="stickercategoryimg"></img>
                    </div>
                    <div className={index===1?styles.selecttab:styles.tabhead} style={{ backgroundColor: index==1?"#FFFF8C":"" }} onClick={()=>{setIndex(1)}}>
                        <img src='/wrapcategory/birthday.png' alt="stickercategoryimg"></img>
                    </div>
                    <div className={index===2?styles.selecttab:styles.tabhead} style={{ backgroundColor: index==2?"#FFFF8C":"" }} onClick={()=>{setIndex(2)}}>
                        <img src='/wrapcategory/nature4.png' alt="stickercategoryimg"></img>
                    </div>
                    <div className={index===3?styles.selecttab:styles.tabhead} style={{ backgroundColor: index==3?"#FFFF8C":"" }} onClick={()=>{setIndex(3)}}>
                        <img src='/wrapcategory/brush.png' alt="stickercategoryimg"></img>
                    </div>
                    <div className={index===4?styles.selecttab:styles.tabhead} style={{ backgroundColor: index==4?"#FFFF8C":"" }} onClick={()=>{setIndex(4)}}>
                        <img src='/wrapcategory/love2.png' alt="stickercategoryimg"></img>
                    </div>
                    <div className={index===5?styles.selecttab:styles.tabhead} style={{ backgroundColor: index==5?"#FFFF8C":"" }} onClick={()=>{setIndex(5)}}>
                        <img src='/wrapcategory/luckybag.png' alt="stickercategoryimg"></img>
                    </div>
                </div>

                {
                    backgroundCategory.map((category:any, backgroundindex:number) => {
                        return(
                            <div className={styles.tabcontent} hidden={index != backgroundindex} key={`${category}-${backgroundindex}`}>
                                {
                                    backgroundList(category)
                                }
                            </div>
                        )
                    })
                }
            </div>
        :
        ''}
        {imageType===2?
            <>
            <div>
            <span className={styles.colorvalue} style={{ borderLeftColor: backgroundcolor }}>
                내가 선택한 색상 : {backgroundcolor}
            </span>
            </div>
            <div className={styles.colorpicker}>
            <HexColorPicker color={backgroundcolor} onChange={selectbackgroundcolor} />
            </div>
            </>
        :
        ''}
        </div>
        </>
    );
}