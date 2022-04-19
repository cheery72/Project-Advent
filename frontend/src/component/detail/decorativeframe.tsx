import { Tab, Icon } from "semantic-ui-react";
import React from 'react';
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "../../../styles/detail/decorativeframe.module.css"

export default function Decorativeframe () {
    const router = useRouter();
    const[index, setIndex] = useState(0);

    const decorativelist = [
        {
            menuItem: { key: '배경선택', icon: 'file outline', content: '배경선택'},
            render: () => <Tab.Pane attacked={false}>
                배경선택 내용
                </Tab.Pane>
        },
        {
            menuItem: { key: '스티커', icon: 'smile outline', content: '스티커'},
            render: () => <Tab.Pane attacked={false}>
                스티커 내용
                </Tab.Pane>
        },
        {
            menuItem: { key: '이미지 업로드', icon: 'upload', content: '이미지 업로드'},
            render: () => <Tab.Pane attacked={false}>
                이미지업로드 내용
                </Tab.Pane>
        }
    ];


    return (
        <>
            <Tab menu={{ secondary: true, pointing: true }} panes={decorativelist}/>
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
                첫번째 탭
            </div>
            <div className={styles.tabcontent} hidden={index != 1}>
                두번째 탭
            </div>
            <div className={styles.tabcontent} hidden={index != 2}>
                세번째 탭
            </div>
        </>
    );
}