import {toast} from 'react-toastify'; 
import CheckInternetConnection from './CheckInternetConnection';

export  const SendEmailMessage =  async(subject , email, message)=>{
    if (CheckInternetConnection()) {
        const config = {
            SecureToken : "02aa4749-e5ea-48fb-902a-6193746fd955",
            To : 'kiossocamuegi@yopmail.com',
            From : email,
            Subject : subject,
            Body :message
        };
        if(window.Email){
            window.Email.send(config).then(()=> {
                alert("message sent")
            }).catch((error) =>{
                toast.error("Lamentamos mas não foi possivel enviar as credenciais por mensagem");
            });
        }
    }else{
        toast.error("Lamentamos mas não foi possivel enviar as credenciais por mensagem");
    }
}