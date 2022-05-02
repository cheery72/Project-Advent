import { Button, Header, Image, Input } from "semantic-ui-react";
import { useRouter } from "next/router";
import React, { SetStateAction, useEffect, useState } from "react";
import styles from "../../../styles/detail/selectbackground.module.css"
import { HexColorPicker } from "react-colorful";
import unsplashAxios from "../../../src/lib/unsplashAxios";

export default function Selectbackground ({setBackgroundColor, setBackImage}:any) {
    const router = useRouter();
    const [backgroundImage, setBackgroundImage] = useState('')
    const [imageType, setImageType] = useState(1)
    const [pattern, setPattern] = useState(1)
    const [searchWord, setSearchWord] = useState('')
    const [unsplashImages, setUnsplashImages]: any = useState([])

    const selectImage = (e:any) => {
        setBackImage(e.target.currentSrc)
    }

    const deleteImage = (e:any) => {
        setBackImage('')
    }

    // tab
    const selectImageType = (num: SetStateAction<number>) => {
        setImageType(num)
    }


    // 배경 이미지 업로드
    const saveImage = (e:any) => {
        if(e.target.files.length !== 0){
            setBackImage(URL.createObjectURL(e.target.files[0]))};
    };

    const deleteBackgroundImageupload = () => {
        URL.revokeObjectURL(backgroundImage);
        setBackImage('');
    }

    // Cololrpicker 배경선택 
    const [color, setColor] = useState("#ffffff");

    // upsplash
    const writeSearchWord = (e: { target: { value: SetStateAction<string>; }; }) => {
        setSearchWord(e.target.value)
    }

    const searchImage = () => {
        loadImages()
    }


    const loadImages = async () => {
        await unsplashAxios
            .get(`/search/photos`, {
                params: { query: searchWord, per_page: 15 }
            })
            .then(({ data }) => {
                setUnsplashImages(data.results)
            })
            .catch((e) => {
                console.log(e)
            })
    }

    return (
        <>
            <div>
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
                <div className={styles.backgroundtitle} style={{ backgroundColor: pattern==1?"#FFFF8C":"" }} onClick={() => {setPattern(1)}}>
                # 전통무늬
                </div>
                <div className={styles.backgroundcontent} hidden={pattern != 1}>
                
                </div>
                <div className={styles.backgroundtitle} style={{ backgroundColor: pattern==2?"#FFFF8C":"" }}  onClick={() => {setPattern(2)}}>
                # 생일
                </div>
                <div className={styles.backgroundcontent} hidden={pattern != 2}>

                </div>
                <div className={styles.backgroundtitle} style={{ backgroundColor: pattern==3?"#FFFF8C":"" }}  onClick={() => {setPattern(3)}}>
                # 반복무늬
                </div>
                <div className={styles.backgroundcontent} hidden={pattern != 3}>
                <img src='/backgroundsample/background.jpg' onClick={selectImage}></img>
                <img src='/backgroundsample/background1.jpg' onClick={selectImage}></img>
                <img src='/backgroundsample/background2.jpg' onClick={selectImage}></img>
                <img src='/backgroundsample/background3.jpg' onClick={selectImage}></img>
                </div>
                <div className={styles.backgroundtitle} style={{ backgroundColor: pattern==4?"#FFFF8C":"" }}  onClick={() => {setPattern(4)}}>
                # 하트
                </div>
                <div className={styles.backgroundcontent} hidden={pattern != 4}>

                </div>
                <div className={styles.backgroundtitle} style={{ backgroundColor: pattern==5?"#FFFF8C":"" }}  onClick={() => {setPattern(5)}}>
                # 꽃
                </div>
                <div className={styles.backgroundcontent} hidden={pattern != 4}>

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
            <HexColorPicker color={color} onChange={setBackgroundColor} />
            </div>
            </>
        :
        ''}
        {imageType===4?
        <>
            <div>
                <Header as="h5">검색할 단어를 입력하세요!</Header>
                <Input type="text" placeholder="영어로 입력해주세요" maxLength={15} onChange={writeSearchWord}/>
                <Button color="blue" inverted onClick={ searchImage }>검색</Button>
            </div>
            <div className={styles.backgroundcontent}>   
                {unsplashImages?
                    unsplashImages.map((image: any) => {
                        return (
                            <>
                                <span key={image.id}>
                                <Image src={image.urls.small} alt="" wrapped width={100} onClick={selectImage}/>
                                </span> 
                            </>
                        );           
                    })
                :''}
            </div> 
        </>
        :
        ''}
            </div>
        </>
    );
}