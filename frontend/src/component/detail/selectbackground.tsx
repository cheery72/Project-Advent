import { useRouter } from "next/router";
import React, { SetStateAction, useEffect, useState } from "react";
import styles from "../../../styles/detail/selectbackground.module.css"
import { HexColorPicker } from "react-colorful";

export default function Selectbackground () {
    const router = useRouter();
    const [backgroundImage, setBackgroundImage] = useState('')
    const [imageType, setImageType] = useState(1)

    const selectImage = (e:any) => {
        setBackgroundImage(e.target.currentSrc)
    }

    const deleteImage = (e:any) => {
        setBackgroundImage('')
    }

    // 배경선택 
    const selectImageType = (num: SetStateAction<number>) => {
        setImageType(num)
    }


    // 배경 이미지 업로드
    const saveImage = (e:any) => {
        if(e.target.files.length !== 0){
        setBackgroundImage(URL.createObjectURL(e.target.files[0]))};
    };

    const deleteBackgroundImageupload = () => {
        URL.revokeObjectURL(backgroundImage);
        setBackgroundImage('');
    }

    // Cololrpicker
    const [color, setColor] = useState("#ffffff");

    return (
        <>
            <div>
            <div className={styles.selectimage}>
                <div className={styles.selecttitle}>내가 선택한 배경</div>
                <img src={backgroundImage} onClick={deleteImage}></img>
            </div>
            <div className={styles.imagetitle}>
                <div onClick={()=>{selectImageType(1)}} className={imageType===1?styles.selecttab:styles.tabhead }>내 이미지 찾기</div>
                <div onClick={()=>{selectImageType(2)}} className={imageType===2?styles.selecttab:styles.tabhead }>기존 이미지 선택</div>
                <div onClick={()=>{selectImageType(3)}} className={imageType===3?styles.selecttab:styles.tabhead }>색상 선택</div>
                <div onClick={()=>{selectImageType(4)}} className={imageType===4?styles.selecttab:styles.tabhead }>이미지 검색</div>
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
                    <button className={styles.deletebutton} onClick={() => deleteBackgroundImageupload()}>
                        삭제
                    </button>
                    </div>
                </div>
            :
            ''}

            {imageType===2?
                    
            <div>
                <div className={styles.backgroundtitle}>
                # 전통무늬
                </div>
                <div className={styles.backgroundcontent}>
                
                </div>
                <div className={styles.backgroundtitle}>
                # 선물상자
                </div>
                <div className={styles.backgroundcontent}>

                </div>
                <div className={styles.backgroundtitle}>
                # 반복패턴 
                </div>
                <div className={styles.backgroundcontent}>
                <img src='/backgroundsample/background.jpg' onClick={selectImage}></img>
                <img src='/backgroundsample/background1.jpg' onClick={selectImage}></img>
                <img src='/backgroundsample/background2.jpg' onClick={selectImage}></img>
                <img src='/backgroundsample/background3.jpg' onClick={selectImage}></img>
                </div>
            </div>
        :
        ''}
        {imageType===3?
            <>
            <div>
            <span className={styles.colorvalue} style={{ borderLeftColor: color }}>
                내가 선택한 색상 : {color}
            </span>
            </div>
            <div className={styles.colorpicker}>
            <HexColorPicker color={color} onChange={setColor} />
            </div>
            </>
        :
        ''}
        {imageType===4?
        <>
        <div>
            upsplash 이미지 들어올 곳 !!!
        </div>
        </>
        :
        ''}
            </div>
        </>
    );
}