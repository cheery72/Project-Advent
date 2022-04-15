import { useRouter } from 'next/router';
import { SetStateAction, useState } from 'react';
import { Menu } from 'semantic-ui-react'

export default function Navbar(){

    const router = useRouter()
    const [activeItem, setActivItem] = useState('home')

    function changeActive(now: SetStateAction<string>){
        setActivItem(now)
    }

    function move(url: string){
        router.push(`/${url}`)
    }

    return(
        <>
            <Menu>
                <Menu.Item
                name='home'
                active={activeItem === 'home'}
                onClick={()=>{changeActive('home'), move('/')}}
                >
                Home
                </Menu.Item>

                <Menu.Item
                name='write'
                active={activeItem === 'write'}
                onClick={()=>{changeActive('write'), move('write')}}
                >
                작성하기
                </Menu.Item>

                <Menu.Item
                name='sendbox'
                active={activeItem === 'sendbox'}
                onClick={()=>{changeActive('sendbox'), move('sendbox')}}
                >
                작성 선물함
                </Menu.Item>

                <Menu.Menu position='right'>
                <Menu.Item
                    name='signin'
                    active={activeItem === 'signin'}
                    onClick={()=>{changeActive('signin')}}
                >
                    로그인
                </Menu.Item>

                </Menu.Menu>
            </Menu>
        </>
    );
}