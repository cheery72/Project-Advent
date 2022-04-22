import { Image } from "semantic-ui-react";
import React from 'react';
import { useRouter } from "next/router";
import { SetStateAction, useEffect, useState } from "react";
import styles from "../../../styles/detail/selectbackground.module.css"



export default function Selectbackground () {
    const router = useRouter();
    const [image, setImage] = useState('')
    const [imageType, setImageType] = useState(1)
    const [myImage, setMyImage] = useState()
    const wrapid = router.query.wrapid

    const selectImage = (e:any) => {
        setImage(e.target.currentSrc)
    }

    const deleteImage = (e:any) => {
        setImage('')
    }
    const findImage = (e: any) => {
        setMyImage(e.target.value)
    }

    useEffect(()=>{
        console.log('입력받은 이미지', myImage)
    }, [myImage])



    // 배경선택 
    const selectImageType = (num: SetStateAction<number>) => {
        setImageType(num)
    }


    return (
        <>
            <div>
            <div className={styles.selectimage}>
                <div className={styles.selecttitle}>내가 선택한 배경</div>
                <img src={image} onClick={deleteImage}></img>
                {/* <div className={styles.selecttitle}>{wrapid}번 포장지를 선택하세요.</div> */}
            </div>
            <div className={styles.imagetitle}>
                <div onClick={()=>{selectImageType(1)}} className={imageType===1?styles.selected:styles.pointer }>이미지 찾기</div>
                <div onClick={()=>{selectImageType(2)}} className={imageType===2?styles.selected:styles.pointer }>기존 이미지 선택</div>
            </div>
            {imageType===1?
                            <input id="myimage" type="file" onChange={findImage}/>
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
            <div className={styles.backgroundtitle}>
            # 색상선택
            </div>
            {/* <div className={styles.color_picker_panel}>
                <div className={styles.panel_row}>
                    <div className={styles.defailt_swatches}></div>
                    <button className={styles.button_eyedropper}>Get Color</button>
                </div>
                <div className={styles.panel_row}>
                    <div className={styles.spectrum_map}>
                        <button id="spectrum_cursor" className={styles.color_cursor}>
                        </button>
                    
                    <canvas id="spectrum_canvas"></canvas>
                    </div>
                    <div className={styles.hue_map}>
                        <button id="hue_cursor" className={styles.color_cursor}></button>
                        <canvas id="hue_canvas"></canvas>
                    </div>
                </div>
                <div className={styles.panel_row}>
                    <div id="rgb_fields" className={styles.field_group}></div>

                </div>
            </div> */}
            </div>
            
        :
        ''}
            </div>
        </>
    );
}