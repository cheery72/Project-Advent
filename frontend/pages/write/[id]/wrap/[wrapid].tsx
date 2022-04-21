import { useRouter } from "next/router";
import { SetStateAction, useEffect, useState } from "react";
import { Button, Grid, Header, Image } from "semantic-ui-react";
import styles from "../../../../styles/write/wrap.module.css"

export default function Wrap(){

    const router = useRouter()
    const day = router.query.day
    const wrapid = router.query.wrapid
    const { Row, Column } = Grid

    const [imageType, setImageType] = useState(1)
    const [images, setImages]: any = useState([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29])
    const [myImage, setMyImage] = useState()

    const selectImageType = (num: SetStateAction<number>) => {
        setImageType(num)
    }
    
    const findImage = (e: any) => {
        setMyImage(e.target.value)
    }

    const selectImage = (e: { target: { currentSrc: SetStateAction<undefined> } }) => {
        setMyImage(e.target.currentSrc)
    }

    const writeWrap = () => {
        alert(`${wrapid}번 포장지가 변경되었습니다.`)
        router.push({ pathname: '/write/testid', query: { day: `${day}` }})
    }

    const closeWrap = () => {
        router.push({ pathname: '/write/testid', query: { day: `${day}` }})
    }

    useEffect(()=>{
        console.log('입력받은 이미지', myImage)
    }, [myImage])

    return(
        <>
            <Grid centered>
                    <Row>
                        <Image src={myImage} alt="사용자파일" size="small"/>
                    </Row>
                    
                    <Row>
                        <Header as="h3">{wrapid}번 포장지를 선택하세요.</Header>
                    </Row>
                    <Row>
                        <Column width={3}>
                            <Header textAlign="center" as="h4" onClick={()=>{selectImageType(1)}} className={imageType===1?styles.selected:styles.pointer }>이미지 찾기</Header>
                        </Column>
                        <Column width={3}>
                            <Header textAlign="center" as="h4" onClick={()=>{selectImageType(2)}} className={imageType===2?styles.selected:styles.pointer }>기존이미지 선택</Header>
                        </Column>
                    </Row>
                    <Row>
                        <Column width={3}/>
                        <Column width={10} textAlign="center">
                        {imageType===1?
                            <input id="myimage" type="file" onChange={findImage}/>
                        :
                        ''}
                        {imageType===2?
                            images.map((id: number) => {
                                return(
                                    <>
                                        <Image src={`/wrap/sample/samplepackage${(id%3)+1}.PNG`} alt="이미지 없음" size="mini" inline onClick={selectImage} />&nbsp;&nbsp;&nbsp;
                                    </>
                                );
                            })
                        :
                        ''}
                        </Column>
                        <Column width={3}/>
                    </Row>
                    <Row>
                        <Button onClick={()=>{ writeWrap()}} color="blue">저장</Button>
                        <Button onClick={()=>{ closeWrap()}}>취소</Button>
                    </Row>
                </Grid>
        </>
    );
}