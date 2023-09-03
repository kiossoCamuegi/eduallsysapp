import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Delete, Description, Edit , PreviewOutlined } from '@mui/icons-material';
import Table from './Table';
import Hoot from '../../../General/components/Hoot';
import {GetServiceTitle, GetStudentName, GetStudentPicture} from '../../../General/components/InstituteData'; 
import DeleteModal from '../elements/DeleteModal';  
import NewTransportTuitionPaymentModal from '../modal/NewTransportTuitionPaymentModal';

const TABLEURL = Hoot()+"edualltransportuitionpayments/get/"
const Months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho",
"Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

const TransportTuitionHead = [
 'Nome do aluno',
 'Turma',
 'Mês a pagar', 
 'Dias de atraso',
 'Serviço',  
 'Multa',
 'Ação'
];
 


const TransportTuitionOptions  = {
  filterType:'checkbox',
  filter:true
}

function TransportTuitionTable() {
    const [data, setData] = useState([]); 
  
    async function loadData(){
        const response = await axios.get(TABLEURL); 
        setData(response.data);
    };
    
    useEffect(()=>{ 
        loadData(); 
    });
  
    const TransportTuitionBody = [];
    data.map((item, index)=>{
        TransportTuitionBody.push([ 
            <div className="ed-flex">
            <GetStudentPicture size={40} ID={item.ed_transport_tuition_student_code}/>
            <div className="ml-2">
                <GetStudentName ID={item.ed_transport_tuition_student_code}/>
            </div>
        </div>,  
        <GetServiceTitle ID={item.ed_transport_tuition_service} />, 
        Months[Math.floor(item.ed_transport_tuition_month)] , 
        item.ed_transport_tuition_price , '0 AOA' ,
        <span className="text-blue">{item.ed_transport_tuition_balance}</span> ,  
       <div className="ed-flex">
       <NewTransportTuitionPaymentModal   student_code={item.ed_transport_tuition_student_code}  title='Atualizar'
       toggle_btn={
         <button className="btn-circle bg-success text-light">
            <Edit/>
        </button>
       } />
       <button className="btn-circle bg-warning ml-2 text-light">
           <PreviewOutlined/>
       </button>
       <DeleteModal title='um pagamento' url={Hoot()+`eduallfeepaymentsdelete/delete/${item.ed_transport_tuition_id}`} 
          message='PagamenTO deletado com sucesso' toggle_btn={
           <button className="btn-circle bg-danger ml-2 text-light">
               <Delete/>
           </button>
          } />
       </div>
        ]);
    }); 
  
    return (
      <div>
      <Table
          TableHead={TransportTuitionHead}
          TableBody={TransportTuitionBody}
          TableOptions={TransportTuitionOptions}
          TableTitle='Pagamentos do transporte efectuados'
      />
   </div>
    )
}

export default TransportTuitionTable