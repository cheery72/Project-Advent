import Link from 'next/link';
// import { useRouter } from 'next/router';
// import { SetStateAction, useState } from 'react';
// import { Menu } from 'semantic-ui-react'
import styles from '../../styles/navbar/navbar.module.css';

export default function Navbar(){

    // const router = useRouter()
    // const [activeItem, setActivItem] = useState('home')

    // function changeActive(now: SetStateAction<string>){
    //     setActivItem(now)
    // }

    // function move(url: string){
    //     router.push(`/${url}`)
    // }

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
                        <a href="/signin">
                            카카오 로그인
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    )

    // return(
    //     <>
    //         <Menu>
    //             <Menu.Item
    //             name='home'
    //             active={activeItem === 'home'}
    //             onClick={()=>{changeActive('home'), move('/')}}
    //             >
    //             Home
    //             </Menu.Item>

    //             <Menu.Item
    //             name='write'
    //             active={activeItem === 'write'}
    //             onClick={()=>{changeActive('write'), move('write')}}
    //             >
    //             작성하기
    //             </Menu.Item>

    //             <Menu.Item
    //             name='sendbox'
    //             active={activeItem === 'sendbox'}
    //             onClick={()=>{changeActive('sendbox'), move('sendbox')}}
    //             >
    //             작성 선물함
    //             </Menu.Item>

    //             <Menu.Menu position='right'>
    //             <Menu.Item
    //                 name='signin'
    //                 active={activeItem === 'signin'}
    //                 onClick={()=>{changeActive('signin')}}
    //             >
    //                 로그인
    //             </Menu.Item>

    //             </Menu.Menu>
    //         </Menu>
    //     </>
    // );
}