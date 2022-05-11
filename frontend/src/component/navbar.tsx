import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../../styles/navbar/navbar.module.css';
import { Button, Icon } from 'semantic-ui-react';
import notify from './notify/notify';
import IsLogin from '../../src/lib/IsLogin'
import { ToastContainer } from 'react-toastify';
import { useEffect } from 'react';
import userAxios from '../lib/userAxios';

export default function Navbar() {
    const KAKAO_LOGIN_URL = 'http://k6c2061.p.ssafy.io:8081'
    const BASE_URL = 'https://makeourspecial.day'
    const router = useRouter()

    const logout = () => {
        localStorage.removeItem("token")
        let msg = '👋정상적으로 로그아웃되었습니다.'
        if (router.pathname !== "/") {
            router.push('/')
            msg += ' 메인으로 이동합니다.'
        } else {
            setTimeout(() => location.reload(), 1000) // 1초 후 새로고침(새로고침:로그아웃 후 버튼 상태 toggle + 1초 delay:tostify 표시)
        }
        notify('success', msg)
    }

    // const getUserInfo = async () => {
    //     await userAxios
    //         .get(`/auth/users`)
    //         .then(() => {
    //         })
    //         .catch(() => {
    //             notify('error', "🕛로그인 시간이 만료되었습니다.")
    //             logout()
    //         });
    //     };

    // useEffect(() => {
    //     if (IsLogin()){
    //         getUserInfo()
    //     }
    // }, [])

    return(
        <>
            <ToastContainer />
            <nav className={ styles.menuContainer }>

                {/* burger menu */}
                <input type="checkbox" aria-label="Toggle menu" />
                <span></span>
                <span></span>
                <span></span>

                {/* logo */}
                <Link href="/">
                    <a className={ styles.menuLogo }> {/* style 적용때문에 a태그 사용, Link태그 대신 a태그만 사용하면 페이지 이동시 rerendering 함*/}
                        <img src="/logo/temp_logo.png" alt="Advent Special Day"  />
                    </a>
                </Link>

                {/* menu items */}
                <div className={ styles.menu }>     
                    <ul>
                        {
                            IsLogin() && 
                            <>
                                <li>
                                    <Link href="/write">
                                        선물 작성하기
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/sendbox">  
                                        보낸 선물함
                                    </Link>
                                </li>
                            </>
                        }
                    </ul>
                    <ul>
                        <li>
                            {
                                IsLogin() ? 
                                <Button 
                                    animated
                                    color="yellow"
                                    size="large"
                                    onClick={() => logout()}
                                >
                                    <Button.Content visible>
                                        <Icon name="sign-out" />Logout
                                    </Button.Content>
                                    <Button.Content hidden>
                                        <Icon color="red" name="heart" />See you!
                                    </Button.Content>
                                </Button>
                                :
                                <Link href={`${KAKAO_LOGIN_URL}/oauth2/authorization/kakao?redirect_uri=${BASE_URL}/oauth/redirect`}>
                                    <img 
                                        src="/kakao_button/kakao_login_large.png" 
                                        className={ styles.kakaoButton }       
                                        alt="카카오로그인"
                                    />
                                </Link>
                            }
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    )
}