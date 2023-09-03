import   React, { useState } from 'react'; 
import Dialog from '@mui/material/Dialog'; 
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar'; 
import Slide from '@mui/material/Slide';
import styled from 'styled-components';
import { Close } from '@material-ui/icons';
import { Avatar, Checkbox, FormControlLabel } from '@mui/material';  
import CRValue from '../../../General/components/CRValue';
import ClearInputs from '../../../General/components/ClearInputs';
import Hoot from '../../../General/components/Hoot';
import axios from 'axios';
import {toast} from 'react-toastify';  
import CRValueStatus from '../../../General/components/CRValueStatus';
import { Button, Form } from 'react-bootstrap';
import { Save, Update } from '@mui/icons-material';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
}); 
 

function EditUserModal(props) {
    const [open, setOpen] = useState(false);
    const [form, setForm] = useState({});
    const [errors, setErrors] = useState({}); 

    const handleClickOpen = async() => {
      setOpen(true); 
        if(props.update){
         const response = await axios.get(FORMURL[0]); 
         if(response.data !== null){

            console.log(response.data.USER_INFORMATION);

             document.querySelector("#user_account_name1").value = response.data.USER_INFORMATION.ed_user_account_name;  
             INPUTS.user_account_name = response.data.USER_INFORMATION.ed_user_account_name; 

             document.querySelector("#user_account_charge1").value = response.data.USER_INFORMATION.ed_user_account_charge;  
             INPUTS.user_account_charge = response.data.USER_INFORMATION.ed_user_account_charge; 

        

 
             
 

         }
        } 
    };
  
    const handleClose = () => {
      setOpen(false);
    };


    const FORMURL = [ 
        props.get ? props.get : '',
        props.url ? props.url : '',
        Hoot()+"eduallcheckexistentuseraccountemail/",
    ];

    const OptionsMenu = [
      {menu_code:'mys',menu_name:'Módulo Minha escola'},
      {menu_code:'sec',menu_name:'Módulo Secretária'},
      {menu_code:'adm',menu_name:'Módulo Administração'},
      {menu_code:'fnc',menu_name:'Módulo Finanças'},
      {menu_code:'arpd',menu_name:'Módulo Área Pedagógica'}, 
      {menu_code:'tran',menu_name:'Módulo Transporte'},
      {menu_code:'lib',menu_name:'Módulo Biblioteca'},
      {menu_code:'sis',menu_name:'Módulo Sistema'},
      {menu_code:'conf',menu_name:'Módulo Configurações'},
      {menu_code:'prt',menu_name:'Portal de usúario)'}, 
    ]
  
    const INPUTS = { 
        user_account_name:CRValue(".special-dialog #user_account_name1"), 
        user_account_charge:CRValue(".special-dialog #user_account_charge1"),   

        access_myschool:CRValueStatus(".special-dialog #mys_checked"),
        access_secretary:CRValueStatus(".special-dialog #sec_checked"),
        access_admnistration:CRValueStatus(".special-dialog #adm_checked"),
        access_finance:CRValueStatus(".special-dialog #fnc_checked"),
        access_pedagogy:CRValueStatus(".special-dialog #arpd_checked"),
        access_transportation:CRValueStatus(".special-dialog #tran_checked"),
        access_library:CRValueStatus(".special-dialog #lib_checked"),
        access_system:CRValueStatus(".special-dialog #sis_checked"),
        access_configuration:CRValueStatus(".special-dialog #conf_checked"),
        access_portal:CRValueStatus(".special-dialog #prt_checked"),
    }

   const setField = (field, value)  =>{
    setForm({
        ...form,
        [field]:value
    })

    if(!!errors[field]){
         setErrors({
            ...errors,
            [field]:null
         });  
    }
}

const validateForm = ()=>{
    const {user_account_name, user_account_charge} = form; 
    const NewErrors = {}; 
    
    if(INPUTS.user_account_name ===  "" || INPUTS.user_account_name ===  " "){
    if(!user_account_name || user_account_name === '') NewErrors.user_account_name = 'Preencha o campo corretamente';  
    }else{if(!user_account_name){setField("user_account_name", INPUTS.user_account_name);}}
 
    if(INPUTS.user_account_charge ===  "" || INPUTS.user_account_charge ===  " "){
    if(!user_account_charge || user_account_charge === '') NewErrors.user_account_charge = 'Cargo invalido';
    }else{if(!user_account_charge){setField("user_account_charge", INPUTS.user_account_charge);}}
 
    return NewErrors;
}
 


const FormSubmit = (e)=>{  
    e.preventDefault();   
    const formErrors = validateForm();
      if(Object.keys(formErrors).length > 0){
           setErrors(formErrors);
           toast.error("Verifique todos os  campos");    
      }else{  
 
       const formData = new FormData();
       formData.append("user_account_name",INPUTS.user_account_name); 
       formData.append("user_account_charge",INPUTS.user_account_charge);  

       formData.append("access_myschool",INPUTS.access_myschool);
       formData.append("access_secretary",INPUTS.access_secretary);
       formData.append("access_admnistration",INPUTS.access_admnistration);
       formData.append("access_finance",INPUTS.access_finance);
       formData.append("access_pedagogy",INPUTS.access_pedagogy);
       formData.append("access_transportation",INPUTS.access_transportation);
       formData.append("access_library",INPUTS.access_library);
       formData.append("access_system",INPUTS.access_system);
       formData.append("access_configuration",INPUTS.access_configuration);
       formData.append("access_portal",INPUTS.access_portal); 
        
         const DataAction = async()=>{   
              const response = await axios.get(FORMURL[2]+`${INPUTS.user_account_email}`) 
              if (response.data.length >= 1){ 
                   const EmailError = {}
                   EmailError.user_account_email = "Este email já esta ser utilizado por alguem";
                   setErrors(EmailError);
              }else{  
                axios.put(FORMURL[1],formData).then((e)=>{   
                  toast.success("Conta de usúario atualizada com sucesso !");
                  console.log(e.data)
                  
                /*  SendEmailMessage("Eduallsys", "kiossoandredasilvacamuegi@hotmail.com", "testando as funcionalidades de mensagem");
                  setForm({});
                  ClearInputs(); */
        
                }).catch((error)=>{ 

                  toast.error("Lamentamos mas não foi  possivel executar esta ação");
                  console.log(error); 

                });   
              }  
            }  
          DataAction();  
      }    
};
   
   
   
   const handleInput = (e)=>{   
     switch (e.target.id) { 
         case "user_account_charge":
           setField("user_account_charge", e.target.value) 
           INPUTS.user_account_charge = e.target.value 
         break;   
         case "user_account_name":
           setField("user_account_name", e.target.value) 
           INPUTS.user_account_name = e.target.value 
         break;  
          case "mys_checked":
           setField("access_myschool", e.target.checked === false ? 0 : 1);
           INPUTS.access_myschool =  e.target.checked === false ? 0 : 1;
         break;  
         case "sec_checked":
          setField("access_secretary",  e.target.checked === false ? 0 : 1);
          INPUTS.access_secretary =  e.target.checked === false ? 0 : 1;
        break;  
        case "adm_checked": 
          setField("access_admnistration", e.target.checked === false ? 0 : 1) 
          INPUTS.access_admnistration = e.target.checked === false ? 0 : 1;
        break;  
        case "fnc_checked":
          setField("access_finance", e.target.checked === false ? 0 : 1) 
          INPUTS.access_finance = e.target.checked === false ? 0 : 1; 
        break;  
        case "arpd_checked":
          setField("access_pedagogy",e.target.checked === false ? 0 : 1) 
          INPUTS.access_pedagogy = e.target.checked === false ? 0 : 1; 
        break; 
        case "tran_checked":
          setField("access_transportation", e.target.checked === false ? 0 : 1) 
          INPUTS.access_myschool = e.target.checked === false ? 0 : 1; 
        break;  
        case "lib_checked":
         setField("access_library", e.target.checked === false ? 0 : 1) 
         INPUTS.access_library = e.target.checked === false ? 0 : 1;
       break;  
       case "sis_checked":
         setField("access_system", e.target.checked === false ? 0 : 1) 
         INPUTS.access_system = e.target.checked === false ? 0 : 1; 
       break;  
       case "conf_checked":
         setField("access_configuration", e.target.checked === false ? 0 : 1) 
         INPUTS.access_configuration = e.target.checked === false ? 0 : 1;
       break;  
       case "prt_checked":
         setField("access_portal", e.target.checked === false ? 0 : 1) 
         INPUTS.access_portal = e.target.checked === false ? 0 : 1;
       break;
     }   
   } 
  
    return (
      <div>
         <div onClick={handleClickOpen}>
            {props.toggle_btn ? props.toggle_btn : <></> }
         </div>
        <Dialog className='special-dialog'  fullScreen  open={open}  onClose={handleClose}  TransitionComponent={Transition}>
          <AppBar sx={{ position: 'relative' }}>
            <Toolbar>
             <div className="ed-space">
               <div className="title"><h1>Editar informações de usúario</h1></div> 
                <div onClick={handleClose} className="close-btn">
                    <Close/>
                </div>
             </div>
            </Toolbar>
          </AppBar> 
          <Content> 
          <Form onSubmit={FormSubmit} method='post' encType='multipart/form-data'>
                <Form.Group className="mb-3">  
                    <div>
                        <Form.Label>Nome completo</Form.Label>
                        <Form.Control  onChange={handleInput} className={!!errors.user_account_name && 'is-invalid'}  value={form.user_account_name} isInvalid={!!errors.user_account_name}  type="text"   
                        placeholder="" name='user_account_name' id="user_account_name1"  /> 
                        <Form.Control.Feedback type='invalid'>{errors.user_account_name}</Form.Control.Feedback>
                    </div>
            </Form.Group>   
            <Form.Group>  
                <div className="block mt-4 mb-4">
                    <Form.Label>Cargo</Form.Label>
                    <Form.Control  onChange={handleInput} className={!!errors.user_account_charge && 'is-invalid'} value={form.user_account_charge} isInvalid={!!errors.user_account_charge}
                        placeholder="" name='user_account_charge' id="user_account_charge1"  /> 
                    <Form.Control.Feedback type='invalid'>{errors.user_account_charge}</Form.Control.Feedback>
                </div>
               </Form.Group>
                   <Container> 
                           {OptionsMenu.map((item, index)=>{
                             return(
                              <article key={index}> 
                                  <div className="small-box"> 
                                       <FormControlLabel control={<Checkbox id={`${item.menu_code}_checked`}  onChange={handleInput}  />} label={item.menu_name} />
                                    </div> 
                              </article> 
                             )
                           })}
                       </Container>  
                </Form>
          </Content>
         <div className="dialog-footer">
           <div className="flex-end">
                <Button className='bg-light text-dark' onClick={handleClose}> Cancelar </Button>
                <Button className="btn btn-main ml-2" type="submit">{ props.title ? <Update /> : <Save/>  }   { props.title ? props.title : 'Salvar' } </Button>
            </div>
         </div>  
        </Dialog>
      </div>
    );
}

export default EditUserModal




const Content = styled.div`
  max-height:92vh;
  height:92vh;
  padding:20px;
  overflow-y:auto;

  &::-webkit-scrollbar{
    width:6px;
    background-color:transparent;
 }

 &::-webkit-scrollbar-thumb{
    background:rgb(219, 219, 219); 
 }
 
`;
 
  
const Container = styled.div`   
padding-right:10px;
 

article{
 width:100%;

 label{
     width:100%;
 }

 .small-box{  
     margin:10px 0px;
     min-height:50px;
     padding:5px 10px;
     border-radius:6px;
     width:100%;  
     display:flex;
     align-items:center;
     cursor:pointer;
     border:1px solid var(--ed-silver-light); 
 }


ol{
   display:block;

     span{
         font-size:15px;
     }
 }

}



`;