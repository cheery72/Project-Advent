import { useState, useEffect } from 'react'
import styles from '../../../styles/footer/scroll.module.css'

export default function ScrollToTop() {

    const [ScrollY, setScrollY] = useState(0);
    const [BtnStatus, setBtnStatus] = useState(false); // 버튼 상태
  
    const handleFollow = () => {
        setScrollY(window.pageYOffset);
        if(ScrollY > 100) {
            setBtnStatus(true); // 100 이상 -> 버튼 표시
        } else {
            setBtnStatus(false); // 100 이하 -> 버튼 사라지게
        } 
    }

    const handleTop = () => {  // 클릭하면 스크롤이 위로 올라가는 함수
        window.scrollTo({
        top: 0,
        behavior: "smooth"
        });
        setScrollY(0);  // ScrollY의 값을 초기화
        setBtnStatus(false); // BtnStatus의 값을 false로 바꿈 -> 버튼 숨김
    }

    useEffect(() => {
        const watch = () => {
        window.addEventListener('scroll', handleFollow)
        }
        watch();
        return () => {
        window.removeEventListener('scroll', handleFollow)
        }
    })

    return (
        <button 
            className={BtnStatus ? `${styles.topBtn} ${styles.active}` : styles.topBtn} // 버튼 표시 여부
            onClick={handleTop}  // 버튼 클릭시 함수 호출
        >TOP</button>
    );
}
