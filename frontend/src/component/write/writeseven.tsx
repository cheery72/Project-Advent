import { useRouter } from "next/router";
import { Button, Header } from "semantic-ui-react";
import styles from "../../../styles/write/write.module.css"

export default function WriteSeven({ num }: any){

    const router = useRouter()
    const id = router.query.id

    const writeDetail = (number: Number) => {
        router.push({ pathname: `/write/${id}/${number}`, query: { day: `${7}`}})
    }
    
    const writeWrap = (number: Number) => {
        router.push({ pathname: `/write/${id}/wrap/${number}`, query: { day: `${7}`} })
    }

    return(
        <>
            <div>
                <Header as="h3" textAlign="left" style={{ padding: "10%" }}>D-{7-num?7-num:"day"}</Header>
                <Button className={ styles.sevenopen } style={{ backgroundColor: "aliceblue", color: "DarkSlateGray" }} onClick={()=>{writeDetail(num)}}>열기</Button>
                <br /><br />
                <Button className={ styles.sevenwrap } style={{ backgroundColor: "aliceblue", color: "DarkSlateGray" }} onClick={()=>{writeWrap(num)}}>포장지 선택</Button>
                <br /><br />
            </div>
        </>
    );
}