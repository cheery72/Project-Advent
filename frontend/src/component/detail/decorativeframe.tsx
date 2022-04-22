import { Input, Icon, Button } from "semantic-ui-react";
import React from 'react';
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "../../../styles/detail/decorativeframe.module.css"
import Selectbackground from "./selectbackground"

export default function Decorativeframe () {
    const router = useRouter();
    const[index, setIndex] = useState(0);
    const [image, setImage] = useState('')
    
    // 배경선택 

    // 스티커

    // 이미지 업로드
    const saveImage = (e:any) => {
        if(e.target.files.length !== 0){
        setImage(URL.createObjectURL(e.target.files[0]))};
    };

    const deleteImage = () => {
        URL.revokeObjectURL(image);
        setImage('');
    }


    return (
        <>
            <div className={styles.tabs}>
                <div className={styles.tablist}>
                    <div className={index===0?styles.selecttab:styles.tabhead} onClick={()=>{setIndex(0)}}>
                        <Icon name='file outline'/>배경선택
                    </div>
                    <div className={index===1?styles.selecttab:styles.tabhead} onClick={()=>{setIndex(1)}}>
                        <Icon name='smile outline'/>스티커
                    </div>
                    <div className={index===2?styles.selecttab:styles.tabhead} onClick={()=>{setIndex(2)}}>
                        <Icon name='upload'/>이미지업로드
                    </div>
                </div>
            </div>
            <div className={styles.tabcontent} hidden={index != 0}>
            <Selectbackground></Selectbackground>
            </div>
            <div className={styles.tabcontent} hidden={index != 1}>
                두번째 탭
            </div>
            <div className={styles.tabcontent} hidden={index != 2}>
                <div>
                    {image && (
                    <img
                        alt="img"
                        src={image}
                        style={{height:100}}
                    />
                    )}
                    <div className={styles.imageupload}>
                    <label className={styles.filebutton} htmlFor="file">이미지 업로드</label>
                    <input
                        id="file"
                        type="file"
                        style={{ display: "none" }}
                        onChange={saveImage}
                    />
                    <button className={styles.deletebutton} onClick={() => deleteImage()}>
                        삭제
                    </button>
                    </div>
                </div>
            </div>
        </>
    );
}