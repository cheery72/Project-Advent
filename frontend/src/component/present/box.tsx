import { useRouter } from "next/router";
import { useState } from "react";
import { Icon } from "semantic-ui-react";
import styles from "../../../styles/present/present.module.css"

export default function Box({day}:any){

    const router = useRouter()
    const [isDday, setIsDday] = useState(false)

    const openPresent = () => {
        router.push('/')
    }

    return(
        <>
            {isDday?
                <>
                    <div className={styles.ribbonWrapper}>
                        <h3 className={styles.ribbonOpen}>
                            <strong 
                                className={styles.ribbonInner} 
                                onClick={openPresent}
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
                        1일 뒤 열어보실 수 있습니다.
                    </div>
                </>
            }
                <div className={styles.wrap}>
                    <span className={styles.ribbonCross}>{ day ? `D-${day}`: 'D-day' }</span>
                </div>
        </>
    );
}