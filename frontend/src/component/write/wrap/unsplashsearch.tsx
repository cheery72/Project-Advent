import { SetStateAction, useEffect, useState } from "react";
import { Button, Header, Image, Input } from "semantic-ui-react";
import styles from "../../../../styles/write/wrap.module.css"
import unsplashAxios from "../../../lib/unsplashAxios";

export default function UnsplashSearch({ setBackgroundImage, setFileImage } :any) {

    const [searchWord, setSearchWord] = useState('')
    const [unsplashImages, setUnsplashImages]: any = useState([])

    const selectImage = (e: { target: { currentSrc: SetStateAction<string>; }; }) => {
        setBackgroundImage(e.target.currentSrc)
        setFileImage()
    }

    const writeSearchWord = (e: { target: { value: SetStateAction<string>; }; }) => {
        setSearchWord(e.target.value)
    }

    const enterSearchWord = (e: { key: string; }) => {
        if (e.key === "Enter") {
            loadImages()
        }
    }

    const loadImages = async () => {
        await unsplashAxios
            .get(`/search/photos`, {
                params: { query: searchWord, per_page: 15 }
            })
            .then(({ data }) => {
                setUnsplashImages(data.results)
                setSearchWord('')
                const searchValue: any = document.getElementById("searchInput")
                searchValue.value = ''
            })
            .catch((e) => {
                // console.log(e)
            })
    }

    const searchImage = () => {
        loadImages()
    }

    useEffect(() => {
        loadImages()
    }, [])

    return(
        <>
            <div>
                <Header as="h5">검색할 키워드를 입력하세요!</Header>
                <Input id="searchInput" type="text" placeholder="ex) flower, cake, birthday" maxLength={15} onChange={writeSearchWord} onKeyUp={enterSearchWord}/>
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
    );
}