import PresentComponent from "../../../src/component/present/present"
import Head from "next/head";
import allAxios from "../../../src/lib/allAxios";

export default function Present({title, thumbnail}:any){

    return(
        <>
            <Head>
                <title>선물 확인하기 | Make Our Special</title>
                <meta property="og:title" content={ title ? title : "선물이 도착했습니다." }/>
                <meta property="og:description" content="선물 확인하기 | Make Our Special" />
                <meta property="og:image" content={thumbnail ? thumbnail : "https://makeourspecial.day/sendbox/temp_sendbox_img-before.png"} />
                                        {/* localhost:3000/이미지주소 -> 개발단계에서 저장된 로컬 이미지 경로는 메타태그에 표시되지 않음 */}
            </Head>
            <PresentComponent />
        </>
    );
}

Present.getInitialProps = async ({query}:any) => {
    let title
    let thumbnail
    await allAxios
        .get(`/advents/${query.presenturl}/title`)
        .then(({ data }) => {
            title = data.title
            thumbnail = data.wrapper
        })
        .catch((e) => {
            console.log(e)
        })
    return { title: title, thumbnail: thumbnail };
};