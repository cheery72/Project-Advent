import { Grid, Button, Icon, Checkbox, Image } from "semantic-ui-react";
import React, {useState, useEffect} from 'react'
import { useRouter } from "next/router";

import styles from "../../../styles/detail/detail.module.css"
import Selectbackground from "../../../src/component/detail/selectbackground"
import Text from "../../../src/component/detail/text"
import Sticker from "../../../src/component/detail/sticker"
import { HexColorPicker } from "react-colorful";
import allAxios from "../../../src/lib/allAxios";
import userAxios from "../../../src/lib/userAxios";
import IsLogin from "../../../src/lib/IsLogin";
import notify from "../../../src/component/notify/notify";

export default function Detail(){
    const router = useRouter();
    const day = router.query.detailid
    const adventId = router.query.id
    const {Row, Column} = Grid

    //decorativeframe
    const[index, setIndex] = useState(0);
    const [image, setImage] = useState('')
    const [pattern, setPattern] = useState(1)

    // 배경선택
    const [backgroundColor, setBackgroundColor] = useState('');
    const [backImage, setBackImage] = useState('https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Solid_white.svg/2048px-Solid_white.svg.png');

    // 스티커
    const [stickers, setStickers] = useState('')

    // 이미지 업로드
    const saveImage = (e:any) => {
        setImage('');
        if(e.target.files.length !== 0){
        setImage(URL.createObjectURL(e.target.files[0]))};
    };

    const deleteImage = () => {
        URL.revokeObjectURL(image);
        setImage('');
    }

    // 텍스트
    const [text, setText] = useState('');
    const [color, setColor] = useState("#000000");
    const [fontweight, setFontweight]:any = React.useState('normal')
    const [fontsize, setFontsize]:any = useState(30)


    // 유저 정보
    const [userInfo, setUserInfo]: any = useState([])

    const getUserInfo = async () => {
        await userAxios
            .get(`/auth/users`)
            .then(({ data }) => {
                setUserInfo(data.body.user)
            })
            .catch((e) => {
                console.log(e)
            });
        };

    // 이미지 생성 및 저장
    const makeFileImage = () => {
        const canvas: any = document.getElementById('canvas');

        import('html2canvas').then(html2canvas => {
            html2canvas.default(canvas).then(canvas => {
                canvas.toBlob((blob: any) => {
                    const file: any = new File([blob], "image.png", { type: "image/jpeg" })
                    if (userInfo && file) {
                        imageToServer(file)
                    }
                })
            })
        })
    }

    const imageToServer = async (fileImage: any) => {
        const body = new FormData();
        const adventBoxRequest: any = {
            advent_day: day,
            advent_id: adventId,
            user_id: userInfo.id
        }
        body.append("adventBoxRequest", new Blob([JSON.stringify(adventBoxRequest)],{type: "application/json"}))
        body.append("file", fileImage)
        await allAxios
        .post(`/boxes`, body)
        .then(() => {
            notify('success', `💌${day}번째 카드가 생성되었습니다.`)
            router.push({ pathname: `/write/${adventId}`})
        })
        .catch((e) => {
            console.log(e)
        })
    }

    useEffect(() => {
        if (IsLogin()){
        getUserInfo()
    }
    }, [])

return(
    <>
        <div className={styles.total}>
        <div className={styles.presentdetailhead}>
            D-7
        </div>
        <Grid stackable>
        <Row>
            <Column width={4}></Column>
            <Column width={8}>
            <div className={styles.boxlocation}>
            <div id="canvas" className={styles.box} style={{ backgroundSize:'cover', backgroundColor:backgroundColor, backgroundImage:`url(${backImage})`}}>
                <div style={{position:'absolute', cursor:'grab'}}>
                    {stickers && (
                            <Image
                                alt="sticker"
                                src={stickers}
                                style={{height:80, maxWidth:80}}
                            />
                    )}
                </div>
                <div className={styles.box_image}>
                {image && (
                    <Image
                        alt="imguploadfile"
                        src={image}
                        style={{height:150, maxWidth:300}}
                    />
                    )}
                </div>
                <div className={styles.box_text} style={{color:color, fontWeight:fontweight, fontSize:`${fontsize}px`, lineHeight:'100%'}}>
                    {text}
                </div>
                
            </div>
            </div>
            </Column>
            <Column width={4}>
                <div className={styles.buttonbetween}>
                    <Button inverted color='blue' onClick={() => { makeFileImage() }}>&nbsp;&nbsp;&nbsp;&nbsp;저&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;장&nbsp;&nbsp;&nbsp;&nbsp;</Button>
                </div>
                <div className={styles.cancelbutton}>    
                    <Button inverted color='blue' onClick={() => {router.push({ pathname: `/write/${adventId}` });}}>&nbsp;&nbsp;&nbsp;&nbsp;취&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;소&nbsp;&nbsp;&nbsp;&nbsp;</Button>  
                </div>             
            </Column>
        </Row>
        </Grid>
        <div className={styles.listbetween}>
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
                    <div className={index===3?styles.selecttab:styles.tabhead} onClick={()=>{setIndex(3)}}>
                        <Icon name='pencil alternate'/>텍스트 입력
                    </div>
                </div>
            </div>
            <div className={styles.tabcontent} hidden={index != 0}>
            <Selectbackground setBackgroundColor={setBackgroundColor} setBackImage={setBackImage} backgroundcolor={backgroundColor}></Selectbackground>
            </div>
            <div className={styles.tabcontent} hidden={index != 1}>
            <Sticker pattern={pattern} setPattern={setPattern} setStickers={setStickers}></Sticker>
            </div>
            <div className={styles.tabcontent} hidden={index != 2}>
                <div>
                    <div className={styles.imageupload}>
                    <label className={styles.filebutton} htmlFor="file">이미지 업로드</label>
                    <input
                        id="file"
                        type="file"
                        accept="image/gif, image/jpeg, image/png"
                        style={{ display: "none" }}
                        onChange={saveImage}
                    />
                    <button className={styles.deletebutton} onClick={() => deleteImage()}>
                        삭제
                    </button>
                    </div>
                </div>
            </div>
            <div className={styles.tabcontent} hidden={index != 3}>
                <Text setText={setText} setColor={setColor} setFontsize={setFontsize} setFontweight={setFontweight} text={text} fontweight={fontweight} color={color} fontsize={fontsize}></Text>
            </div>
        
        </div>
        </div>
    </>
);
}