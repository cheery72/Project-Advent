import { useRouter } from "next/router";
import { Icon } from "semantic-ui-react";
import styles from "../../../styles/present/present.module.css"

export default function Box({day, boxInfo}:any){

    const router = useRouter()

    const openPresent = () => {
        router.push(`/present/detail/${boxInfo.box_id}`)
    }

    return(
        <>
            {boxInfo.active?
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
                    <div className={styles.ribbonIsActive}>선물<br /> 확인<br /> 가능</div>
                </>
            :
            
            <>
                    <div className={styles.ribbonVertical}></div>
                    <div className={styles.ribbonHorizontal}>
                        <Icon name="lock" />
                        {
                            boxInfo.active_day === 1 ?
                            <>내일 </>
                            :
                            <>{boxInfo.active_day}일 뒤 </>
                        }
                        열어보실 수 있습니다.
                    </div>
                </>
            }
                <div className={styles.wrap}>
                    <span className={styles.ribbonCross}>{ day ? `D-${day}`: 'D-day' }</span>
                </div>
        </>
    );
}