import { useState } from 'react';
import Link from 'next/link';
import styles from '../../styles/navbar/navbar.module.css';
import { Button } from 'semantic-ui-react';
import { Icon } from 'semantic-ui-react';

export default function Navbar(){
    const KAKAO_LOGIN_URL = 'http://kwky.shop:8081'
    const BASE_URL = 'http://localhost:3000'

    const [isLogined, setIsLogin] = useState<boolean>(true)

    return(
        <nav className={ styles.menuContainer }>
            {/* burger menu */}
            <input type="checkbox" aria-label="Toggle menu" />
            <span></span>
            <span></span>
            <span></span>

            {/* logo */}
            <a href="/" className={ styles.menuLogo }>
                <img src="/temp_logo.png" alt="Advent Special Day"/>
            </a>

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
                        { isLogined ? 
                            <Button
                            color="yellow"
                            >
                                <Icon name="sign-out" />Logout
                            </Button>
                            :
                            // 임시경로(소셜로그인테스트: kwky.shop:8081 / 리다이렉트: localhost:3000 )
                            <Link href={`${KAKAO_LOGIN_URL}/oauth2/authorization/kakao?redirect_uri=${BASE_URL}/oauth/redirect`}>
                                <img 
                                src="kakao_button/kakao_login_large.png" 
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