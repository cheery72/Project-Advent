import { Tab } from "semantic-ui-react";
import React from 'react'


export default function Decorativeframe () {

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
            menuPosition:'right',
            render: () => <Tab.Pane attacked={false}>
                이미지업로드 내용
                </Tab.Pane>
        }
    ];


    return (
    <Tab menu={{ secondary: true, pointing: true }} panes={decorativelist}/>
    );
}