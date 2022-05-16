import { Grid, Button, Icon, Image, Popup } from "semantic-ui-react";
import React, {useState, useEffect} from 'react'
import { useRouter } from "next/router";

import styles from "../../../styles/detail/detail.module.css"
import Selectbackground from "../../../src/component/detail/selectbackground"
import Text from "../../../src/component/detail/text"
import Sticker from "../../../src/component/detail/sticker"
import Snow from "../../../src/component/animation/snow"
import allAxios from "../../../src/lib/allAxios";
import userAxios from "../../../src/lib/userAxios";
import IsLogin from "../../../src/lib/IsLogin";
import notify from "../../../src/component/notify/notify";
import LogOut from "../../../src/lib/LogOut";
import Head from "next/head";

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

    // 효과
    const [effectpattern, setEffectPattern] = useState('noeffect')
    const [effectimage, setEffectImage] = useState('noeffect')

    const cardeffect = (name: string, image: string) => {
        setEffectPattern(name)
        setEffectImage(image)
    }

    // 유저 정보
    const [userInfo, setUserInfo]: any = useState([])

    const getUserInfo = async (router: any) => {
        await userAxios
            .get(`/auth/users`)
            .then(({ data }) => {
                setUserInfo(data.body.user)
            })
            .catch((e) => {
                LogOut(router)
                console.log(e)
            });
        };

    // 이미지 생성 및 저장
    const makeFileImage = () => {
        if (backImage==='https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Solid_white.svg/2048px-Solid_white.svg.png'
            && !backgroundColor    
            && imageList.length < 1
            && !image 
            && !text
        ) {
            notify("error", "❌내용을 입력해주세요❕")
            return
        }

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
            user_id: userInfo.id,
            animation: effectimage,
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

    // 일 수 정보
    const [dayInfo, setDayInfo] = useState(0)
    const getDayInfo = async (adventId: string | string[]) => {
        await allAxios
            .get(`/advents/${adventId}/days`)
            .then(({ data }) => {
                setDayInfo(data.day)
            })
            .catch((e) => {
                console.log(e)
            })
    }

    // 스티커 이동 구현
    interface images {
        src: string,
        x: string,
        y: string,
        moved: boolean
    }

    const [imageList, setImageList]: any = useState([])
    const [locationX, setLocationX] = useState('0')
    const [locationY, setLocationY] = useState('0')
    const [nowX, setNowX] = useState('0')
    const [nowY, setNowY] = useState('0')
    const [go, setGo] = useState(false)
    const [target, setTarget] = useState('')

    const addSticker = (stickers: string) => {
        let isIn = false
        {imageList.map((item: images) => {
            if (item.src === stickers){
                isIn = true
            }
        })}
        if (isIn) {
            notify("error", "스티커는 중복해서 사용할 수 없습니다.")
        }
        else if (imageList.length < 10 && !isIn) {
            const body = {
                src: stickers,
                x: "0",
                y: "0",
                moved: false
            }
            setImageList([body, ...imageList])
        }
        else {
            notify("error", "스티커는 10개 까지만 넣을 수 있습니다.")
        }
    }

    const deleteSticker = async (e: { target: { src: string; }; }) => {
        let tempList: any = []
        await imageList.map((item: images) => {
            if (item.src != e.target.src) {
                tempList = [item, ...tempList]
            }
        })
        
        await setImageList(tempList)
    }

    const moving = (e: any) => {
        if (go) {
            setTarget('')
        } else {
            setTarget(e.target.src)
        }

        if (go) {
            imageList.map((item: images) => {
                if (item.src == e.target.src) {
                    setLocationX(item.x)
                    setLocationY(item.y)
                }
            })
        }
        setNowX(String(Number(e.pageX)-Number(locationX)))
        setNowY(String(Number(e.pageY)-Number(locationY)))

        if (go) {
            imageList.map((item: images) => {
                if (item.src == e.target.src && item.moved === false) {
                    item.moved = true
                    item.x = locationX
                    item.y = locationY
                }
            })
        }
        setGo(!go)
    }

    const mouseMove = (event: any) => {
        if (go) {
            if (Number(event.pageX)-Number(nowX) > 0 && Number(event.pageX)-Number(nowX) < 230){
                setLocationX(String(Number(event.pageX)-Number(nowX)))
            }
            if (Number(event.pageY)-Number(nowY) > 0 && Number(event.pageY)-Number(nowY) < 230){
                setLocationY(String(Number(event.pageY)-Number(nowY)))
            }
        }
    }

    useEffect(() => {
        if (stickers) {
            addSticker(stickers)
        }
    }, [stickers])

    useEffect(() => {
        if (IsLogin() && router){
            getUserInfo(router)
        }   
        if (!IsLogin()){
            router.push('/')
            notify('error', `로그인해야 작성할 수 있습니다❕`)
        }
    }, [router])

    useEffect(() => {
        if (adventId) {
            getDayInfo(adventId)
        }
    }, [adventId])
    

return(
    <>
        <Head>
            <title>선물 꾸미기 | Make Our Special</title>
        </Head>
        <div className={styles.total}>
            <div>
                {effectpattern == 'snow'? <Snow effectImage={''}></Snow>:''}
                {effectpattern == 'flower'? <Snow effectImage={'/effect/daisy.png'}></Snow>:''}
                {effectpattern == 'pinkflower'? <Snow effectImage={'/effect/pinkflower.png'}></Snow>:''}
                {effectpattern == 'star'? <Snow effectImage={'/effect/star2.png'}></Snow>:''}
                {effectpattern == 'heart'? <Snow effectImage={'/stickercategory/love.png'}></Snow>:''}
                {effectpattern == 'present'? <Snow effectImage={'/effect/present.png'}></Snow>:''}
            </div>
        <div className={styles.presentdetailhead}>
            { dayInfo? <span>✨&nbsp;D-{dayInfo-Number(day)? dayInfo-Number(day) : "day" }&nbsp;✨</span> : "" }
        </div>
        <Grid stackable>
        <Row>
            <Column width={4}></Column>
            <Column width={8}>
            <div className={styles.boxlocation}>
            <div 
                id="canvas" 
                onMouseMove={mouseMove}
                onPointerDown={mouseMove}
                onDoubleClick={() => {setStickers(''), setLocationX('0'), setLocationY('0') }}
                className={styles.box} 
                style={{ backgroundSize:'cover', backgroundColor:backgroundColor, backgroundImage:`url(${backImage})`}}>
                <div style={{position:'absolute', cursor:'grab'}}>
                    {imageList?imageList.map((item: images) => {
                        return(
                            <span key = {item.src}>
                            <Popup
                                content={item.moved?<>한번만 이동할 수 있습니다 <br />더블 클릭시 삭제</>:<>1번째 클릭시 이동 <br /> 2번째 클릭시 고정</>} 
                                trigger={
                                <Image
                                    inline
                                    alt="sticker"
                                    src={item.src}
                                    style={{height:80, maxWidth:80,  position: `absolute`, top: `${target===item.src?locationY:item.y}px`, left: `${target===item.src?locationX:item.x}px`}}
                                    onClick={item.moved?()=>{}:moving}
                                    onDoubleClick={deleteSticker}
                                />
                            }
                            />
                            </span>
                        );
                        })
                    :""}
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
                    <div className={index===4?styles.selecttab:styles.tabhead} onClick={()=>{setIndex(4)}}>
                        <Icon name='gift'/>효과
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
                    </div>
                    <div className={styles.imageupload}>
                    <button className={styles.deletebutton} onClick={() => deleteImage()}>
                        삭제
                    </button>
                    </div>
                </div>
            </div>
            <div className={styles.tabcontent} hidden={index != 3}>
                <Text setText={setText} setColor={setColor} setFontsize={setFontsize} setFontweight={setFontweight} text={text} fontweight={fontweight} color={color} fontsize={fontsize}></Text>
            </div>
            <div className={styles.tabcontent} hidden={index != 4}>
                <div className={styles.backgroundtitle} style={{ backgroundColor: effectpattern=='noeffect'?"#FFFF8C":"" }} onClick={() => cardeffect('noeffect', 'noeffect')}>
                # 효과 없음
                </div>
                <div className={styles.backgroundtitle} style={{ backgroundColor: effectpattern=='snow'?"#FFFF8C":"" }}  onClick={() => cardeffect('snow', 'snow')}>
                # 눈 내리는 효과
                </div>
                <div className={styles.backgroundtitle} style={{ backgroundColor: effectpattern=='flower'?"#FFFF8C":"" }} onClick={() => cardeffect('flower', '/effect/daisy.png')}>
                # 꽃 내리는 효과 - 데이지
                </div>
                <div className={styles.backgroundtitle} style={{ backgroundColor: effectpattern=='pinkflower'?"#FFFF8C":"" }}  onClick={() => cardeffect('pinkflower', '/effect/pinkflower.png')}>
                # 꽃 내리는 효과 - 장미
                </div>
                <div className={styles.backgroundtitle} style={{ backgroundColor: effectpattern=='star'?"#FFFF8C":"" }}  onClick={() => cardeffect('star', '/effect/star2.png')}>
                # 별 내리는 효과
                </div>
                <div className={styles.backgroundtitle} style={{ backgroundColor: effectpattern=='heart'?"#FFFF8C":"" }}  onClick={() => cardeffect('heart', '/stickercategory/love.png')}>
                # 하트 내리는 효과
                </div>
                <div className={styles.backgroundtitle} style={{ backgroundColor: effectpattern=='present'?"#FFFF8C":"" }}  onClick={() => cardeffect('present', '/effect/present.png')}>
                # 선물 내리는 효과
                </div>
            </div>
        </div>
        </div>
    </>
);
}