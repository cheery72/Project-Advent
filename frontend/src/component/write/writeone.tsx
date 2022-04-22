import { useRouter } from "next/router";
import { Button, Header } from "semantic-ui-react";
import styles from "../../../styles/write/write.module.css"

export default function WriteOne(){

    const router = useRouter()
    const id = router.query.id

    const writeDetail = (number: Number) => {
        router.push({ pathname: `/write/${id}/${number}`, query: { day: `${1}`}})
    }
    
    const writeWrap = (number: Number) => {
        router.push({ pathname: `/write/${id}/wrap/${number}`, query: { day: `${1}`} })
    }

    return(
        <>
            <div>
                <Header as="h3" textAlign="left" style={{ padding: "5%" }}>D-day</Header>
                <br />
                <Button className={ styles.oneopen } color="pink" onClick={()=>{ writeDetail(1) }}>열기</Button>
                <br /><br /><br />
                <Button className={ styles.onewrap } color="pink" onClick={()=>{writeWrap(1)}}>포장지 선택</Button>
                <br /><br />
                <br /><br />
            </div>
        </>
    );
}