import { useRouter } from "next/router";
import { Button } from "semantic-ui-react";
import styles from "../../../styles/write/write.module.css"
import allAxios from "../../lib/allAxios";

export default function WriteOne({ userInfo, boxId }: any){

    const router = useRouter()
    const adventId = router.query.id

    const writeDetail = (number: Number) => {
        if (boxId) {
            findRoute(number)
        } else {
            router.push({ pathname: `/write/${adventId}/${number}`})
        }
    }
    
    const writeWrap = (number: Number) => {
        router.push({ pathname: `/write/${adventId}/wrap/${number}`})
    }

    const findRoute = async (number:Number) => {
        await allAxios
            .get(`/boxes/${boxId}/${userInfo.id}`)
            .then(({ data }) => {
                if (data.content){
                    router.push({ pathname: `/write/${adventId}/edit/${boxId}`})
                } else {
                    router.push({ pathname: `/write/${adventId}/${number}`})
                }
            })
            .catch((e) => {
                // console.log(e)
            })
    }

    return(
        <>
            <div>
                <div className={styles.ribbon}>D-day</div>
                <br /><br /><br /><br />
                <Button className={ styles.oneopen } style={{ backgroundColor: "aliceblue", color: "DarkSlateGray" }} onClick={()=>{ writeDetail(1) }}>선물 꾸미기</Button>
                <br /><br /><br />
                <Button className={ styles.onewrap } style={{ backgroundColor: "aliceblue", color: "DarkSlateGray" }} onClick={()=>{writeWrap(1)}}>포장지 선택하기</Button>
                <br /><br />
                <br /><br />
            </div>
        </>
    );
}