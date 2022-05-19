
import { useRouter } from "next/router";
import { useEffect } from "react";
import notify from "../../src/component/notify/notify";

export default function Authentication() {
    const router = useRouter();

    if (typeof window !== "undefined") {
        localStorage.setItem("token", String(router.query.token));
    }

    useEffect(() => {
        if (localStorage.token !== "undefined") {
            router.push('/')
            notify('success', '카카오계정으로 로그인되었습니다!🖐')
        }
    }, );

    return <></>;
}