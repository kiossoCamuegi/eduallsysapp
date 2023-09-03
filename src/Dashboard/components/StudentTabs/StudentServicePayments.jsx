import { PrintOutlined } from '@mui/icons-material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import Hoot from '../../../General/components/Hoot';
import { GetServiceTitle } from '../../../General/components/InstituteData';


function StudentServicePayments(props) {  
  const [Payments, SetPayments] = useState([]);
  const type = "student_register";

  const Months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", 
  "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
  
  const PaymentMethods = ["Dinheiro a mão", "Transferência", "Depósito"];


  const DATAURL =  [
    Hoot()+'eduallsinglestudentfeepayment/get/',
    Hoot()+"eduallsingleacademicyearapi/get/",
    Hoot()+'eduallsingleclassapi/get/',
    Hoot()+'eduallsinglestudentapi/get/' 
  ];

  async function GetPayments(){  
    
  }


   useEffect(()=>{ 
       GetPayments();
   },[]);



  return (
    <Table>
    <thead>
      <tr>
        <th>Nº</th>
        <th>Nome do serviço</th> 
        <th>Metodo de pagamento</th>
        <th>Valor do serviço</th>
        <th>Multa</th>
        <th>Desconto</th>
        <th>Subtotal</th>
        <th>Recibo</th>
      </tr>
    </thead>
    <tbody>
      {
       Payments.map((item, index)=>{
            return (
              <tr key={index}>
                <td>{index+1}</td>
                <td><GetServiceTitle ID={item.ed_fee_payment_service} /></td>
                <td>{PaymentMethods[item.ed_fee_payment_type*1]}</td>
                <td>{item.ed_fee_payment_price}</td>
                <td>#</td>
                <td>#</td>
                <td>#</td>
                <td>
                <Link  to={`/student_tuition_payment_print/${item.ed_fee_payment_id}`}>
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
    </Table>
  )
}

export default StudentServicePayments

 