import { useRouter } from "next/router";
import { Button } from "semantic-ui-react";

export default function Anniversary(){

    const router = useRouter()

    function goProfile(){
        router.push(`/sendbox`)
    }

    return(
        <>
            <p>개봉일 설정</p>
            <p>비밀번호 설정</p>
            <Button onClick={goProfile}>작성 완료</Button>
        </>
    );
}