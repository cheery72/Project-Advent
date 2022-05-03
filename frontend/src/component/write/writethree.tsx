import { useRouter } from "next/router";
import { Button, Header } from "semantic-ui-react";
import styles from "../../../styles/write/write.module.css"

export default function WriteThree({ num }: any){

    const router = useRouter()
    const adventId = router.query.id

    const writeDetail = (number: Number) => {
        router.push({ pathname: `/write/${adventId}/${number}`})
    }
    
    const writeWrap = (number: Number) => {
        router.push({ pathname: `/write/${adventId}/wrap/${number}`})
    }

    return(
        <>
            <div>
                <div className={styles.ribbon}>D-{3-num?3-num:"day"}</div>
                <br /><br /><br />
                {/* <Header as="h3" textAlign="left" style={{ padding: "10%" }}>D-{3-num?3-num:"day"}</Header> */}
                <Button className={styles.threeopen} style={{ backgroundColor: "aliceblue", color: "DarkSlateGray" }} onClick={()=>{ writeDetail(num) }}>열기</Button>
                <br /><br />
                <Button className={styles.threewrap} style={{ backgroundColor: "aliceblue", color: "DarkSlateGray" }} onClick={()=>{ writeWrap(num) }}>포장지 선택</Button>
                <br /><br />
            </div>
        </>
    );
}