import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import DayOne from "../../../src/component/write/dayone";
import DaySeven from "../../../src/component/write/dayseven";
import DayThree from "../../../src/component/write/daythree";
import userAxios from "../../../src/lib/userAxios";

export default function WritePresent(){

    const router = useRouter()
    const day = router.query.day
    const [userInfo, setUserInfo]: any = useState()

    const getUserInfo = async () => {
        await userAxios
            .get(`/auth/users`)
            .then(({ data }) => {
                setUserInfo(data.body.user)
            })
            .catch((e) => {
                console.log(e)
            });
        };

    useEffect(() => {
        getUserInfo()
    }, [])

    return(
        <>
            {day==='1'?
            <DayOne userInfo={userInfo}/>
            :''}
            {day==='3'?
            <DayThree userInfo={userInfo}/>
            :''}
            {day==='7'?
            <DaySeven userInfo={userInfo}/>
            :''}
        </>
    );
}