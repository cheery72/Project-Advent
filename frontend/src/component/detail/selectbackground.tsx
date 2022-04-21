import { Input, Icon, Button, StepGroup } from "semantic-ui-react";
import React from 'react';
import { useRouter } from "next/router";
import { SetStateAction, useEffect, useState } from "react";
import styles from "../../../styles/detail/selectbackground.module.css"


export default function Selectbackground () {
    const router = useRouter();
    const [image, setImage] = useState('')

    const selectImage = (e:any) => {
        setImage(e.target.currentSrc)
    }

    const deleteImage = (e:any) => {
        setImage('')
    }


    // 배경선택 

    return (
        <>
            <div className={styles.selectimage}>
                <div className={styles.selecttitle}>내가 선택한 배경</div>
                <img src={image} onClick={deleteImage}></img>
            </div>
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

        </>
    );
}