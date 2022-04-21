import { useRouter } from "next/router";
import DayOne from "../../../src/component/write/dayone";
import DaySeven from "../../../src/component/write/dayseven";
import DayThree from "../../../src/component/write/daythree";

export default function WritePresent(){

    const router = useRouter()
    const day = router.query.day

    return(
        <>
            {day==='1'?
            <DayOne />
            :''}
            {day==='3'?
            <DayThree />
            :''}
            {day==='7'?
            <DaySeven />
            :''}
        </>
    );
}