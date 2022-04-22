import { useRouter } from "next/router";
import { useState } from "react";
import { Header, Icon } from "semantic-ui-react";
import styles from "../../../styles/present/present.module.css"

export default function BoxOne(){

    const router = useRouter()
    const [isDday, setIsDday] = useState(false)

    const openPresent = () => {
        router.push('/')
    }

    return(
        <>
            {isDday?
                <div onClick={openPresent} className={ styles.one_images } style={{ backgroundImage: `url(/wrap/sample/samplepackage1.PNG)` }}>
                    
                </div>
            :
                <div className={ styles.one_lock_images }>
                    <br />
                    <Icon name="lock" size="huge" color="yellow"/>
                    <Header as="h2">1일 뒤</Header>
                    <Header as="h2">열어보실 수</Header>
                    <Header as="h2">있습니다.</Header>
                </div>
            }
        </>
    );
}