import notify from "../component/notify/notify"
import IsLogin from "./IsLogin"

const LogOut = (router: any) => {
    if (IsLogin()){
        if (typeof window !== "undefined") {
            localStorage.removeItem("token")
            let msg = '🕛로그인 시간이 만료되었습니다.'
            if (router.pathname !== "/") {
                router.push('/')
                msg += ' 메인으로 이동합니다.'
            } else {
                setTimeout(() => location.reload(), 1000) // 1초 후 새로고침(새로고침:로그아웃 후 버튼 상태 toggle + 1초 delay:tostify 표시)
            }
            notify('success', msg)
        }
    }
}

export default LogOut