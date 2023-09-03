import { PrintOutlined } from '@mui/icons-material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import Hoot from '../../../General/components/Hoot';
import { GetserviceCoin, GetServiceCointText, GetServiceTitle } from '../../../General/components/InstituteData';
import NumberToPrice from '../../../General/components/NumberToPrice';




function StudentFeePayments(props) {  
  const [Payments, SetPayments] = useState([]);
  const type = "student_register";

  const Months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", 
  "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

  const DATAURL =  [
     Hoot()+'eduallsinglestudentfeepayment/get/',
     Hoot()+"eduallsingleacademicyearapi/get/",
     Hoot()+'eduallsingleclassapi/get/'
  ];
  
  const PaymentMethods = ["Dinheiro a mão", "Transferência", "Depósito", "Tpa"];


  async function GetPayments(){  
      if(props.data !== null){ 
        let studentCode = props.data.ed_student_id ? props.data.ed_student_id  : null; 
          const response = await axios.get(DATAURL[2]+`${props.data.ed_student_class}`);   
          if(response.data.length >= 1){ 
            const response1 = await axios .get(DATAURL[0]+studentCode+","+response.data[0].ed_class_year); 
              if(response1.data.length >= 1){  
                  SetPayments(response1.data); 
                  console.log(response1.data);
              } 
          } 
      }
  }


   useEffect(()=>{ 
       GetPayments();
   },[]);



  return (
   <>
   
  <Table >
    <thead>
      <tr>
        <th>Nº</th>
        <th>Mês</th>
        <th>Serviço</th> 
        <th>Metodo de pagamento</th>
        <th>Valor do serviço</th>
        <th>Multa</th>
        <th>Desconto</th>
        <th>Iva</th>
        <th>Total</th>
        <th>Recibo</th>
      </tr>
    </thead>
    <tbody>
      {
       Payments.map((item, index)=>{
         let month = Months[Math.floor(item.ed_fee_payment_month.split('.')[0])]+ " de "+ item.ed_fee_payment_month.split('.')[1];
            return (
              <tr key={index}>
                <td>{index+1}</td>
                <td>{month}</td>
                <td><GetServiceTitle ID={item.ed_fee_payment_service} /></td>
                <td>{PaymentMethods[item.ed_fee_payment_type*1]}</td>
                <td> <div className="ed-flex">{NumberToPrice(item.ed_fee_payment_price*1)} <GetserviceCoin ID={item.ed_fee_payment_service}/></div></td>
                <td>
                  <div className="ed-flex">
                      {
                         NumberToPrice((
                          item.ed_fee_payment_fineType*1 === 1 ? 
                            item.ed_fee_payment_fineValue*1  
                            :  
                        ((item.ed_fee_payment_price*1 * item.ed_fee_payment_fineValue*1) / 100)
                        )*1) + " "
                      }
                      <GetserviceCoin ID={item.ed_fee_payment_service} /> 
                  </div>
                </td>
                <td>{item.ed_fee_payment_discount}%</td>
                <td> {item.ed_fee_payment_iva*1}%</td>
                <td>
                {<div className="ed-flex">
                     {
                        NumberToPrice( item.ed_fee_payment_price*1 -  ((item.ed_fee_payment_price * item.ed_fee_payment_discount) / 100)  + 
                        (item.ed_fee_payment_iva*1 <= 0 ? 0 : ((item.ed_fee_payment_price  * item.ed_fee_payment_iva)  / 100)) + 
                        (
                          item.ed_fee_payment_fineType*1 === 1 ? 
                            item.ed_fee_payment_fineValue*1  
                            :  
                        ((item.ed_fee_payment_price*1 * item.ed_fee_payment_fineValue*1) / 100)
                        )) 
                        }  
                        {" "+" "}
                        <GetserviceCoin ID={item.ed_fee_payment_service} /> 
                    </div>
                  } 
                </td>
                <td>
                <Link  to={`/student_tuition_payment_print_invoice/${item.ed_fee_payment_id}`}>
                  <button className="btn-circle  bg-primary  ml-2 text-light">
                      <PrintOutlined />
                  </button>
                  </Link>
                </td>
              </tr>  
            )
        })
      }
    </tbody>
    </Table></>
  )
}

export default StudentFeePayments


/*


*/