import PresentComponent from "../../src/component/present/present"
import Head from "next/head";
import allAxios from "../../src/lib/allAxios";

export default function Present({title, thumbnail}:any){

    return(
        <>
            <Head>
                <title>선물 확인하기 | Make Our Special</title>
                <meta property="og:title" content={ title ? title : "Advent Special Day" }/>
                <meta property="og:description" content="선물 확인하기 | Make Our Special" />
                <meta property="og:image" content={thumbnail ? thumbnail : "https://cdn.icon-icons.com/icons2/510/PNG/512/at_icon-icons.com_50456.png"} /> {/* 임시이미지--수정해야함 */}
            </Head>
            <PresentComponent />
        </>
    );
}

// 메타태그 관련 Server Side 처리 // BE에 썸네일, 제목 리턴하는 api 요청해야함
Present.getInitialProps = async ({query}:any) => {
    let title
    let thumbnail
    await allAxios
        .get(`/advents/${query.presenturl}`) // 테스트용 임시 요청
        .then(({ data }) => {
            title = data.title
            thumbnail = data.advent_box_list[0].wrapper
        })
    return { title: title, thumbnail: thumbnail };
};