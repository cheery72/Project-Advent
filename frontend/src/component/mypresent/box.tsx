import { useRouter } from "next/router";
import { Icon } from "semantic-ui-react";
import styles from "../../../styles/present/present.module.css"

export default function Box({day, boxInfo}:any){

    const router = useRouter()

    const openPresent = () => {
        router.push(`/my_present/detail/${boxInfo.box_id}`)
    }

    return(
        <>

            <div 
                className={styles.ribbonWrapper}
                onClick={openPresent}
            >
                <h3 className={styles.ribbonOpen}>
                    <strong 
                        className={styles.ribbonInner} 
                    ><Icon name="gift" size="small" />열기</strong>
                </h3>
            </div>

            <div className={styles.wrap}>
                <span className={styles.ribbonCross}>{ day ? `D-${day}`: 'D-day' }</span>
            </div>
        </>
    );
}