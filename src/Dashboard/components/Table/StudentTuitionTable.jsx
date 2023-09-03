import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Delete, Description, Edit , PreviewOutlined } from '@mui/icons-material';
import Table from './Table';
import Hoot from '../../../General/components/Hoot';
import {GetServiceTitle, GetStudentName, GetStudentPicture} from '../../../General/components/InstituteData'; 
import DeleteModal from '../elements/DeleteModal'; 
import NewfeeManualPaymentModal from '../modal/NewfeeManualPaymentModal';
const TABLEURL = Hoot()+"eduallfeepaymentsapi/get/"; 

const Months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho",
"Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

const StudentTuitionHead = [  
    'Nome do aluno',
    'Titulo do serviço',
    'Mês pago', 
    'Preçario',
    'Multa',
    'Subtotal', 
    'Data de pagamento',
    'Ação'
]; 

const StudentTuitionOptions = {
    filterType: 'checkbox'
}


function StudentTuitionTable() {
    const [data, setData] = useState([]); 
    const [refresh, setRefresh] = useState(true);
  
  
    async function loadData(){
        const response = await axios.get(TABLEURL); 
        setData(response.data);
    };
    
    useEffect(()=>{ 
      refresh ===  true ? loadData() : console.log("Error");
    },[]);
  
    const StudentTuitionBody = [];
    data.map((item, index)=>{
        StudentTuitionBody.push([ 
             <div className="ed-flex">
                 <GetStudentPicture size={40} ID={item.ed_fee_payment_student}/>
                 <div className="ml-2">
                     <GetStudentName ID={item.ed_fee_payment_student}/>
                 </div>
             </div>,  
             <GetServiceTitle ID={item.ed_fee_payment_service} />, 
             Months[Math.floor(item.ed_fee_payment_month)] , 
             item.ed_fee_payment_price , '0 AOA' ,
             <span className="text-blue">{item.ed_fee_payment_balance}</span> ,  
             item.ed_fee_payment_registerDate,
            <div className="ed-flex">
            <NewfeeManualPaymentModal   student_code={item.ed_fee_payment_student}  title='Atualizar'
            toggle_btn={
              <button className="btn-circle bg-success text-light">
                 <Edit/>
             </button>
            } />
            <button className="btn-circle bg-warning ml-2 text-light">
                <PreviewOutlined/>
            </button>
            <DeleteModal title='um pagamento' url={Hoot()+`eduallfeepaymentsdelete/delete/${item.ed_fee_payment_id}`} 
               message='PagamenTO deletado com sucesso' toggle_btn={
                <button className="btn-circle bg-danger ml-2 text-light">
                    <Delete/>
                </button>
               } />
            </div>
      ]);
    }); 

  return (
    <Table
        TableHead={StudentTuitionHead}
        TableBody={StudentTuitionBody}
        TableOptions={StudentTuitionOptions}
        TableTitle='Mensalidades propina'
    />
  )
}

export default StudentTuitionTable