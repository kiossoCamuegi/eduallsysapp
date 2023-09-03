import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Delete, Description, Edit , PreviewOutlined, Refresh } from '@mui/icons-material';
import Table from './Table';
import Hoot from '../../../General/components/Hoot';
import {DemoComponent, GetserviceCoin, GetServiceTitle, GetStudentName, GetStudentPicture} from '../../../General/components/InstituteData'; 
import DeleteModal from '../elements/DeleteModal'; 
import NewfeeManualPaymentModal from '../modal/NewfeeManualPaymentModal'; 
import SwitchFromPages from '../../../General/components/SwitchFromPages'; 
import TableGrid from '../../../General/components/TableGrid'; 
import { PrintOutlined } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import NumberToPrice from '../../../General/components/NumberToPrice';


const TABLEURL = [Hoot()+"eduallfeepaymentsapi/get/", Hoot()+"eduallgetsingleinstitute/get/1"]; 
const Months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho",
"Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

 
 
const columns = [ 
    { field: 'index',
      resizable: true ,
     headerName: 'Nome do aluno',  
     width:250,  
     cellRenderer:(props)=>{  
      return  <SwitchFromPages link={`studentinfo/${props.data.student}`}
      menu='3'  menu_item='17'  toggle_btn={  
          <div className="ed-flex">
          <GetStudentPicture size={40} INDEX='3' ID={props}/>
          <div className="ml-2">
              <GetStudentName INDEX='3' ID={props}/>
          </div>
      </div>
      } />
    }
    , 
    },
    {
      field: 'service',
      resizable: true ,
      headerName: 'Titulo do serviço',  
      width:250,  
      cellRenderer:(props)=>{
        return  <div className="tb-item"><GetServiceTitle INDEX='2' ID={props} /> </div>  
      }
    }, 
      {
      field: 'month',
      resizable: true ,
      headerName: 'Mês pago',  
      width:180,  
      cellRenderer:(props)=>{
        return <div className="tb-item">{ Months[Math.floor(props.data.month.split('.')[0])]+ " de "+ props.data.month.split('.')[1]}</div>
      }
    }, 
    {
      field: 'price',
      resizable: true ,
      headerName: 'Preçario',
      width:160,    
      cellRenderer:(props)=>{
        return  <div className='ed-flex'> {NumberToPrice(props.data.price)} <GetserviceCoin INDEX='2' ID={props} /></div>
     }
    }, 
    {
      field: 'total',
      headerName: 'Total',  
      width:150,  
      cellRenderer:(props)=>{
        return <div className='ed-flex'> 
             {NumberToPrice(props.data.balance)}  {" "+" "}
             <GetserviceCoin INDEX='2' ID={props} />   
          </div>  
      }
    }, 
    {
      field: 'action',
      resizable: true ,
      headerName: 'Ação',  
      width:290,  
       cellRenderer:(props)=>{
        return   ( 
          <div className="ed-flex">
                <NewfeeManualPaymentModal   title='Atualizar ' update='true' get={Hoot()+`eduallfeepaymentsingle/get/${props.data.id}`}  
                url={Hoot()+`eduallfeepaymentupdate/update/${props.data.id}`}   toggle_btn={
                <button className="btn-circle bg-success text-light">
                    <Edit/>
                </button>
                } /> 
                <Link  to={`/student_tuition_payment_print/${props.data.id}`}>
                <button className="btn-circle  bg-primary  ml-2 text-light">
                    <PrintOutlined />
                </button>
                </Link>
                <Link  to={`/student_tuition_payment_print/${props.data.id}`}>
                <button className="btn-circle  bg-secondary  ml-2 text-light">
                    <PreviewOutlined />
                </button>
                </Link>
                <DeleteModal title='um pagamento de propina' url={Hoot()+`eduallfeepaymentsdelete/delete/${props.data.id}`} 
                message='Pagamento deletado com sucesso' toggle_btn={
                    <button className="btn-circle bg-danger ml-2 text-light">
                        <Delete/>
                    </button>
                } />
          </div>
        );
      }
    } ,
    {
      field:'invoice',
      resizable: true ,
      headerName:'Fatura', 
      cellRenderer:(props)=>{
        return(
          <div className="tb-item">
             <Link  to={`/student_tuition_payment_print_invoice/${props.data.id}`}>
              <button className="btn-circle bg-warning ml-2 text-light">
                  <PrintOutlined />
              </button>
             </Link>
          </div>
        )
      }
    }
];

function FeespaymentsTable() {
  const [data, setData] = useState([]);
  const [load, setLoaded] = useState(false);
  const [InstituteData, setInstituteData] = useState([]);

  async function loadData(){
    setLoaded(false); 
      const response = await axios.get(TABLEURL[0]);  
      const rows = [];
      response.data.map((item, index)=>{ 
        let total =  item.ed_fee_payment_price*1 -  ((item.ed_fee_payment_price * item.ed_fee_payment_discount) / 100)  + 
        (item.ed_fee_payment_iva*1 <= 0 ? 0 : ((item.ed_fee_payment_price  * item.ed_fee_payment_iva)  / 100)) + 
        (item.ed_fee_payment_fineType*1 === 1 ? item.ed_fee_payment_fineValue*1  :   ((item.ed_fee_payment_price*1 * item.ed_fee_payment_fineValue*1) / 100))  
                rows.push({
                index:index+1,
                id:item.ed_fee_payment_id, 
                service:item.ed_fee_payment_service,  
                student:item.ed_fee_payment_student,   
                month:item.ed_fee_payment_month,
                balance:total,  
                price:item.ed_fee_payment_price,
                iva:item.ed_fee_payment_iva,
                discount:item.ed_fee_payment_discount,
                fineType:item.ed_fee_payment_fineType,
                fineValue:item.ed_fee_payment_fineValue,  
                total:'',
                action:'',  
            }) 
        }); 
       setData(rows); 
      setTimeout(() => {
         setLoaded(true); 
      }, 200);
  }

  useEffect(()=>{
      loadData(); 
  },[]);
 

if(load){
    return (
    <div>
      <TableGrid
          TableHead={columns}
          TableBody={data}  
          TableTitle='Propinas pagas'
          TableBtn={<button className="btn table-btn-small el-refresh-list bg-main-light  ml-2" onClick={loadData}><Refresh/></button>}
      />
      <br />
  </div>
  )
}else{
  return (
    <div>
      <div className="d-none">*</div>
      <TableGrid
          TableHead={columns}
          TableBody={[]}  
          TableTitle='Propinas pagas'
          TableBtn={<button className="btn table-btn-small el-refresh-list bg-main-light  ml-2" onClick={loadData}><Refresh/></button>}
      />
      <br />
  </div>
  )
}
}

export default FeespaymentsTable

 