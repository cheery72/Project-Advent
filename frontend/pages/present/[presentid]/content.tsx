import Head from "next/head";
import { useRouter } from "next/router";
import PresentOne from "../../../src/component/present/presentone";
import PresentSeven from "../../../src/component/present/presentseven";
import PresentThree from "../../../src/component/present/presentthree";
import styles from "../../../styles/detail/detail.module.css"

export default function Present(){

    const router = useRouter()

    try {
        const { data } = router.query
        const content = JSON.parse(data as string) //string인 data를 JSON으로 // TS 에러 발생 as 키워드로 type 강제 지정

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
                    :<></>
                }
            </>
        );
    }
    catch {
        return <>비정상적인 접근입니다.</>
    }
}