import Head from "next/head";
import { useRouter } from "next/router";
import PresentOne from "../../../src/component/present/presentone";
import PresentSeven from "../../../src/component/present/presentseven";
import PresentThree from "../../../src/component/present/presentthree";

export default function Present(){

    const router = useRouter()
    const { data } = router.query
    const content = JSON.parse(data as string) // TS 에러 발생 as 키워드로 type 강제 지정

    return(
        <>
            <Head>
                <title>선물 상세 페이지 | Make Our Special</title>
            </Head>
            { 
                content.day === 1?
                    <PresentOne presentInfo={content} />
                :content.day === 3?
                    <PresentThree presentInfo={content} />
                :content.day === 7?
                    <PresentSeven presentInfo={content} />
                :router.push('/404')
            }
        </>
    );
}