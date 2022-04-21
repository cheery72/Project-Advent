import { useRouter } from "next/router";
import { useState } from "react";
import { Header, Icon } from "semantic-ui-react";
import styles from "../../../styles/present/present.module.css"

export default function BoxThree({ num }: any){

    const router = useRouter()
    const [isDday, setIsDday] = useState(false)

    const openPresent = () => {
        router.push('/')
    }

    return(
        <>
            {isDday?
                <div onClick={openPresent} className={ styles.three_images } style={{ backgroundImage: `url(/wrap/sample/samplepackage2.PNG)` }}>
                    
                </div>
            :
                <div className={ styles.three_lock_images }>
                    <br />
                    <Icon name="lock" size="large" color="yellow"/>
                    <Header as="h3">1일 뒤 <br /> 열어보실 수 <br /> 있습니다.</Header>
                </div>
            }
        </>
    );
}