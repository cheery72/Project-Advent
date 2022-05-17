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
    const KAKAO_LOGIN_URL = 'http://k6c206.p.ssafy.io:8000/auth-server'
    const BASE_URL = 'http://localhost:3000'
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
                        <img src="/logo/logo.png" alt="Advent Special Day"  />
                    </a>
                </Link>

                {/* menu items */}
                <div className={ styles.menu }> 
                    <ul style={{ marginBottom:0 }}>
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
                    <ul style={{ marginTop:0 }}>
                        <li>
                            <div className={ styles.notionLink } onClick = {() => window.open('https://slime-capricorn-03e.notion.site/Make-our-special-7f0f4caec7f3447aaee2aaac52e88811', '_blank')}>  
                                서비스 사용법
                                <svg 
                                    className={ styles.notionIcon }
                                    height="20" 
                                    width="20" 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    viewBox="12 0.18999999999999906 487.619 510.941"
                                >
                                    <path 
                                        d="M96.085 91.118c15.81 12.845 21.741 11.865 51.43 9.884l279.888-16.806c5.936 0 1-5.922-.98-6.906L379.94 43.686c-8.907-6.915-20.773-14.834-43.516-12.853L65.408 50.6c-9.884.98-11.858 5.922-7.922 9.883zm16.804 65.228v294.491c0 15.827 7.909 21.748 25.71 20.769l307.597-17.799c17.81-.979 19.794-11.865 19.794-24.722V136.57c0-12.836-4.938-19.758-15.84-18.77l-321.442 18.77c-11.863.997-15.82 6.931-15.82 19.776zm303.659 15.797c1.972 8.903 0 17.798-8.92 18.799l-14.82 2.953v217.412c-12.868 6.916-24.734 10.87-34.622 10.87-15.831 0-19.796-4.945-31.654-19.76l-96.944-152.19v147.248l30.677 6.922s0 17.78-24.75 17.78l-68.23 3.958c-1.982-3.958 0-13.832 6.921-15.81l17.805-4.935V210.7l-24.721-1.981c-1.983-8.903 2.955-21.74 16.812-22.736l73.195-4.934 100.889 154.171V198.836l-25.723-2.952c-1.974-10.884 5.927-18.787 15.819-19.767zM42.653 23.919l281.9-20.76c34.618-2.969 43.525-.98 65.283 14.825l89.986 63.247c14.848 10.876 19.797 13.837 19.797 25.693v346.883c0 21.74-7.92 34.597-35.608 36.564L136.64 510.14c-20.785.991-30.677-1.971-41.562-15.815l-66.267-85.978C16.938 392.52 12 380.68 12 366.828V58.495c0-17.778 7.922-32.608 30.653-34.576z" 
                                        fillRule="evenodd"
                                    />
                                </svg>
                            </div>
                        </li>
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