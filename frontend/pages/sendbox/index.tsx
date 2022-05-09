import Head from "next/head";
import { useEffect, useState } from "react";
import styles from '../../styles/sendbox/sendbox.module.css'
import SendboxList from "../../src/component/sendbox/sendboxList";
import userAxios from "../../src/lib/userAxios";
import { useRouter } from 'next/router';
import notify from "../../src/component/notify/notify";
import IsLogin from "../../src/lib/IsLogin";

export default function Sendbox(){
    const router = useRouter()

    const [username, setUsername] = useState<string>('') //loading spinner 연결을 고려
    const [userId, setUserId] = useState<number>(0)

    
    const getUserInfo = async () => {
        await userAxios.get(`/auth/users`)
            .then((data) => {
                setUsername(data.data.body.user.name)
                setUserId(data.data.body.user.id) // 유저의 userId를 받아옴
            })
            .catch((e) => {
                console.log(e)
                localStorage.removeItem('token')
                router.push('/')
                notify('info', '로그인 시간이 만료되어 로그아웃합니다😥')
            });
    };

    useEffect(() => {
        if (IsLogin()) {
            getUserInfo()
        }
    }, [])

    return(
        <>
            <Head>
                <title>보낸 선물함 | Make Our Special</title>
            </Head>
            <div className={ styles.background }>
                <div 
                    className={ styles.titleWrapper } 
                    data-aos="zoom-in-right"
                >
                    <h1 className={ styles.title }>
                        <span>❝ { username } ❞님</span>의 <span>보낸 선물함</span>
                    </h1>
                </div>
                <SendboxList userId={ userId } username={ username } />
            </div>
        </>
    );
}