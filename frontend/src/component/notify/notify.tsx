import { toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";

const notify = (type:string, message:string) => {
    if (type === 'success') {
        toast.success(message);
    } else if (type === 'error') {
        toast.error(message);
    } else if (type === 'info') {
        toast.info(message);
    } else if (type === 'warn') {
        toast.warn(message);
    } else {
        toast(message);
    }
}

export default notify
