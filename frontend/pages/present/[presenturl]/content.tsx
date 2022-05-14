import Head from "next/head";
import { useRouter } from "next/router";
import { Header, Icon } from "semantic-ui-react";
import PresentOne from "../../../src/component/present/presentone";
import PresentSeven from "../../../src/component/present/presentseven";
import PresentThree from "../../../src/component/present/presentthree";

export default function Present(){

    const router = useRouter()

        const { data } = router.query
        if(data) {
            var content = JSON.parse(data as string) //string인 data를 JSON으로 // TS 에러 발생 as 키워드로 type 강제 지정
        } 

        return(
            <>
                <Head>
                    <title>선물 상세 페이지 | Make Our Special</title>
                </Head>
                {  data ? (
                    content.day === 1?
                        <PresentOne presentInfo={content} />
                    :content.day === 3?
                        <PresentThree presentInfo={content} />
                    :content.day === 7?
                        <PresentSeven presentInfo={content} />
                    :<></>
                    ) : (
                    <Header as='h2' icon textAlign='center'>
                        <Icon name='warning sign' circular />
                        <Header.Content>비정상적인 접근입니다.</Header.Content>
                      </Header>
                    )
                }
            </>
        );
}