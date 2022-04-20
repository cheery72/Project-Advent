import { useRouter } from "next/router";
import Dayone from "../../../src/component/write/dayone";
import Dayseven from "../../../src/component/write/dayseven";
import Daythree from "../../../src/component/write/daythree";

export default function WritePresent(){

    const router = useRouter()
    const day = router.query.day

    return(
        <>
            {day==='1'?
            <Dayone />
            :''}
            {day==='3'?
            <Daythree />
            :''}
            {day==='7'?
            <Dayseven />
            :''}
        </>
    );
}