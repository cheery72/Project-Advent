import { useRouter } from "next/router";
import { Button, Header } from "semantic-ui-react";
import styles from "../../../styles/write/write.module.css"

export default function WriteOne(){

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
                <div className={styles.ribbon}>D-day</div>
                <br /><br /><br /><br />
                <Button className={ styles.oneopen } style={{ backgroundColor: "aliceblue", color: "DarkSlateGray" }} onClick={()=>{ writeDetail(1) }}>열기</Button>
                <br /><br /><br />
                <Button className={ styles.onewrap } style={{ backgroundColor: "aliceblue", color: "DarkSlateGray" }} onClick={()=>{writeWrap(1)}}>포장지 선택</Button>
                <br /><br />
                <br /><br />
            </div>
        </>
    );
}