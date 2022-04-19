import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../../styles/navbar/navbar.module.css';
import { Button, Icon } from 'semantic-ui-react';

export default function Navbar(){
    const KAKAO_LOGIN_URL = 'http://kwky.shop:8081'
    const BASE_URL = 'http://localhost:3000'

    const [isLogined, setIsLogin] = useState<boolean>(false)

    const router = useRouter()

    useEffect(() => {
        if (localStorage.token) { 
            setIsLogin(true) 
        } else {
            setIsLogin(false)
        }    
    }, []);

    function logout() {
        localStorage.removeItem("token")
        setIsLogin(false)
        if (router.pathname !== "/") {
            router.push('/')
            alert('정상적으로 로그아웃되었습니다. 메인으로 이동합니다.')
        } else {
            alert('정상적으로 로그아웃되었습니다.')
        }
    }

    return(
        <nav className={ styles.menuContainer }>
            {/* burger menu */}
            <input type="checkbox" aria-label="Toggle menu" />
            <span></span>
            <span></span>
            <span></span>

            {/* logo */}
            <Link href="/">
                <a className={ styles.menuLogo }> {/* style 적용때문에 a태그 사용, a태그만 사용하면 페이지 이동시 rerendering 함*/}
                    <img src="/temp_logo.png" alt="Advent Special Day"  />
                </a>
            </Link>

            {/* menu items */}
            <div className={ styles.menu }>
                <ul>
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
                </ul>
                <ul>
                    <li>
                        {
                            isLogined ? 
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
                            // 임시경로( 소셜로그인테스트: kwky.shop:8081 / 리다이렉트: localhost:3000 )
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
    )
}