import React from 'react'
import {Checkbox } from "semantic-ui-react";
import { HexColorPicker } from "react-colorful";
import styles from "../../../styles/detail/text.module.css"

export default function Text ({setText, setColor, setFontsize, setFontweight, fontweight, color, fontsize, text}:any) {
    
    // 텍스트 입력
    const createText = (e:any) => {
        setText(e.target.value);
        };

    
    // 텍스트 사이즈
    function changefontsize(e:any){
        setFontsize(e.target.value)
    }

    // 초기화 버튼
    const resetbutton = () => {
        setText('');
        setColor("#000000");
    }
    
    
    return(
        <>
            <div className={styles.inputtextbox}>
                <textarea  id="textarea" style={{color:color}} value={text} placeholder="내용을 입력해 주세요" onChange={createText} className={styles.contentbox}></textarea>
            </div>
            <div className={styles.fontweight}>                    
                글자 굵기 : &nbsp;&nbsp;
                <Checkbox
                radio
                label = '보통'
                name = 'checkboxRadioGroup'
                value='normal'
                checked={fontweight === 'normal'}
                onChange={(e, data) => setFontweight(data.value)}
                ></Checkbox>&nbsp;&nbsp;&nbsp;&nbsp;
                <Checkbox
                radio
                label = '굵게'
                name = 'checkboxRadioGroup'
                value='bolder'
                checked={fontweight === 'bolder'}
                onChange={(e, data) => setFontweight(data.value)}
                ></Checkbox>
            </div>
            <div className={styles.fontsize}>                    
                글자 크기 : &nbsp;&nbsp;
                <input
                    type='range'
                    min={10}
                    max={100}
                    value={fontsize}
                    onChange={changefontsize}
                    />
            </div>
            <div className={styles.changetextcolor}>
                현재 선택된 글자색      
                <div style={{background:color, width:"15px", height:"15px", marginLeft:"5px"}}></div>
            </div>
            <div className={styles.rgbacolorpicker}>
                <HexColorPicker color={color} onChange={setColor} />
            </div>
            <div>
                <button className={styles.deletebutton} onClick={() => resetbutton()}>
                    초기화
                </button>
            </div>
        </>
    )
}