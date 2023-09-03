import React, {useEffect, useRef, useState} from 'react'
import styled from 'styled-components' 
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {Modal, Form, Button, Badge} from 'react-bootstrap'
import { AccessTimeOutlined, Check, Close, DeleteOutline, InfoOutlined, Remove, Save ,  MonetizationOn} from '@mui/icons-material';
import DraggableModal from '../../../General/components/DraggableModal'; 
import axios from 'axios';
import Hoot from '../../../General/components/Hoot';
import { Avatar, Checkbox, FormControlLabel, Radio, RadioGroup, getStepButtonUtilityClass } from '@mui/material'; 
import FileUpload from '../../../General/components/FileUpload';
import ClearInputs from '../../../General/components/ClearInputs'; 
 import { RichTextEditor } from '../../../General/components/RichTextEditor';
import CRValue from '../../../General/components/CRValue';
import {toast} from 'react-toastify';
import { Update } from '@material-ui/icons';
import { AcademicYearDataOptions, ServiceDataOptions, StudentsDataOptions ,GetInstituteCode, StudentsArray, GetAcademicYearCodebyclass, GetAcademicYearcode_byclass, GetServicePrice} from '../../../General/components/InstituteData';
import { MultiSelect } from 'react-multi-select-component';
import SelectSearch from 'react-select-search';
import RandomCodeGenerator from '../../../General/components/RandomCodeGenerator';
import NotFounded from '../../../General/components/NotFounded';
import { HiOutlineDocumentText } from 'react-icons/hi';
import ReduceTextLength from '../../../General/components/ReduceTextLength';
import DeleteModal from '../elements/DeleteModal';
import NumberToBytes from '../../../General/components/NumberToBytes';
import RefreshList from '../../../General/components/RefreshList';
import KeyShortcut from '../../../General/components/KeyShortcut';
import StudentDetailsMenu from '../elements/StudentDetailsMenu';
import SaveButton from '../elements/SaveButton';
import { months } from 'moment/moment';
import Loader from '../../../General/components/Loader';
import NumberToPrice from '../../../General/components/NumberToPrice'; 
import { Animated } from 'react-animated-css';
import AnimatedModal from '../../../General/components/AnimatedModal';

function NewfeeManualPaymentModal(props) {
    let SH = (props.pop && props.pop === true) ? true : false;
    const [show, setShow] = useState(false);
    const [form, setForm] = useState({});
    const [errors, setErrors] = useState({});
    const [Files, setFiles] = useState([]);
    const [Select, setSelected] = useState([]);
    const [CurrentFiles, SetCurrentFiles] = useState([]); 
    const [studentCode, setStudentCode] = useState(null);   
    const [Docfile, setDocfile] = useState(false);
    const [PaymentType , setPaymentType] = useState(null);
    const [serviceCode, setServiceCode] = useState(null);
    const [servicePrice, setServiceprice] = useState(null);
    const [serviceCoin, setServiceCoin] = useState('');  
    const [Months , SetMonths] = useState('');
    const [InvoiceValue, SetInvoiceValue] = useState(0);  
    const [Balance, SetBalance] = useState(''); 
    const [serviceDiscount, setServiceDiscount] = useState(0);
    const [serviceIva, setServiceIva] = useState(0);
    const [serviceFine, setServiceFine] = useState(0);
    const [CurrentMonth, setCurrentMonth] = useState();
    const [CurrentService, setCurrentService] = useState();
    const [CurrentAcademicYear, setCurrentAcademicYear] = useState();
    const [CurrentPaymentMethod, setCurrentPaymentMethod] = useState(); 
    const [PaymentMonths, setPaymentMonths] = useState([]);
    const [MonthOptions, setMonthOptions] = useState([]);
    const [ServiceFineData, SetServiceFineData] = useState([]);
    const [serviceFineType, setServiceFineType]  = useState(0);
    const [ParentsData, SetParentsData] = useState([]);
    const [ApplyDiscount, setApplyDiscount] = useState(null);
    const [ApplyFine,  setApplyFine] = useState(null);
    const [RegisterStatus, setRegisterStatus] = useState(null);
    const [Founded, SetFounded] = useState(null);
    const [NonePaidMonths, setNonePaidMonths] = useState(0);
    const [FeePaymentCode, setFeePaymentCode] = useState(null);


    const ChildRef = useRef();
    const handleClose = () => {
      setShow(false);
      SH = false;
    } 

    let studentData = [];
    let serviceData = [];
    let StaticMonths = ''; 

    const handleShow = () => {
       setShow(true);   
          setTimeout(() => {  
            GET_DATA(); 
         }, 500);   
    };

     
  const INPUTS = {
        feepayment_place:CRValue("#feepayment_place"), 
        feepayment_discount:ApplyDiscount ? serviceDiscount : 0, 
        feepayment_bank:CRValue("#feepayment_bank"), 
        feepayment_price:(servicePrice), 
        feepayment_invoice:CRValue("#feepayment_invoice"),  
        feepayment_servicevalue:serviceCode,    
        feepayment_academic_year:null, 
        feepayment_student_value:props.student_code ? props.student_code : studentCode,  
        feepayment_place:CRValue("#feepayment_place"), 
        feepayment_bordereux_number:CRValue("#feepayment_bordereux_number"),
        feepayment_type:CRValue("#feepayment_type"),
        feepayment_months:Months, 

        feepayment_balance:Balance,
        feepayment_Iva: serviceIva*1,
        feepayment_fineType:serviceFineType ,
        feepayment_fineValue: ApplyFine ? serviceFine : 0 , 

        feepayment_files:Files,
        feepayment_code:props.update ? FeePaymentCode : RandomCodeGenerator(300), 
        feepayment_student_code:studentCode,
        institute_value:GetInstituteCode()
  }; 

  const FORMURL = [
      Hoot()+"eduallregisterfeepayment/post/",
      Hoot()+"eduallfeepaymentcheckpaidmonth/",
      Hoot()+"eduallsingleserviceapi/get/", 
      props.get ? props.get : '',
      props.url ? props.url : '',
      Hoot()+"eduallsinglestudentapi/get/", 
      Hoot()+"eduallsingleclassapi/get/", 
      Hoot()+"eduallsingleacademicyearapi/get/",
      Hoot()+"eduallfilesregister/post/", 
      Hoot()+'eduallsingleuserfiles/get/',
      Hoot()+"eduallgetsinglefinebyservice/get/",
      Hoot()+"eduallparents/get/",
      Hoot()+"eduallgetsingleinstitute/get/1"
  ]; 
  
  const showBoxFile = ()=>{ 
    if(Docfile === true){
      setDocfile(false)
    } else {
      setDocfile(true);
    }
  } 


  const MonthsList = ["Janeiro", "Fevereiro", "Março",
  "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro",
  "Outubro", "Novembro", "Dezembro"]; 


  const GetPaidMonth = (e)=>{
      for(let i = 0; i < PaymentMonths.length; i++) { 
         let p = PaymentMonths[i];   
           if((p.value*1) !== null){ 
               if((p.value*1) === (e*1)) return  p.label;
           }
      }
      return "# "+e+" #";
  }
  
const GetFiles = (e)=>{
  setFiles(e);
}

 
 
  async function GET_DATA(){
     if(props.update){ 
      const response = await axios.get(FORMURL[3]);  
      console.log("working on it ....")
      if(response.data !== null){
        if(response.data.length >= 1){
          SetFounded(true);
          const responseFiles = await axios.get(FORMURL[9]+response.data[0].ed_fee_payment_code); 
          if(responseFiles.data.length >= 1)  SetCurrentFiles(responseFiles.data);
   
            INPUTS.feepayment_months = ''+response.data[0].ed_fee_payment_month+''; 
            StaticMonths = ''+response.data[0].ed_fee_payment_month+'';
 

            document.querySelector("#feepayment_place").value = response.data[0].ed_fee_payment_place ; 
            INPUTS.feepayment_place = response.data[0].ed_fee_payment_place ;
            
            document.querySelector("#feepayment_bordereux_number").value = response.data[0].ed_fee_payment_bordereux; 
            INPUTS.feepayment_bordereux_number = response.data[0].ed_fee_payment_bordereux;
            
            document.querySelector("#feepayment_bank").value = response.data[0].ed_fee_payment_bank; 
            INPUTS.feepayment_bank = response.data[0].ed_fee_payment_bank ;
            
            
            document.querySelector("#feepayment_servicecode").value = response.data[0].ed_fee_payment_servicecode; 
            INPUTS.feepayment_servicecode = response.data[0].ed_fee_payment_servicecode ;

            document.querySelector("#feepayment_type").value = response.data[0].ed_fee_payment_type ; 
            INPUTS.feepayment_type = response.data[0].ed_fee_payment_type ;
             
            INPUTS.feepayment_price = response.data[0].ed_fee_payment_price;
            setFeePaymentCode(response.data[0].ed_fee_payment_code);

            setTimeout(() => { 
              setCurrentMonth(response.data[0].ed_fee_payment_month); 
              setCurrentService(response.data[0].ed_fee_payment_service);
              setCurrentAcademicYear(response.data[0].ed_fee_payment_academic_year);
              setCurrentPaymentMethod(response.data[0].ed_fee_payment_type);
              setPaymentType(response.data[0].ed_fee_payment_type*1 !== 0 ? 1 : null);
              setStudentCode(response.data[0].ed_fee_payment_student);  
              setServiceCode(response.data[0].ed_fee_payment_service);    
              setField("feepayment_months", ''+response.data[0].ed_fee_payment_month+'');  
              SetMonths(''+response.data[0].ed_fee_payment_month+'');   

               GetStudentCode(response.data[0].ed_fee_payment_student);
               ServiceData(response.data[0].ed_fee_payment_service, 1, response.data[0].ed_fee_payment_student);
            }, 600);

        }else{
          SetFounded(false);
        }
      }else{
        SetFounded(false);
      }
     }  
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
   

  let FormValidateErrors = [];

  async function validateForm(){ 
     let NewErrors = {};
      const GetError = async()=>{ 

        const {feepayment_academic_year, feepayment_student_code, feepayment_servicecode, 
          feepayment_months, feepayment_type, feepayment_balance, feepayment_place, feepayment_bank, 
          feepayment_bordereux_number} = form; 
          setRegisterStatus(0); 
          console.clear();
          const monthError = []; 


          console.log(form);
          console.log(INPUTS);

      
        if (studentCode !== null) {
          if(props.update){
            if(INPUTS.feepayment_months*1 !== CurrentMonth) {    
              const response = await axios.get(FORMURL[1]+`${INPUTS.feepayment_months*1}`+ 
              "," +`${Math.floor(studentCode)}`+","+`${Math.floor(feepayment_academic_year)}`); 
              if(response.data.length >= 1) { 
                monthError.push(INPUTS.feepayment_months*1);
                NewErrors.feepayment_months  = INPUTS.feepayment_months*1 
              };  
            }
          } else {
            let TotalMonths = INPUTS.feepayment_months.split(","); 
             for(let i = 0; i < TotalMonths.length; i++) {
                if(TotalMonths[i] !== ""){
                   if(Math.floor(TotalMonths[i]) >= 0){ 
                    const response = await axios.get(FORMURL[1]+`${(TotalMonths[i]*1)}`+"," +`${Math.floor(studentCode)}`+ 
                    ","+`${Math.floor(feepayment_academic_year)}`);  
                   if(response.data.length >= 1) {  
                       monthError.push(TotalMonths[i]*1);
                       NewErrors.feepayment_months  = TotalMonths[i]*1; 
                    };   
                  }
              }
           } 
          }
        }  


        if(INPUTS.feepayment_academic_year === "" || INPUTS.feepayment_academic_year === " "){
          if(!feepayment_academic_year || feepayment_academic_year === '') NewErrors.feepayment_academic_year = 'Ano acdemico invalido';  
          }else{if(!feepayment_academic_year){setField("feepayment_academic_year", INPUTS.feepayment_academic_year);}} 
    
          if(INPUTS.feepayment_student_code === "" || INPUTS.feepayment_student_code === " "){
          if(!feepayment_student_code || feepayment_student_code === '') NewErrors.feepayment_student_code = 'Estudante invalido';  
          }else{if(!feepayment_student_code){setField("feepayment_student_code", INPUTS.feepayment_student_code);}}  
           
          if(studentCode === null) NewErrors.feepayment_student_code = 'Selecione um estudante';    
    
          if(INPUTS.feepayment_servicecode === "" || INPUTS.feepayment_servicecode === " "){
          if(!feepayment_servicecode || feepayment_servicecode === '') NewErrors.feepayment_servicecode = 'Serviço  invalido';  
          }else{if(!feepayment_servicecode){setField("feepayment_servicecode", INPUTS.feepayment_servicecode);}} 
    
          
          if(INPUTS.feepayment_servicecode === null){ NewErrors.feepayment_servicecode = 'Selecione um serviço valido';} 
    
         if(studentCode !== null){   
            if(!props.update){
              if(Select.length === 0){
                NewErrors.feepayment_months = 'Selecione os meses a pagar'  
              }else{
                if(INPUTS.feepayment_months === "" || INPUTS.feepayment_months== " "){
                  if(!feepayment_months || feepayment_months === '') {
                    NewErrors.feepayment_months = 'O mês selecionado é invalido' 
                     };  
                  }else{if(!feepayment_months){setField("feepayment_months", INPUTS.feepayment_months);}}     
              }  
            }else{
              if(feepayment_months === '' || feepayment_months === null){ 
                  NewErrors.feepayment_months = 'O mês selecionado é invalido 1' 
                }else{ 
                  if(CRValue("#feepayment_months")*1 >= 0) {
                    setField("feepayment_months", CRValue("#feepayment_months")*1);  
                    INPUTS.feepayment_months = CRValue("#feepayment_months")*1;
                  }else{
                    if(INPUTS.feepayment_months === "" || INPUTS.feepayment_months ===  " "){
                      if(!feepayment_months || feepayment_months === '') { 
                        NewErrors.feepayment_months = 'O mês selecionado é invalido' 
                         };  
                      }else{if(!feepayment_months){setField("feepayment_months", INPUTS.feepayment_months);}}   
                  }  

                  if((INPUTS.feepayment_months*1) !== (CurrentMonth*1)){
                      NewErrors.feepayment_months = 'Não é possivel trocar o mês de pagamento ao atualizar'; 
                  }
                }  
            } 
         } 
    
         
          if(INPUTS.feepayment_type === "" || INPUTS.feepayment_type === " "){
          if(!feepayment_type || feepayment_type === '') NewErrors.feepayment_type = 'Tipo de pagamento invalido';  
          }else{if(!feepayment_type){setField("feepayment_type", INPUTS.feepayment_type);}}
          
          if(INPUTS.feepayment_type*1 !== 0){
             if(INPUTS.feepayment_bank === "" || INPUTS.feepayment_bank== " "){
              if(!feepayment_bank|| feepayment_bank=== '') NewErrors.feepayment_bank= 'Banco invalido';  
              }else{if(!feepayment_bank){setField("feepayment_bank", INPUTS.feepayment_bank );}}  
          
              if(INPUTS.feepayment_place === "" || INPUTS.feepayment_place === " "){
              if(!feepayment_place|| feepayment_place === '') NewErrors.feepayment_place = 'Local de pagamento invalido';  
              }else{if(!feepayment_place){setField("feepayment_place", INPUTS.feepayment_place);}}  
    
              if(INPUTS.feepayment_bordereux_number === "" || INPUTS.feepayment_bordereux_number === " "){
              if(!feepayment_bordereux_number || feepayment_bordereux_number === '') NewErrors.feepayment_bordereux_number = 'Borderô invalido';  
              }else{if(!feepayment_bordereux_number){setField("feepayment_bordereux_number", INPUTS.feepayment_bordereux_number );}}  
          }else{
            INPUTS.feepayment_place = "";
            INPUTS.feepayment_bank = "";
            INPUTS.feepayment_bordereux_number = "";
            setField("feepayment_bordereux_number", "");
            setField("feepayment_place", "");
            setField("feepayment_type", "");
          }
     
         
      }
      GetError();  
      setTimeout(() => { 
         FormValidateErrors = [];
         FormValidateErrors.push(NewErrors);
         return NewErrors;
      }, 100);
  }
 


 async function ServiceData(e, amount, STCODE){  
    console.clear(); 
    console.log(StaticMonths);
    console.log(studentCode); 

    let val = CRValue("#feepayment_servicecode");  
    try {
       if(e !== "CALC"){
        const [response, ParentsResponse, StudentData, response2] = await  Promise.all([
          axios.get(FORMURL[2]+`${e}`),
          axios.get(FORMURL[11]),
          axios.get(FORMURL[5]+STCODE),
          axios.get(FORMURL[2]+`${val}`)
      ]) 
  
        if(serviceCode !== null) {  
         if (response.data.length >= 1) { 
             serviceData = response.data[0];  
                const FineResponse = await axios.get(FORMURL[10]+response.data[0].ed_service_id); 
                let FNDATA = []; 
                let PRTDATA = []; 
  
                if(FineResponse.data.length >= 1){ 
                  SetServiceFineData(FineResponse.data[0]);
                  FNDATA.push(FineResponse.data[0]);  
                  if(ParentsResponse.data.length >= 1){  
                    if(StudentData.data.length >=1){ 
                    if(studentData.length  === 0  & STCODE !== null){
                        studentData = StudentData.data[0]; 
                     }
  
                      ParentsResponse.data.map((item,index)=>{
                        let students = item.ed_parent_students_code.split("|");
                        for(let i = 0; i < students.length; i++){
                            if(students[i] !== ""  & students[i] !== null & 
                                students[i] !== undefined & students[i] !== ""){
                                   
                                if(students[i] === StudentData.data[0].ed_student_code){ 
                                  PRTDATA.push(item);
                                } 
  
                            }
                          }
                        }) 
                        SetParentsData(PRTDATA)
                    } 
                  }else{ 
                      if(studentData.length  === 0  & STCODE !== null){ 
                          if(StudentData.data.length >= 1){ 
                            studentData = StudentData.data[0];  
                       }
                     } 
  
                  } 
                }else{ 
                  if(studentData.length  === 0  & STCODE !== null){ 
                      if(StudentData.data.length >=1){ 
                        studentData = StudentData.data[0];  
                   }
                 }  
                }
              //end  
            setServiceprice(response.data[0].ed_service_price);
            setServiceCoin(response.data[0].ed_service_coin);  
            CalculateTotal(amount, response.data[0], FNDATA, PRTDATA);
           }  
        }else{   
           if(val !== null && val !== undefined) {
             setServiceCode(val); 
             if (response2.data.length >= 1){  
                serviceData = response2.data[0];
  
                    // FINE DATA HERE
                    const FineResponse = await axios.get(FORMURL[10]+response2.data[0].ed_service_id); 
                    let FNDATA = []; 
                    let PRTDATA = []; 
  
                    if(FineResponse.data.length >= 1){ 
                      SetServiceFineData(FineResponse.data[0]);
                      FNDATA.push(FineResponse.data[0]); 
                      if(ParentsResponse.data.length >= 1){ 
                        if(StudentData.data.length >=1){ 
                          if(studentData.length  === 0  & STCODE !== null){
                             studentData = StudentData.data[0]; 
                          }
  
                          ParentsResponse.data.map((item,index)=>{
                            let students = item.ed_parent_students_code.split("|");
                            for(let i = 0; i < students.length; i++){
                                if(students[i] !== ""  & students[i] !== null & 
                                   students[i] !== undefined & students[i] !== ""){ 
  
                                   if(students[i] === StudentData.data[0].ed_student_code){
                                       PRTDATA.push(item);  
                                   }
                                }
                              }
                           }) 
                           SetParentsData(PRTDATA)
                        } 
                      }else{ 
  
                        if(studentData.length  === 0  & STCODE !== null){ 
                              if(StudentData.data.length >=1){ 
                                studentData = StudentData.data[0];  
                            }
                          } 
                       } 
  
                    }else{
  
  
                         
                      if(studentData.length  === 0  & STCODE !== null){ 
                          if(StudentData.data.length >=1){ 
                            studentData = StudentData.data[0];  
                       }
                     } 
  
                    }
                  //end 
                    
                    
                 setServiceprice(response.data[0].ed_service_price);
                 setServiceCoin(response.data[0].ed_service_coin); 
                 CalculateTotal(amount, response.data[0], FNDATA, PRTDATA);
  
  
             }
           }  
        } 
       } else {  
        const [response, ParentsResponse, StudentData, response2] = await  Promise.all([
          axios.get(FORMURL[2]+`${val}`),
          axios.get(FORMURL[11]),
          axios.get(FORMURL[5]+STCODE),
          axios.get(FORMURL[2]+`${val}`)
      ]) 
  
        if (response.data.length >= 1) {  
            serviceData = response.data[0]; 
             // FINE DATA HERE
               const FineResponse = await axios.get(FORMURL[10]+response.data[0].ed_service_id); 
               let FNDATA = []; 
               let PRTDATA = []; 
  
               if(FineResponse.data.length >= 1){ 
                 SetServiceFineData(FineResponse.data[0]);
                 FNDATA.push(FineResponse.data[0]); 
                 if(ParentsResponse.data.length >= 1){
   
                   if(StudentData.data.length >=1){ 
                    if(studentData.length  === 0  & STCODE !== null){
                        studentData = StudentData.data[0]; 
                    } 
                     ParentsResponse.data.map((item,index)=>{
                       let students = item.ed_parent_students_code.split("|");
                       for(let i = 0; i < students.length; i++){
                           if(students[i] !== ""  & students[i] !== null & 
                               students[i] !== undefined & students[i] !== ""){
                                  
                               if(students[i] === StudentData.data[0].ed_student_code){ 
                                 PRTDATA.push(item);
                               } 
  
                           }
                         } 
                       }) 
                       SetParentsData(PRTDATA)
                   } 
                 }else{ 
                  if(studentData.length  === 0  & STCODE !== null){ 
                      if(StudentData.data.length >=1){ 
                        studentData = StudentData.data[0];  
                   }
                 }   
                 } 
               }else{ 
                if(studentData.length  === 0  & STCODE !== null){ 
                    if(StudentData.data.length >=1){ 
                      studentData = StudentData.data[0];  
                 }
                }  
               }
             //end  
           setServiceprice(response.data[0].ed_service_price);
           setServiceCoin(response.data[0].ed_service_coin); 
           CalculateTotal(amount, response.data[0], FNDATA, PRTDATA);
  
        }   
       }
    } catch (error) {
      
    } 
 }  

 

    const FormSubmit = (e)=>{  
      e.preventDefault();    
       validateForm();    
        setTimeout(() => {
          const formErrors = FormValidateErrors[0]; 
          if(Object.keys(formErrors).length > 0){ 
              setErrors(formErrors);  
              toast.error("Verifique todos os  campos");  
              setRegisterStatus(1);   
           }else{    
          
           let {feepayment_academic_year} = form;
           INPUTS.feepayment_academic_year = feepayment_academic_year; 
           INPUTS.feepayment_servicecode = serviceCode; 
          
           function UploadPaymentFiles(){  
              if(Files.length >= 1){
                  for(let i = 0; i < Files[0].length; i++) {
                    const file = Files[0][i];   
                    const fileData = new FormData();
                    let extension = "pdf" 
                    fileData.append("file_name", file);
                    fileData.append("file_code",INPUTS.feepayment_code);
                    fileData.append("file_size",file.size);
                    fileData.append("file_type",file.type);
                    fileData.append("file_use", "feepayment_register");
                    fileData.append("file_extension", extension);  
          
                    axios.post(FORMURL[8] , fileData)
                    .then((e)=>{     
                       if(i === (Files[0].length - 1)){
                          alert("ok")
                       };    
                    }).catch((error)=>{
                      toast.error(`Lamnentamos mas não foi possivel salvar o ${i+1}ª ficheiro anexado`);   
                      console.log(error); 
                    });  
                  }   
              }    
           }
          
           function Update() { 
             setForm({}); 
              ClearInputs();
              ChildRef.current.ClearFiles();  
              setMonthOptions([]);
              SetMonths('');
              setSelected([]);
              SetInvoiceValue('0 ' + serviceCoin);   
              SetBalance(''); 
              RefreshList(`.el-refresh-list_${INPUTS.feepayment_student_code}`); 
              setRegisterStatus(2);
              setNonePaidMonths(0);
              StaticMonths = '';
              setFiles([]); 
              setTimeout(() => {
                 if(props.update) setShow(false);
               }, 1000);
           } 
          
             if(!props.update){   
                 const registerData = async()=>{ 
                  setRegisterStatus(0);  
                  let SplitedMonths = INPUTS.feepayment_months.split(",");
                  let TotalMonths = [];
                  for (let i = 0; i < SplitedMonths.length; i++) {
                        if (SplitedMonths[i] !== '' && SplitedMonths[i] !== ',' && SplitedMonths[i]*1 !== undefined && SplitedMonths[i]*1 !== null 
                        && SplitedMonths[i]*1 !== NaN && SplitedMonths[i]*1 >= 0){
                            TotalMonths.push(SplitedMonths[i]*1);
                        }
                  }  
                
                  for (let i = 0; i < TotalMonths.length; i++) {
                    if(TotalMonths[i] !== ""){
                       if((TotalMonths[i]*1) >= 0){ 
                          const response = await axios.get(FORMURL[1]+`${TotalMonths[i]}`+ "," +`${Math.floor(INPUTS.feepayment_student_code)}`+","+`${INPUTS.feepayment_academic_year}`);             
          
                            if(response.data.length <= 0){
                              const formData = {
                                  feepayment_place:INPUTS.feepayment_place,
                                  feepayment_code:INPUTS.feepayment_code,
                                  feepayment_discount:INPUTS.feepayment_discount,
                                  feepayment_bank:INPUTS.feepayment_bank,
                                  feepayment_price:INPUTS.feepayment_price,
                                  feepayment_servicecode: INPUTS.feepayment_servicecode,
                                  feepayment_academic_year:INPUTS.feepayment_academic_year,
                                  feepayment_student_code:INPUTS.feepayment_student_code, 
                                  feepayment_bordereux_number:INPUTS.feepayment_bordereux_number,
                                  feepayment_months: TotalMonths[i]*1,
                                  feepayment_type:INPUTS.feepayment_type,
                                  feepayment_balance:INPUTS.feepayment_balance, 
                                  feepayment_iva:serviceIva,
                                  feepayment_fineType: INPUTS.feepayment_fineType,
                                  feepayment_fineValue: INPUTS.feepayment_fineValue,
                              }; 

                              
                              axios.post(FORMURL[0], formData).then((e)=>{  
                                UploadPaymentFiles(); 
                                if(i === (TotalMonths.length-1)){ 
                                  toast.success("Pagamento de Propina efectuado  com sucesso !");  
                                  Update(); 
                                 }    
                              }).catch((error)=>{
                                  toast.error("Lamentamos mas não foi  possivel executar esta ação ***"); 
                                  setRegisterStatus(1);
                                  console.log(error); 
                              });   
                            }else{
                               toast.error(`O mês de ${GetPaidMonth(TotalMonths[i]*1)} já foi pago`);  
                            } 
                         } else{
                            toast.error("Nenhum mês foi selecionado");
                            setRegisterStatus(1);
                         }
                       }       
                    }   
                 }
                registerData();  
             } else { 
              const updateData = async()=>{   
                if(INPUTS.feepayment_months !== ""){
                  if((INPUTS.feepayment_months*1) >= 0){    
                    if((INPUTS.feepayment_months*1) === (CurrentMonth*1)){  
                          const formData = {
                            feepayment_place:INPUTS.feepayment_place,
                            feepayment_code:INPUTS.feepayment_code,
                            feepayment_discount:INPUTS.feepayment_discount,
                            feepayment_bank:INPUTS.feepayment_bank,
                            feepayment_price:INPUTS.feepayment_price,
                            feepayment_servicecode: INPUTS.feepayment_servicecode,
                            feepayment_academic_year:INPUTS.feepayment_academic_year,
                            feepayment_student_code:INPUTS.feepayment_student_code, 
                            feepayment_bordereux_number:INPUTS.feepayment_bordereux_number,
                            feepayment_months: CurrentMonth,
                            feepayment_type:INPUTS.feepayment_type,
                            feepayment_balance:INPUTS.feepayment_balance, 
                            feepayment_iva: serviceIva,
                            feepayment_fineType: INPUTS.feepayment_fineType,
                            feepayment_fineValue: INPUTS.feepayment_fineValue,
                        };   


                      console.log(formData);

                      axios.put(FORMURL[4], formData).then((e)=>{      
                        console.log("Make something new")
                        UploadPaymentFiles(); 
                        toast.success("Pagamento  de propina atualizado com sucesso  !");
                        Update();   
                       console.log(e.data);
                      }).catch((error)=>{
                          toast.error("Lamentamos mas não foi  possivel executar esta ação ");  
                          console.log(error);  
                      });  
                    }else{
                      toast.error("Não é possivel trocar o mês de pagamento ao atualizar");
                     } 
                    } else{
                      toast.error("Nenhum mês foi selecionado");
                    } 
                  }else{
                    toast.error("Lamentamos mas não foi  possivel executar esta ação "); 
                  }  
               }
              updateData();   
             }  
            }   
        }, 200); 
    };
 

  
    function selectedMonths(e){ 
       setSelected(e) 
       setField("feepayment_months", "month"); 
       var months = "";
       for (let i = 0; i < e.length; i++) {
             months += ","+e[i].value;
       } 
       SetMonths(months);  
       
       StaticMonths = months;
       console.log(StaticMonths)
       ServiceData("CALC", e.length, studentCode);
    }


    async function CalculateTotal(AMOUNT, SERVICEDATA, FINEDATA, PARENTSDATA){ 
        if(studentData !== null  && SERVICEDATA !== null){  
 
          let FINEVALUE = FINEDATA.length >= 1 ? (FINEDATA[0].ed_fine_value_type === 1 ? FINEDATA[0].ed_fine_value : Math.floor((PRICE * FINEDATA[0].ed_fine_value) / 100)) : 0;
          let CTFINEVALUE = FINEVALUE;
          let FINETYPE = FINEDATA.length >= 1 ? FINEDATA[0].ed_fine_value_type*1 : 0;
          let CURRENTDAY = new Date().getDay();
          let CURRENTYEAR = new Date().getFullYear();
          let FINEDAY = FINEDATA.length >= 1 ? FINEDATA[0].ed_fine_daysafterprevmonth : 0;
          let PARENTCHILDRENS = FINEDATA.length >= 1 ? (FINEDATA[0].ed_fine_for_scholarshipholders === 1 ? true : false) : false;
          let PRICE = SERVICEDATA.ed_service_price;
          let DISCOUNT = SERVICEDATA.ed_service_discount;
          let IVA = SERVICEDATA.ed_service_iva*1;
          setServiceFineType(FINETYPE); 
      
      
         /** calculate the total */   
 
         const InstituteIvaValue = await axios.get(FORMURL[12]);
         if(InstituteIvaValue.data.length >= 1){  

          const TOTAL = AMOUNT * PRICE; 
          let DCV = 0;
          let IVAV = (IVA <= 0 ? 0 : ((TOTAL  * InstituteIvaValue.data[0].ed_institute_iva_value)  / 100));
          console.log("CurentIva = "+ IVAV);
          setServiceIva(IVA > 0  ? InstituteIvaValue.data[0].ed_institute_iva_value : 0); 
     
          
          
         //APPLYNG FINE; DISCOUNT; IVA; According to student information and service options
     
         let Guardion = []; 
         for (let i = 0; i < PARENTSDATA.length; i++) {
             if(PARENTSDATA[i].ed_parent_guardion*1 === 1){
                let students = PARENTSDATA[i].ed_parent_students_code.split("|");
                for(let x = 0; x < students.length; x++) {
                   if(students[x] !== "" && students[x] !== null && students[x] !== " "){
                     Guardion.push(students[x]);
                   }
                }
     
             }
         }
     
      
       /***********************************  Discount */ 
       let discountStatus = false; 
       
       console.log(SERVICEDATA)
       console.log(studentData)

         if((SERVICEDATA.ed_service_scholarshipHolder*1 === 1 & studentData.ed_student_scholarshipHolder*1 === 1)){
           DCV = DISCOUNT <= 0 ? 0 : ((TOTAL  * DISCOUNT)  / 100);
           setServiceDiscount(DISCOUNT > 0 ? DISCOUNT : 0);  
           discountStatus = true; 
       } 
     
      if(SERVICEDATA.ed_service_guardionChildrens*1 >= 1){
        if((Guardion.length >= SERVICEDATA.ed_service_guardionChildrens*1)) {
           DCV = DISCOUNT <= 0 ? 0 : ((TOTAL  * DISCOUNT)  / 100);
           setServiceDiscount(DISCOUNT > 0 ? DISCOUNT : 0); 
           discountStatus = true; 
        } 
      } 
      if(discountStatus === false){
          setApplyDiscount(false);
          setServiceDiscount(DISCOUNT > 0 ? DISCOUNT : 0);
          DCV = 0;
      }else{
         setApplyDiscount(true);
      }
      /********************************** END */
     
     
     
     
     /***************************************** Fine  */  
     if(FINEDATA.length >= 1){
       if(FINEDATA[0].ed_fine_increment_value === 0){   
           let TotalMonths = StaticMonths.split(","); 
           const MonthsStatus = [];
     
     
           /// 1º check for paid nunpaid months
           for(let i = 0; i < TotalMonths.length; i++) {
               if(TotalMonths[i] !== ""){ 
                 if(TotalMonths[i]*1 > 0){
                   
                   let SHM = TotalMonths[i]*1;
                   if(SHM > 0){
                     const response = await axios.get(FORMURL[1]+`${(SHM)}`+ "," +`${Math.floor(studentCode)}`+","+`${Math.floor(2)}`);
                     console.log(FORMURL[1]+`${SHM}`+","+`${Math.floor(studentCode)}`+","+`${Math.floor(2)}`)
     
     
                     if(response.data.length >= 1){
                       for(let i = 0; i < response.data.length; i++){ 
                          console.log(response.data[i].ed_fee_payment_month*1 , SHM);
     
                           if(response.data[i].ed_fee_payment_month*1   === SHM){
                           MonthsStatus.push({month:SHM , status:'paid'});
                           }else{ MonthsStatus.push({month:SHM, status:'notpaid'});} 
     
                       }
                    }else{MonthsStatus.push({month:SHM , status:'notpaid'});}
     
                   } 
     
                 }
             }
           } 
            
           
         //2º add fine according to date
         for(let i = 0; i < MonthsStatus.length; i++) {
             if(MonthsStatus.length > 0){
     
                 let year = MonthsStatus[i].month+"";
                  if(year.split('.')[1]*1 === CURRENTYEAR*1){ 
                   if(MonthsStatus[i].status === "notpaid"){
                      if(FINEDAY <= CURRENTDAY){
                          MonthsStatus[i].fine = true;
                      }else{
                        if(FINEDAY >= CURRENTDAY){
                           MonthsStatus[i].fine = false;
                        }
                      }
                    }else{
                      MonthsStatus[i].fine = false; 
                    }
     
     
                  }else{
                   if(MonthsStatus[i].status === "notpaid"){
                      if(year.split('.')[1]*1  < CURRENTYEAR*1) {
                         MonthsStatus[i].fine = true;
                       }else{ 
                         MonthsStatus[i].fine = false; 
                       }
                    }else{
                      MonthsStatus[i].fine = false; 
                    } 
                  } 
                 
             }
          } 
     
     
          /// 3º Get months with fines
          let NonePaidMonths = [];
          for(let i = 0; i < MonthsStatus.length; i++) {
              if(MonthsStatus.length >= 1){
                   if(MonthsStatus[i].fine === true){
                       NonePaidMonths.push(i);
                   }  
               }
          }
     
     
          /// 4º Check if we can apply fine to this student and set fine
          let FineStatus = false; 
          if(FINEDATA.length >= 1){  
             setServiceFine(FINEVALUE);
              if((FINEDATA[0].ed_fine_for_scholarshipholders*1 === 0 & studentData.ed_student_scholarshipHolder*1 === 0)){
                   FineStatus = true; 
               }else if(FINEDATA[0].ed_fine_for_scholarshipholders*1 === 1 & studentData.ed_student_scholarshipHolder*1 === 0){
                   FineStatus = true; 
               }else if(studentData.ed_student_scholarshipHolder*1 === 1 & FINEDATA[0].ed_fine_for_scholarshipholders*1 === 1){
                   FineStatus = false; 
               } 
         
             if(FINEDATA[0].ed_fine_parentsChildrens*1 >= 1){
               if((Guardion.length >= FINEDATA[0].ed_fine_parentsChildrens*1)) { 
                   FineStatus = true; 
               } 
             } 
     
             if(FineStatus === false){
                 setApplyFine(false);
                 FINEVALUE = 0;
                 CTFINEVALUE = 0;
             }else{
               setApplyFine(true); 
               console.log("before apply = "+FINEVALUE);
               CTFINEVALUE = FINEVALUE;
               let NewFineValue = FINEVALUE * (NonePaidMonths.length === 0 ? 1 : NonePaidMonths.length);
               setNonePaidMonths(NonePaidMonths.length === 0 ? 1 : NonePaidMonths.length)
               FINEVALUE = NewFineValue;
               console.log("after apply = "+FINEVALUE);
             } 
          } 
     
       }else{
         /// Double fine for each late payment
     
     
       }
     }else{
      setServiceFine(0);
      setApplyFine(false);
      setNonePaidMonths(0);
     }
     /******************************************* END */
     
         if(StaticMonths !== ''){  
            setServiceCoin((serviceCoin === '' ?  SERVICEDATA.ed_service_coin : serviceCoin));
            SetInvoiceValue(NumberToPrice(TOTAL - DCV + IVAV+ FINEVALUE) +" "+ (serviceCoin === '' ?  SERVICEDATA.ed_service_coin : serviceCoin));   
            SetBalance(PRICE - DCV  + (IVA <= 0 ? 0 : ((PRICE  * InstituteIvaValue.data[0].ed_institute_iva_value)  / 100)) + CTFINEVALUE);
            console.log("###############################")
            console.log("Total = ", TOTAL);
            console.log("IVA = ",IVAV);
            console.log("Fine = ", FINEVALUE);
            console.log("Desconto = ", DCV)
         }else{
          SetInvoiceValue('0 ' + (serviceCoin === '' ?  SERVICEDATA.ed_service_coin : serviceCoin)); 
         }   



         } 
       }  
    }
      



   const GetStudentCode  = (e)=>{   
     setMonthOptions([]);
     SetMonths('');
     setSelected([]);
     SetInvoiceValue('');   
     SetBalance(''); 
     setStudentCode(null); 
     

      async function GetStudentData(){
        let StudentData = await axios.get(FORMURL[5]+e);
        if(StudentData.data.length >=1){ 

            studentData = StudentData.data[0];  

            let StudentClassData =  await axios.get(FORMURL[6]+StudentData.data[0].ed_student_class); 
            if(StudentClassData.data.length >= 1){ 
                let AcademicYearData = await axios.get(FORMURL[7]+StudentClassData.data[0].ed_class_year);

                INPUTS.feepayment_academic_year = StudentClassData.data[0].ed_class_year;
                setField("feepayment_academic_year",  StudentClassData.data[0].ed_class_year);

                if (AcademicYearData.data.length >= 1){ 
                  let CurrentAcademicYearData = AcademicYearData.data[0]; 
          
                  /// start getting the academic year data 
                  let M1, M2 = null;
                  let Y1, Y2 = null; 
                  M1 = CurrentAcademicYearData.ed_academic_year_startDate.split('-')[1]*1;
                  M2 = CurrentAcademicYearData.ed_academic_year_endDate.split('-')[1]*1;
                  Y1 = CurrentAcademicYearData.ed_academic_year_startDate.split('-')[0]*1;
                  Y2 = CurrentAcademicYearData.ed_academic_year_endDate.split('-')[0]*1;
                  
          
                  let CRY = Y2 - Y1 === 1 ? 1 : 0;
                  let DF = 12;   
              
                  if(M2 === 0 || M2 === null || M1 === 0 || M1 === null) return false;    
                    if (Y2 - Y1 <= 1) {
                       
                      if (CRY === 1){ 
                          if((M2*1) <= (M1*1)){ 
                          let CurrentMonthsOptions = [];
                          let EX = 0; 
                          let R = (DF - (M1*1) === 0 ? 1 : DF- (M1*1)) + (M2*1);
                          EX = R > DF ? R - DF : null;  
                          
                          
                          for(let i = (M1-1)+1; i <= 12; i++){   
                                  CurrentMonthsOptions.push({label:(MonthsList[i-1]  + " de "+ Y1)  ,selected:false, value:((i-1+"."+ Y1)*1)})
                              }
                      
                              if(EX !== 0 && EX !== null){
                                  for (let i = 0; i <= (EX -1); i++) { 
                                      CurrentMonthsOptions.push({label:(MonthsList[i-1] + " de "+ Y2)  ,selected:false, value:((i-1 +"."+ Y2)*1)})
                                  }
                              }   
                      
                              for(let i = 0; i <= (M2-1); i++) {  
                                  CurrentMonthsOptions.push({label:(MonthsList[i]  + " de "+ Y2)  ,selected:false, value:((i+"."+Y2)*1)  })
                              }   
                          
                      
                              setMonthOptions(CurrentMonthsOptions);
                              setPaymentMonths(CurrentMonthsOptions);
                              console.log("When m2 <= m1 academic year start and end at different years");
                      
                          }else{ 
                           let CurrentMonthsOptions = [];
                          let EX = M1 === M2 ? M2 : (M1 - M2 < 0 ? M2 : M1 - M2);
                          let DM = DF - M1;  
                      
                          
                          for(let i = (M1*1); i <= DF; i++) { 
                              CurrentMonthsOptions.push({label:(MonthsList[i-1]  + " de "+ Y1)  ,selected:false, value: ((i-1+"."+ Y1)*1)  })
                          }
                          
                      
                          if(EX >= 1){ 
                          for(let i = 1; i <= EX; i++) { 
                              CurrentMonthsOptions.push({label:(MonthsList[i-1]  + " de "+ Y2)  ,selected:false, value: ((i-1+ "."+ Y2)*1)  })
                          }
                          } 
                          setMonthOptions(CurrentMonthsOptions);
                          setPaymentMonths(CurrentMonthsOptions);
                          console.log("When m2 > m1 academic year start and end at different years");
                          console.log(CurrentMonthsOptions)
                          } 

                      }else{
                      let CurrentMonthsOptions = []; 
                       CurrentMonthsOptions.push({label:(MonthsList[(M1*1)-1]  + " de "+ Y1)  ,selected:false, value: ((((M1*1)-1)+"."+Y1)*1)     })
                      
                      if(M2 !== null){
                          for(let i = (M1*1)+1; i <= M2; i++) { 
                          CurrentMonthsOptions.push({label:(MonthsList[i-1]  + " de "+ Y1) ,selected:false, value: (((i-1)+"."+Y1)*1)})
                        }
                      }    
                       setMonthOptions(CurrentMonthsOptions);
                       setPaymentMonths(CurrentMonthsOptions);
                       console.log("When academic year start and end at same year");
 
                      }  
                      /// end 
 
                  }   
              }  
            }
        }  
      }
      GetStudentData();  
      setStudentCode(e);  
      setField("feepayment_student_code", e); 
      ServiceData(serviceCode, 1, e);
   }


     
      useEffect(()=>{
          if(SH){   
             handleShow(); 
          }
      },[props.pop])


    const handleInput = (e)=>{   
       switch (e.target.id) {   
          case "feepayment_months":
            StaticMonths = e.target.value; 
            INPUTS.feepayment_months = e.target.value
            setField("feepayment_months", e.target.value);
            SetMonths(e.target.value);
           break;  
           case "feepayment_servicecode": 
           if(StaticMonths === ''){StaticMonths = Months}; 
            setServiceCode(Math.floor(e.target.value));
            setField("feepayment_servicecode", e.target.value);
            INPUTS.feepayment_servicecode = e.target.value
            setTimeout(() => {   
              if(serviceCode !== null){
                   ServiceData(e.target.value, Select.length, studentCode);  
                }
          }, 500);

          break;   
          case "feepayment_type":
              setPaymentType(Math.floor(e.target.value) !== 0 ? 1 : null);
              setField("feepayment_type", e.target.value);
              INPUTS.feepayment_type = e.target.value
              if(e.target.value*1  >= 0){
                    if(e.target.value*1 !== 0){
                      INPUTS.feepayment_place = "";
                      INPUTS.feepayment_bank = "";
                      INPUTS.feepayment_bordereux_number = "";
                      setField("feepayment_bordereux_number", "");
                      setField("feepayment_place", "");
                      setField("feepayment_bank", ""); 
                    }
              }
          break;   
          case "feepayment_balance":
              setField("feepayment_balance", e.target.value);
              INPUTS.feepayment_balance = e.target.value
        break;    
        case "feepayment_invoice":
            setField("feepayment_invoice", e.target.value);
            INPUTS.feepayment_invoice = e.target.value
        break;   
        case "feepayment_bank":
            setField("feepayment_bank", e.target.value);
            INPUTS.feepayment_bank = e.target.value
        break;  
        case "feepayment_place":
            setField("feepayment_place", e.target.value);
            INPUTS.feepayment_place = e.target.value
        break;   
        case "feepayment_bordereux_number":
          setField("feepayment_bordereux_number", e.target.value);
          INPUTS.feepayment_bordereux_number = e.target.value; 
         break;   
         default:
       }
    }
 


    return (
      <div>
        <div onClick={handleShow}>
           {props.toggle_btn ? props.toggle_btn :  <button className='btn btn-main'><AddCircleOutlineIcon/>Efectuar pagamento de propina</button>}
      </div>
         <AnimatedModal content={
            <Modal size='lg' className='animate__animated animate__zoomInDown' 
            centered  dialogAs={DraggableModal}  show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title><h5>{ props.title ? props.title : 'Efectuar ' } pagamento de propina</h5></Modal.Title>
            </Modal.Header>
            <Form onSubmit={FormSubmit}>  
                <Modal.Body className='scrollLimit'>  
                    {props.update ?   
                            <>
                              {
                              Founded === null ? 
                                  <LoaderContainer>
                                      <Loader absolute small /> 
                                  </LoaderContainer>
                              :   
                              <>
                                  {  
                                  Founded === false ?
                                        <EmptyBox>
                                          <NotFounded />
                                        </EmptyBox>
                                        : 
                                      <div>
                                        {
                                          props.update ? <></> : 
                                          <Form.Group className="mb-3">
                                          <div className="ed-space">
                                            <div>
                                              <Form.Label>Nome do estudante <span className='text-danger ml-2'>*</span></Form.Label>
                                            </div>
                                            <div className='ed-flex'> 
                                                {studentCode !== null ? <StudentDetailsMenu student_id={studentCode}  toggle_btn={<div className='btn-pm-info'><InfoOutlined/></div>} /> : <></>}
                                            </div>
                                          </div>
                                          <div className={`select-search-item  ${errors.feepayment_student_code ? 'error': ''}`}>
                                            <SelectSearch  onChange={(e)=>GetStudentCode(e)}  value={studentCode} options={StudentsArray()[0]} search={true} 
                                              placeholder="Selecione um aluno" />
                                          </div>
                                          <small className="text-danger">{errors.feepayment_student_code}</small>
                                        </Form.Group>   
                                        } 
                                      {
                                        props.update ? 
                                        <Form.Group className="mb-3"  >
                                          <Form.Label>Serviço<span className="text-danger ml-2">*</span></Form.Label>
                                          <Form.Select onChange={handleInput} className={!!errors.feepayment_servicecode && 'is-invalid'} value={form.feepayment_servicecode} 
                                                isInvalid={!!errors.feepayment_servicecode} id="feepayment_servicecode">
                                            <ServiceDataOptions code={CurrentService} />
                                          </Form.Select>
                                          <Form.Control.Feedback type='invalid'>{errors.feepayment_servicecode}</Form.Control.Feedback>
                                          <div>
                                          {serviceCode === null ?  <div></div> : <div className='mt-2'><Badge className='bg-main-light'> 
                                            <div className="ed-flex">Valor do serviço  :  
                                                <div className="ml-1"><GetServicePrice ID={serviceCode} /></div>
                                                </div>  
                                              </Badge>
                                              </div>
                                              }
                                          </div>
                                        </Form.Group>   
                                        : 
                                        <Form.Group className="mb-3"  >
                                          <Form.Label>Serviço<span className="text-danger ml-2">*</span></Form.Label>
                                          <Form.Select onChange={handleInput} className={!!errors.feepayment_servicecode && 'is-invalid'} value={form.feepayment_servicecode} 
                                                isInvalid={!!errors.feepayment_servicecode} id="feepayment_servicecode">
                                            <ServiceDataOptions />
                                          </Form.Select>
                                          <Form.Control.Feedback type='invalid'>{errors.feepayment_servicecode}</Form.Control.Feedback>
                                          <div>
                                          {serviceCode === null ?  <div></div> : <div className='mt-2'><Badge className='bg-main-light'> 
                                            <div className="ed-flex">Valor do serviço  :  
                                                <div className="ml-1"><GetServicePrice ID={serviceCode} /></div>
                                                </div>  
                                              </Badge>
                                              </div>
                                              }
                                          </div>
                                        </Form.Group>  
                                      }
                                      {
                                        props.update ? 
                                        <>
                                          <Form.Group className="mb-3"  >
                                          <Form.Label>Mês a pagar<span className="text-danger ml-2">*</span></Form.Label>
                                          <Form.Select onChange={handleInput} className={!!errors.feepayment_months && 'is-invalid'} value={form.feepayment_months} 
                                          isInvalid={!!errors.feepayment_months} id="feepayment_months">
                                                {
                                                    PaymentMonths.length === 0 ? <></> :
                                                    <>
                                                        {
                                                          PaymentMonths.map((item, index)=>{ 
                                                              return <option value={item.value} key={index} selected={item.value*1 === CurrentMonth*1 ? true : false}>   {item.label} </option> 
                                                          })
                                                        } 
                                                    </>
                                                } 
                                          </Form.Select>  
                                            {errors.feepayment_months !== null ? <>
                                                <Form.Control.Feedback type='invalid'>{errors.feepayment_months*1 >= 0  ?   "O mês de "+ GetPaidMonth(errors.feepayment_months) + " Já foi pago" : errors.feepayment_months}</Form.Control.Feedback>
                                              </>  : <></>}
                                        </Form.Group> 
                                        </>
                                        :
                                        <>
                                          {
                                            PaymentMonths.length  === 0 ? <></> :
                                            <Form.Group className="mb-3"  >
                                            <Form.Label>Mês a pagar<span className="text-danger ml-2">*</span> </Form.Label>  
                                              <MultiSelect 
                                                  options={PaymentMonths}
                                                  value={Select}
                                                  className={errors.feepayment_months ? 'border-red' : ''}
                                                  onChange={selectedMonths}
                                                  labelledBy='select'
                                              /> 
                                              {errors.feepayment_months !== null ? <>
                                                <small className="text-danger">{errors.feepayment_months*1 >= 0  ?   "O mês de "+ GetPaidMonth(errors.feepayment_months) + " Já foi pago" : errors.feepayment_months}</small>
                                                <Form.Control.Feedback type='invalid'>{errors.feepayment_months*1 >= 0  ?   "O mês de "+ GetPaidMonth(errors.feepayment_months) + " Já foi pago" : errors.feepayment_months}</Form.Control.Feedback>
                                              </> : <></>} 
                                            </Form.Group>
                                          }
                                        </>  
                                      }
                                        <Form.Group> 
                                            <div className="mt-2">
                                                  <div className="block">
                                                      <Form.Label>Metodo de pagamento </Form.Label>
                                                      <Form.Select onChange={handleInput} className={!!errors.feepayment_type && 'is-invalid'} value={form.feepayment_type} 
                                                      isInvalid={!!errors.feepayment_type} id="feepayment_type">
                                                            <option value="0" selected={CurrentPaymentMethod === 0 ? true : false} >Dinheiro a mão</option>
                                                            <option value="1" selected={CurrentPaymentMethod === 1 ? true : false}>Transferência</option>
                                                            <option value="2" selected={CurrentPaymentMethod === 2 ? true : false}>Depósito</option> 
                                                            <option value="3" selected={CurrentPaymentMethod === 3 ? true : false}>TPA</option> 
                                                      </Form.Select> 
                                                      <Form.Control.Feedback type='invalid'>{errors.feepayment_type}</Form.Control.Feedback>
                                                  </div>  
                                                  <div className={PaymentType != null ? "block" : "d-none"} >
                                                      <div className="block mt-4">
                                                        <Form.Label>Nº de Referência</Form.Label>
                                                        <Form.Control  type="text" onChange={handleInput} className={!!errors.feepayment_bordereux_number && 'is-invalid'} value={form.feepayment_bordereux_number} 
                                                        isInvalid={!!errors.feepayment_bordereux_number} id="feepayment_bordereux_number" />
                                                        <Form.Control.Feedback type='invalid'>{errors.feepayment_bordereux_number}</Form.Control.Feedback>
                                                      </div>
                                                      <div className="block mt-4">
                                                        <Form.Label>Nome do banco </Form.Label>
                                                        <Form.Control  type="text" onChange={handleInput} className={!!errors.feepayment_bank && 'is-invalid'} value={form.feepayment_bank} 
                                                        isInvalid={!!errors.feepayment_bank} id="feepayment_bank" />
                                                        <Form.Control.Feedback type='invalid'>{errors.feepayment_bank}</Form.Control.Feedback>
                                                      </div>
                                                      <div className="block mt-4">
                                                      <Form.Label>Local de pagamento</Form.Label>
                                                      <Form.Control  type="text" onChange={handleInput} className={!!errors.feepayment_place && 'is-invalid'} value={form.feepayment_place} 
                                                      isInvalid={!!errors.feepayment_place} id="feepayment_place" />
                                                      <Form.Control.Feedback type='invalid'>{errors.feepayment_place}</Form.Control.Feedback>
                                                  </div>
                                                  </div>
                                              </div>
                                            </Form.Group>  
                                            {
                                              CurrentFiles.length >= 1 ? 
                                              <div>
                                              <BoxContainerBorder className='boxItem mt-4'>
                                              <h2 className="title">Ficheiros anexados</h2> 
                                                <ul className='student-file-cp'>
                                                  {
                                                    CurrentFiles.map((item, index)=>{  
                                                      return ( 
                                                      <li className='student-file-el' id={`student-file-el-${index}`} key={index}>
                                                        <div className="ed-space"> 
                                                          <div className="ed-flex">
                                                          <div className="icon">
                                                              <HiOutlineDocumentText />
                                                          </div>
                                                          <div className="block">
                                                          <div className="title text-main-light"><ReduceTextLength text={item.ed_file_name} length={ window.width >= 1300 ? 80 : 50} /></div>
                                                            <div className="ed-flex">
                                                                <div className="date text-dark"><AccessTimeOutlined /><span>{item.ed_file_register_date}</span></div>
                                                                | <div className="size text-dark">{NumberToBytes(item.ed_file_size)}</div>
                                                            </div>
                                                          </div>  
                                                          </div>  
                                                          <div className="delete">
                                                          <DeleteModal remove_element={`#student-file-el-${index}`} title='este ficheiro' url={Hoot()+`eduallfiledelete/delete/${item.ed_file_id}`} 
                                                              message='Ficheiro deletada com sucesso' toggle_btn={ 
                                                              <div  className="btn-circle bg-danger ml-2 text-light">
                                                                  <DeleteOutline />
                                                              </div>} /> 
                                                          </div>
                                                          </div>
                                                        </li> 
                                                    )
                                                  })
                                                }
                                                </ul>
                                              </BoxContainerBorder> 
                                              </div>
                                              :
                                              <></>
                                            } 
                                        <div className="mt-2">
                                            <FormControlLabel  onChange={()=>showBoxFile()}  control={<Checkbox  />} label="Anexar recibos de pagamento" />  
                                        </div>
                                      <BoxContainerBorder className={Docfile === true ? 'boxItem' : 'boxItem d-none'} >
                                          <h2 className="title">Carregar Recibo de pagamento</h2>  
                                              <FileUpload input_name="feepayment_files" Icon="0"  type_of_files="image/x-png,image/gif,image/jpeg,Docs/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/pdf"
                                              extensions="pdf, docx, png, jpeg, jpg" Files={GetFiles}  ref={ChildRef}   />
                                      </BoxContainerBorder> 
                                      {Docfile === true ? <br/> : <></>} 
                                      </div> 
                                  }
                              </> 
                              }
                          </>   
                        :
                        <div>
                        {
                          props.update ? <></> : 
                          <Form.Group className="mb-3">
                          <div className="ed-space">
                            <div>
                              <Form.Label>Nome do estudante <span className='text-danger ml-2'>*</span></Form.Label>
                            </div>
                            <div className='ed-flex'> 
                                {studentCode !== null ? <StudentDetailsMenu student_id={studentCode}  toggle_btn={<div className='btn-pm-info'><InfoOutlined/></div>} /> : <></>}
                            </div>
                          </div>
                          <div className={`select-search-item  ${errors.feepayment_student_code ? 'error': ''}`}>
                            <SelectSearch  onChange={(e)=>GetStudentCode(e)}  value={studentCode} options={StudentsArray()[0]} search={true} 
                              placeholder="Selecione um aluno" />
                          </div>
                          <small className="text-danger">{errors.feepayment_student_code}</small>
                        </Form.Group>   
                        } 
                        {
                        props.update ? 
                        <Form.Group className="mb-3"  >
                          <Form.Label>Serviço<span className="text-danger ml-2">*</span></Form.Label>
                          <Form.Select onChange={handleInput} className={!!errors.feepayment_servicecode && 'is-invalid'} value={form.feepayment_servicecode} 
                                isInvalid={!!errors.feepayment_servicecode} id="feepayment_servicecode">
                            <ServiceDataOptions code={CurrentService} />
                          </Form.Select>
                          <Form.Control.Feedback type='invalid'>{errors.feepayment_servicecode}</Form.Control.Feedback>
                          <div>
                          {serviceCode === null ?  <div></div> : <div className='mt-2'><Badge className='bg-main-light'> 
                            <div className="ed-flex">Valor do serviço  :  
                                <div className="ml-1"><GetServicePrice ID={serviceCode} /></div>
                                </div>  
                              </Badge>
                              </div>
                              }
                          </div>
                        </Form.Group>   
                        : 
                        <Form.Group className="mb-3"  >
                          <Form.Label>Serviço<span className="text-danger ml-2">*</span></Form.Label>
                          <Form.Select onChange={handleInput} className={!!errors.feepayment_servicecode && 'is-invalid'} value={form.feepayment_servicecode} 
                                isInvalid={!!errors.feepayment_servicecode} id="feepayment_servicecode">
                            <ServiceDataOptions />
                          </Form.Select>
                          <Form.Control.Feedback type='invalid'>{errors.feepayment_servicecode}</Form.Control.Feedback>
                          <div>
                          {serviceCode === null ?  <div></div> : <div className='mt-2'><Badge className='bg-main-light'> 
                            <div className="ed-flex">Valor do serviço  :  
                                <div className="ml-1"><GetServicePrice ID={serviceCode} /></div>
                                </div>  
                              </Badge>
                              </div>
                              }
                          </div>
                        </Form.Group>  
                        }
                        {
                        props.update ? 
                        <>
                          <Form.Group className="mb-3"  >
                          <Form.Label>Mês a pagar<span className="text-danger ml-2">*</span></Form.Label>
                          <Form.Select onChange={handleInput} className={!!errors.feepayment_months && 'is-invalid'} value={form.feepayment_months} 
                          isInvalid={!!errors.feepayment_months} id="feepayment_months">
                                {
                                    PaymentMonths.length === 0 ? <></> :
                                    <>
                                        {
                                          PaymentMonths.map((item, index)=>{ 
                                              return <option value={item.value} key={index} selected={item.value*1 === CurrentMonth*1 ? true : false}>   {item.label} </option> 
                                          })
                                        } 
                                    </>
                                } 
                          </Form.Select>  
                            {errors.feepayment_months !== null ? <>
                                <Form.Control.Feedback type='invalid'>{errors.feepayment_months*1 >= 0  ?   "O mês de "+ GetPaidMonth(errors.feepayment_months) + " Já foi pago" : errors.feepayment_months}</Form.Control.Feedback>
                              </>  : <></>}
                        </Form.Group> 
                        </>
                        :
                        <>
                          {
                            PaymentMonths.length  === 0 ? <></> :
                            <Form.Group className="mb-3"  >
                            <Form.Label>Mês a pagar<span className="text-danger ml-2">*</span> </Form.Label>  
                              <MultiSelect 
                                  options={PaymentMonths}
                                  value={Select}
                                  className={errors.feepayment_months ? 'border-red' : ''}
                                  onChange={selectedMonths}
                                  labelledBy='select'
                              /> 
                              {errors.feepayment_months !== null ? <>
                                <small className="text-danger">{errors.feepayment_months*1 >= 0  ?   "O mês de "+ GetPaidMonth(errors.feepayment_months) + " Já foi pago" : errors.feepayment_months}</small>
                                <Form.Control.Feedback type='invalid'>{errors.feepayment_months*1 >= 0  ?   "O mês de "+ GetPaidMonth(errors.feepayment_months) + " Já foi pago" : errors.feepayment_months}</Form.Control.Feedback>
                              </> : <></>} 
                            </Form.Group>
                          }
                        </>  
                        }
                        <Form.Group> 
                            <div className="mt-2">
                                  <div className="block">
                                      <Form.Label>Metodo de pagamento </Form.Label>
                                      <Form.Select onChange={handleInput} className={!!errors.feepayment_type && 'is-invalid'} value={form.feepayment_type} 
                                      isInvalid={!!errors.feepayment_type} id="feepayment_type">
                                            <option value="0" selected={CurrentPaymentMethod === 0 ? true : false} >Dinheiro a mão</option>
                                            <option value="1" selected={CurrentPaymentMethod === 1 ? true : false}>Transferência</option>
                                            <option value="2" selected={CurrentPaymentMethod === 2 ? true : false}>Depósito</option> 
                                            <option value="3" selected={CurrentPaymentMethod === 3 ? true : false}>TPA</option> 
                                      </Form.Select> 
                                      <Form.Control.Feedback type='invalid'>{errors.feepayment_type}</Form.Control.Feedback>
                                  </div>  
                                  <div className={PaymentType != null ? "block" : "d-none"} >
                                      <div className="block mt-4">
                                        <Form.Label>Nº de Referência</Form.Label>
                                        <Form.Control  type="text" onChange={handleInput} className={!!errors.feepayment_bordereux_number && 'is-invalid'} value={form.feepayment_bordereux_number} 
                                        isInvalid={!!errors.feepayment_bordereux_number} id="feepayment_bordereux_number" />
                                        <Form.Control.Feedback type='invalid'>{errors.feepayment_bordereux_number}</Form.Control.Feedback>
                                      </div>
                                      <div className="block mt-4">
                                        <Form.Label>Nome do banco </Form.Label>
                                        <Form.Control  type="text" onChange={handleInput} className={!!errors.feepayment_bank && 'is-invalid'} value={form.feepayment_bank} 
                                        isInvalid={!!errors.feepayment_bank} id="feepayment_bank" />
                                        <Form.Control.Feedback type='invalid'>{errors.feepayment_bank}</Form.Control.Feedback>
                                      </div>
                                      <div className="block mt-4">
                                      <Form.Label>Local de pagamento</Form.Label>
                                      <Form.Control  type="text" onChange={handleInput} className={!!errors.feepayment_place && 'is-invalid'} value={form.feepayment_place} 
                                      isInvalid={!!errors.feepayment_place} id="feepayment_place" />
                                      <Form.Control.Feedback type='invalid'>{errors.feepayment_place}</Form.Control.Feedback>
                                  </div>
                                  </div>
                              </div>
                            </Form.Group>  
                            {
                              CurrentFiles.length >= 1 ? 
                              <div>
                              <BoxContainerBorder className='boxItem mt-4'>
                              <h2 className="title">Ficheiros anexados</h2> 
                                <ul className='student-file-cp'>
                                  {
                                    CurrentFiles.map((item, index)=>{  
                                      return ( 
                                      <li className='student-file-el' id={`student-file-el-${index}`} key={index}>
                                        <div className="ed-space"> 
                                          <div className="ed-flex">
                                          <div className="icon">
                                              <HiOutlineDocumentText />
                                          </div>
                                          <div className="block">
                                          <div className="title text-main-light"><ReduceTextLength text={item.ed_file_name} length={ window.width >= 1300 ? 80 : 50} /></div>
                                            <div className="ed-flex">
                                                <div className="date text-dark"><AccessTimeOutlined /><span>{item.ed_file_register_date}</span></div>
                                                | <div className="size text-dark">{NumberToBytes(item.ed_file_size)}</div>
                                            </div>
                                          </div>  
                                          </div>  
                                          <div className="delete">
                                          <DeleteModal remove_element={`#student-file-el-${index}`} title='este ficheiro' url={Hoot()+`eduallfiledelete/delete/${item.ed_file_id}`} 
                                              message='Ficheiro deletada com sucesso' toggle_btn={ 
                                              <div  className="btn-circle bg-danger ml-2 text-light">
                                                  <DeleteOutline />
                                              </div>} /> 
                                          </div>
                                          </div>
                                        </li> 
                                    )
                                  })
                                }
                                </ul>
                              </BoxContainerBorder> 
                              </div>
                              :
                              <></>
                            } 
                        <div className="mt-2">
                            <FormControlLabel  onChange={()=>showBoxFile()}  control={<Checkbox  />} label="Anexar recibos de pagamento" />  
                        </div>
                        <BoxContainerBorder className={Docfile === true ? 'boxItem' : 'boxItem d-none'} >
                          <h2 className="title">Carregar Recibo de pagamento</h2>  
                              <FileUpload input_name="feepayment_files" Icon="0"  type_of_files="image/x-png,image/gif,image/jpeg,Docs/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/pdf"
                              extensions="pdf, docx, png, jpeg, jpg" Files={GetFiles}  ref={ChildRef}   />
                        </BoxContainerBorder> 
                        {Docfile === true ? <br/> : <></>} 
                        </div>  

                  } 
                </Modal.Body>  
            <Modal.Footer>
              <div className="ed-space">
                  <div className={props.update ? (Founded === false ? "d-none" : "ed-wrap") : "ed-wrap" }>
                      <TX className="mt-1"><h4>Desconto : ({serviceDiscount})%</h4> {ApplyDiscount ? <div className="yes"><Check/></div> : <div className="no"><Close/></div>}</TX>
                      <TX className="mt-1">
                          <h4 className="ml-2">Multa : ({serviceFine}  {serviceFineType === 1 ? serviceCoin : ''} {(NonePaidMonths <= 1 ? '' :  " * "+NonePaidMonths)})   
                              {serviceFineType === 0 ? '%'  : <span className="text-red"> Valor fixo</span>}
                            </h4>
                          {ApplyFine ? <div className="yes"><Check/></div> : <div className="no"><Close/></div>} 
                      </TX>
                      <TX className="mt-1"><h4 className="ml-2">IVA : ({serviceIva})%</h4>
                          {serviceIva*1 > 0 ? <div className="yes"><Check/></div> : <div className="no"><Close/></div>} 
                      </TX>
                  </div>
              </div>
              <div className="ed-space">
                {props.update ? (Founded === false ? <div></div>  : "") : ""}
                <div className={props.update ? (Founded === false ? "d-none" : "ed-flex") : "ed-flex"}>
                    <h5 className='m-0'>Total :</h5>
                    <Form.Control readOnly disabled value={InvoiceValue} id="feepayment_balance" className='text-danger ml-2' style={{maxWidth:"180px"}} />
                </div>
                <div className="ed-flex">
                    <Button className='bg-light text-dark' onClick={handleClose}> Cancelar </Button> 
                    {props.update ? (Founded === false ? <div></div>  : 
                    <SaveButton icon={props.title ? <Update/> : <MonetizationOn/>} title={props.title ? props.title : 'Pagar'} status={RegisterStatus} />) :
                    <SaveButton icon={props.title ? <Update/> : <MonetizationOn/>} title={props.title ? props.title : 'Pagar'} status={RegisterStatus} />} 
                </div>
              </div>
            </Modal.Footer>
            </Form>
          </Modal>
         } />
      </div>
    )
}

 
const TX = styled.div`
  display:flex;
  align-items:center;
  margin-right:20px;

     .yes{
         svg{
             width:20px;
             height:20px;
             fill:var(--ed-green);
             margin:0px;
         }
     }

     
  .no{
      svg{
          width:20px;
          height:20px;
          fill:var(--ed-red);
      }
  }
     

    h4{
      font-size:16px;
      margin:0px;
      margin-right:5px;
      font-weight:600;
    }
`;

const BoxContainerBorder = styled.div`  
    width:auto;
    border-radius:6px;
    margin:10px 0;
    padding:20px;
    min-height:200px;
    background:var(--ed-white);  
    border:1px solid var(--ed-silver-light); 

    .ed-flex{
        margin-bottom:0px;
    }

    h2.title{
        font-size:18px; 
        text-transform:uppercase;
        font-weight:600;
        margin-top:10px;
        margin-bottom:25px;
    }
  
`; 

const LoaderContainer = styled.div`
  width:100%;
  min-height:300px;
  padding:30px;
  display:flex;
  align-items:center;
  justify-content:center; 
`;

const EmptyBox = styled.div`
     min-height:300px;
     padding:40px;
     width:100%;
     display:flex;
     align-items:center;
     justify-content:center; 

       img{
           max-height:200px;
       }
`;

export default NewfeeManualPaymentModal