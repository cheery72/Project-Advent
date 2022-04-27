import { toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";

const notify = (type:string, message:string, autoClose:any=1000) => {
    if (type === 'success') {
        toast.success(message, { autoClose: autoClose });
    } else if (type === 'error') {
        toast.error(message, { autoClose: autoClose });
    } else if (type === 'info') {
        toast.info(message, { autoClose: autoClose });
    } else if (type === 'warn') {
        toast.warn(message, { autoClose: autoClose });
    } else {
        toast(message, { autoClose: autoClose });
    }
}

export default notify
