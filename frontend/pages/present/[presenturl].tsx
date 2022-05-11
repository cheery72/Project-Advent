import PresentComponent from "../../src/component/present/present"
import Head from "next/head";
import allAxios from "../../src/lib/allAxios";

export default function Present({title, thumbnail}:any){

    return(
        <>
            <Head>
                <title>선물 확인하기 | Make Our Special</title>
                <meta property="og:title" content={ title ? title : "선물이 도착했습니다." }/>
                <meta property="og:description" content="선물 확인하기 | Make Our Special" />
                <meta property="og:image" content={thumbnail ? thumbnail : "https://s3.us-west-2.amazonaws.com/secure.notion-static.com/62b91d44-d9a4-4e80-8043-47aa01161572/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220511%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220511T024352Z&X-Amz-Expires=86400&X-Amz-Signature=7cbc836321e7f1304cac7741220c5b0f14c9fc50b93344d9a8db3ef33ec8e091&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22&x-id=GetObject"} /> {/* 임시이미지--수정해야함 */}
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
    return { title: title, thumbnail: thumbnail };
};