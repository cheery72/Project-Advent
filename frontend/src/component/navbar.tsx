import Link from 'next/link';
import styles from '../../styles/navbar/navbar.module.css';

export default function Navbar(){

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
                        <img src="kakao_button/kakao_login_large.png" className={ styles.kakaoButton }/>
                    </li>
                </ul>
            </div>
        </nav>
    )
}