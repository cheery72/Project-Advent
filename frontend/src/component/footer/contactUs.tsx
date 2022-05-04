import React, { useRef } from 'react';
import notify from '../notify/notify';
import emailjs from '@emailjs/browser';

export default function ContactUs ({ setVisible }:any) {
    const form = useRef<any>();
    const settings = {
        YOUR_SERVICE_ID : 'service_fxbly8a',
        YOUR_TEMPLATE_ID : 'template_2og0plp',
        YOUR_PUBLIC_KEY : process.env.NEXT_PUBLIC_API_EMAILJS_KEY,
    }

    const sendEmail = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        // form validation(빈값) check
        if (!form.current.user_email.value.trim()) {
            form.current.user_email.focus()
            notify('warn', '발송자 E-mail 주소를 입력해주세요!')
        } else if (!form.current.message.value.trim()) {
            form.current.message.focus()
            notify('warn', '메일 내용을 입력해주세요!')
        } else {
            const errmsg = "😥이메일 발송에 실패했습니다. 관리자(매터모스트 @exit200)에게 문의해주세요"
            emailjs.sendForm(settings.YOUR_SERVICE_ID, settings.YOUR_TEMPLATE_ID, form.current, settings.YOUR_PUBLIC_KEY)
            .then((result) => {
                notify("success", "📧메일이 정상적으로 발송되었습니다.")
                setVisible(false)
            }, (error) => {
                notify("error", errmsg)
            })
            .catch(() => {
                notify("error", errmsg)
            })
        }
    };
    
    const cancel = () => {
        notify("info", "이메일 발송이 취소되었습니다.")
        setVisible(false)
    } 

    return (
        <form ref={form} onSubmit={sendEmail}>
            <input type="email" name="user_email" placeholder="발송자 E-mail 주소" />
            <textarea name="message" placeholder="문의 및 개선사항 등 의견을 보내주세요. 보내주신 메일은 회신메일을 통해 바로 확인하실 수 있습니다." />
            <button>보내기</button>
            <p onClick={() => cancel()}>취소</p>
        </form>
    )
}
