import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'
import { toast } from 'react-toastify';
import { styled } from 'styled-components'
import Hoot from '../General/components/Hoot';
import axios from 'axios';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"; 
 

function MailBox() { 
  const [MessageText, sendMessageText] = useState(null); 
  const [User, setUser] = useState(null); 
  const [Email, setEmail] = useState(null); 
  const [Contacts, setContacts]=  useState([]);
  const [MessageTitle,sendMessageTitle] = useState(null); 
  const [Total, setTotal] = useState(0)
  const [Totalf, setTotalf] = useState(0)
 
  const FORMURL = [
    Hoot()+"eduallsendemail/post/", 
  ]

 



  const list = `
#Kwenda Araujo, kwenda.araujo@colegioelizangela.com
#Antonio Barbosa , acbarbosa4155@gmail.com
#do Colégio Eminuel ,complexoescolareminuel@hotmail.com
#do CAF Colégio Árvore da Felicidade, colegioarvoredafelicidade@gmail.com
#do  CEDUC - Centro Educacional cristão,falecom@ceduc.com

#do Centro infantil Os pitruquinhas,secretariapitruquinhaspatriota@gmail.com
#do CESA do zango,centrocesa@gmail.com
#do CKI- Colégio Kalabo internacional,geral.cki@gmail.com
#do Colégio  Atlântico ,direcao.colegioatlantico@hotmail.com
#do Colégio Cantinho da vany,colegio_ocantinhodavany@hotmail.com


#do Colégio  S. Francisco de assis,secretaria@csfa-luanda.com 


#do Complexo Escolar Privado darcan, cepdarcan@gmail.com
#do Complexo Escolar Privado darcan, darcanservice@yahoo.com.br
#do Colégio Maple Bear angola,mbbenfica@maplebearafrica.com`


const GetEmails = ()=>{
  let dt = list.split("#");
  for (let i = 0; i < dt.length; i++) {
      const el = dt[i].split(","); 
      if(el.length >= 2){  
          setContacts([...Contacts, {Email:el[1] ,Username:el[0]}]);   
        } 
   } 
} 



const getEmails =  ()=>{
  let mails = JSON.parse(localStorage.getItem("eduallcontacts")) 
  const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  const data = [];
  for (let i = 0; i < mails.length; i++) {
    if(emailRegexp.test(mails[i].Email)){ 
      data.push({Email:mails[i].Email  ,Username:mails[i].Username})
    }  
  } 
  setContacts(data);
}

useEffect(()=>{
    getEmails()
},[]);
 
 

  let  ContactList =   [];
  


  const AddContactToList  =  (user, email)=>{
    GetEmails();
    console.log(ContactList);

    console.log(user, email)
    if(user === null && email === null) return false;
        setEmail(null);
        setUser(null);  
        document.querySelector("#emailfd").value = "";
        document.querySelector("#namefd").value = ""; 
        setContacts([...Contacts, {Email:email ,Username:user}]) 
        localStorage.setItem("eduallcontacts", JSON.stringify(Contacts));
  }




  const FormSubmit = (e)=>{  
     e.preventDefault();   
     let x = 0;
     let f = 0;
     console.clear() 
     if(document.querySelector("form .custom-editor").innerHTML !== ""){
        for (let i = 0; i < Contacts.length; i++) {
            let Contact = Contacts[i];
            Contact.Message  =  document.querySelector("form .custom-editor").innerHTML;
            Contact.Header  =  "Prezado Director(a) "+Contact.Username;
            Contact.Title =  MessageTitle;
 
            
            axios.post(FORMURL[0], Contact).then(()=>{
              toast.success("Email enviado para "+ Contact.Email+ " Com sucesso !");
              x++
              setTotal(x)
            })
            .catch((error)=>{
              toast.error("Erro ao enviar email para  "+Contact.Email)
                f++
                setTotalf(f);
            }); 

            
        }
     }else{
        toast.error("Adicione uma mensagem");
     }
  };

 


  return (
    <Container>
        <Form onSubmit={FormSubmit}> 
            <div className="form-box"> 
              <h1>Enviar emails</h1> 
              <div className="form-div">
               <div className="d-flex">
               <Form.Group className="mb-3" >
                <Form.Label>Nome</Form.Label>
                <Form.Control type="text" id='namefd' onChange={(e)=>setUser(e.target.value)}   placeholder="Pedro" />
            </Form.Group>
            <div className="pd-1"></div>
            <Form.Group className="mb-3" >
                <Form.Label>Email</Form.Label> 
                <div className="ed-flex">
                  <Form.Control type="email" id='emailfd' onChange={(e)=>setEmail(e.target.value)}  placeholder="pedro@example.com" />
                   <div className="pd-1"></div>
                   <div className='btn bg-danger' style={{height:"40px"}}  onClick={()=>AddContactToList(User, Email)} >+</div>
                </div>
            </Form.Group> 
               </div>
               </div> 
                <div className="mt-2 mb-2">
                <Form.Group className="mb-3" >
                    <Form.Label>Titulo</Form.Label>
                    <Form.Control type="text" onChange={(e)=>sendMessageTitle(e.target.value)} required placeholder="eduallsys" />
                </Form.Group>
                </div>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Mensagem</Form.Label>
                    <div className="custom-editor mt-2 pd-1" contentEditable></div>
                   {/** <Form.Control as="textarea" id='message_text'  onChange={(e)=>sendMessageText(e.target.value)} required  rows={7} /> */}
                </Form.Group>
                <button className="btn btn-main">Enviar</button> 
              </div> 

                
            <div className="contact-list">
                <ul>
                    {Contacts.map((item, index)=>{
                        return(
                            <li className="ed-block mt-4">
                            <h5>{item.Username}</h5>
                            <span>{item.Email}</span>
                        </li>
                        )
                    })}
                </ul>
                <h1>Total : {Contacts.length} </h1>
                <h1>Enviados : {Total} </h1>
                <h1>Falhados : {Totalf} </h1>
            </div>



        </Form>
    </Container>
  )
}
const Container = styled.div`
  height:100vh;
  ]padding:20px;
  display:flex;
  align-items:center;
  justify-content:center;
  background:var(--ed-purple-light);


  form{
     padding:20px;
     border-radius:10px;
     background:var(--ed-white);
     box-shadow:var(--ed-shadow-df);
     display:flex;




     .custom-editor{
        max-height:300px;
        max-width:500px;
        overflow-y:auto;
        border:2px solid var(--ed-silver);
        height:400px;
        font-size:13px !important;
     }



     h1{
        font-size:20px;
        margin:10px 0px;;
     }

      

     .form-div{
        display:block;
     }


        ul{
            padding:0px; 
            max-height:500px;
            overflow-y:auto;
            width:360px;
            border:2px solid var(--ed-silver);
            height:500px;
            margin-left:20px;


        
            li{
                display:block;
                border-radius:10px;
                padding:10px;
                box-shadow:var(--ed-shadow-df);
                border:2px solid var(--ed-purple);
                
                  h5{
                     font-size:16px;
                     margin:0px;
                     font-weight:bolder;
                  }


                  span{
                       font-size:14px;
                       color:red;
                  }
            }
        }
  }


`;



export default MailBox