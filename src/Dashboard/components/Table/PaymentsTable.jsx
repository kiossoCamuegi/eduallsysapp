import React, {useState} from 'react'
import { Badge,   FormControl, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import  Table from './Table' 
import ArticleIcon from '@mui/icons-material/Article';
import { Delete,  Edit  } from '@mui/icons-material';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import LocalPrintshopOutlinedIcon from '@mui/icons-material/LocalPrintshopOutlined'; 
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined'; 
import styled from 'styled-components'; 
 



const paymentsHead = [
  "Nº",
  "Data",
  "Hora",
  "Nome do individuo",
  "Tipo de individuo",
  'Total Factura',
  'Divida anterior',
  'Desconto',
  'Saldo usado',
  'Total a pagar',
  'Valor Entrege', 
  'Nome do banco',
  'Tipo de pagamento',
  'Recibo',
  'Ação'
];

const paymentsBody = [
  [
    '12', '03/02/2022', '12:23', 'Carlos', <Badge className='bg-info'>Encarregado</Badge>, 'Kz 40.000,00' , 
     <span className="text-success">KZ 00,00</span>, 'Kz 35,0', 'kZ 25,00', 'kz 38.975,00' , 'Kz 40.000,00', 
     'Banco Bic', <Badge className='bg-warning'>Manual</Badge>, <Link to=''><ArticleIcon/></Link>,  
     <div className="ed-flex">
     <button className="btn-circle bg-success text-light">
         <Edit/>
     </button>  
     <button className="btn-circle bg-danger ml-2 text-light">
         <Delete/>
     </button>
   </div>
  ],
  [
    '12', '03/02/2022', '12:23', 'Carlos', <Badge className='bg-danger'>Estudante</Badge>, 'Kz 40.000,00' , 
     <span className="text-success">KZ 00,00</span>, 'Kz 35,0', 'kZ 25,00', 'kz 38.975,00' , 'Kz 40.000,00', 
     'Banco Bic', <Badge className='bg-secondary'>No sistema</Badge>, <Link to=''><ArticleIcon/></Link>,  
     <div className="ed-flex">
     <button className="btn-circle bg-dark text-light">
         <RemoveRedEyeIcon/>
     </button>  
   </div>
  ],
  [
    '12', '03/02/2022', '12:23', 'Carlos', <Badge className='bg-danger'>Estudante</Badge>, 'Kz 40.000,00' , 
     <span className="text-success">KZ 00,00</span>, 'Kz 35,0', 'kZ 25,00', 'kz 38.975,00' , 'Kz 40.000,00', 
     'Banco Bic', <Badge className='bg-secondary'>No sistema</Badge>, <Link to=''><ArticleIcon/></Link>,  
     <div className="ed-flex">
     <button className="btn-circle bg-dark text-light">
         <RemoveRedEyeIcon/>
     </button>  
   </div>
  ],
  [
    '12', '03/02/2022', '12:23', 'Carlos', <Badge className='bg-info'>Encarregado</Badge>, 'Kz 40.000,00' , 
     <span className="text-success">KZ 00,00</span>, 'Kz 35,0', 'kZ 25,00', 'kz 38.975,00' , 'Kz 40.000,00', 
     'Banco Bic', <Badge className='bg-warning'>Manual</Badge>, <Link to=''><ArticleIcon/></Link>,  
     <div className="ed-flex">
     <button className="btn-circle bg-success text-light">
         <Edit/>
     </button>  
     <button className="btn-circle bg-danger ml-2 text-light">
         <Delete/>
     </button>
   </div>
  ],
  [
    '12', '03/02/2022', '12:23', 'Carlos', <Badge className='bg-danger'>Estudante</Badge>, 'Kz 40.000,00' , 
     <span className="text-success">KZ 00,00</span>, 'Kz 35,0', 'kZ 25,00', 'kz 38.975,00' , 'Kz 40.000,00', 
     'Banco Bic', <Badge className='bg-secondary'>No sistema</Badge>, <Link to=''><ArticleIcon/></Link>,  
     <div className="ed-flex">
     <button className="btn-circle bg-dark text-light">
         <RemoveRedEyeIcon/>
     </button>  
   </div>
  ],
  [
    '12', '03/02/2022', '12:23', 'Carlos', <Badge className='bg-danger'>Estudante</Badge>, 'Kz 40.000,00' , 
     <span className="text-success">KZ 00,00</span>, 'Kz 35,0', 'kZ 25,00', 'kz 38.975,00' , 'Kz 40.000,00', 
     'Banco Bic', <Badge className='bg-secondary'>No sistema</Badge>, <Link to=''><ArticleIcon/></Link>,  
     <div className="ed-flex">
     <button className="btn-circle bg-dark text-light">
         <RemoveRedEyeIcon/>
     </button>  
   </div>
  ],
  [
    '12', '03/02/2022', '12:23', 'Carlos', <Badge className='bg-info'>Encarregado</Badge>, 'Kz 40.000,00' , 
     <span className="text-success">KZ 00,00</span>, 'Kz 35,0', 'kZ 25,00', 'kz 38.975,00' , 'Kz 40.000,00', 
     'Banco Bic', <Badge className='bg-warning'>Manual</Badge>, <Link to=''><ArticleIcon/></Link>,  
     <div className="ed-flex">
     <button className="btn-circle bg-success text-light">
         <Edit/>
     </button>  
     <button className="btn-circle bg-danger ml-2 text-light">
         <Delete/>
     </button>
   </div>
  ],
  [
    '12', '03/02/2022', '12:23', 'Carlos', <Badge className='bg-danger'>Estudante</Badge>, 'Kz 40.000,00' , 
     <span className="text-success">KZ 00,00</span>, 'Kz 35,0', 'kZ 25,00', 'kz 38.975,00' , 'Kz 40.000,00', 
     'Banco Bic', <Badge className='bg-secondary'>No sistema</Badge>, <Link to=''><ArticleIcon/></Link>,  
     <div className="ed-flex">
     <button className="btn-circle bg-dark text-light">
         <RemoveRedEyeIcon/>
     </button>  
   </div>
  ],
  [
    '12', '03/02/2022', '12:23', 'Carlos', <Badge className='bg-danger'>Estudante</Badge>, 'Kz 40.000,00' , 
     <span className="text-success">KZ 00,00</span>, 'Kz 35,0', 'kZ 25,00', 'kz 38.975,00' , 'Kz 40.000,00', 
     'Banco Bic', <Badge className='bg-secondary'>No sistema</Badge>, <Link to=''><ArticleIcon/></Link>,  
     <div className="ed-flex">
     <button className="btn-circle bg-dark text-light">
         <RemoveRedEyeIcon/>
     </button>  
   </div>
  ],
  [
    '12', '03/02/2022', '12:23', 'Carlos', <Badge className='bg-info'>Encarregado</Badge>, 'Kz 40.000,00' , 
     <span className="text-success">KZ 00,00</span>, 'Kz 35,0', 'kZ 25,00', 'kz 38.975,00' , 'Kz 40.000,00', 
     'Banco Bic', <Badge className='bg-warning'>Manual</Badge>, <Link to=''><ArticleIcon/></Link>,  
     <div className="ed-flex">
     <button className="btn-circle bg-success text-light">
         <Edit/>
     </button>  
     <button className="btn-circle bg-danger ml-2 text-light">
         <Delete/>
     </button>
   </div>
  ],
  [
    '12', '03/02/2022', '12:23', 'Carlos', <Badge className='bg-danger'>Estudante</Badge>, 'Kz 40.000,00' , 
     <span className="text-success">KZ 00,00</span>, 'Kz 35,0', 'kZ 25,00', 'kz 38.975,00' , 'Kz 40.000,00', 
     'Banco Bic', <Badge className='bg-secondary'>No sistema</Badge>, <Link to=''><ArticleIcon/></Link>,  
     <div className="ed-flex">
     <button className="btn-circle bg-dark text-light">
         <RemoveRedEyeIcon/>
     </button>  
   </div>
  ],
  [
    '12', '03/02/2022', '12:23', 'Carlos', <Badge className='bg-danger'>Estudante</Badge>, 'Kz 40.000,00' , 
     <span className="text-success">KZ 00,00</span>, 'Kz 35,0', 'kZ 25,00', 'kz 38.975,00' , 'Kz 40.000,00', 
     'Banco Bic', <Badge className='bg-secondary'>No sistema</Badge>, <Link to=''><ArticleIcon/></Link>,  
     <div className="ed-flex">
     <button className="btn-circle bg-dark text-light">
         <RemoveRedEyeIcon/>
     </button>  
   </div>
  ],
  [
    '12', '03/02/2022', '12:23', 'Carlos', <Badge className='bg-info'>Encarregado</Badge>, 'Kz 40.000,00' , 
     <span className="text-success">KZ 00,00</span>, 'Kz 35,0', 'kZ 25,00', 'kz 38.975,00' , 'Kz 40.000,00', 
     'Banco Bic', <Badge className='bg-warning'>Manual</Badge>, <Link to=''><ArticleIcon/></Link>,  
     <div className="ed-flex">
     <button className="btn-circle bg-success text-light">
         <Edit/>
     </button>  
     <button className="btn-circle bg-danger ml-2 text-light">
         <Delete/>
     </button>
   </div>
  ],
  [
    '12', '03/02/2022', '12:23', 'Carlos', <Badge className='bg-danger'>Estudante</Badge>, 'Kz 40.000,00' , 
     <span className="text-success">KZ 00,00</span>, 'Kz 35,0', 'kZ 25,00', 'kz 38.975,00' , 'Kz 40.000,00', 
     'Banco Bic', <Badge className='bg-secondary'>No sistema</Badge>, <Link to=''><ArticleIcon/></Link>,  
     <div className="ed-flex">
     <button className="btn-circle bg-dark text-light">
         <RemoveRedEyeIcon/>
     </button>  
   </div>
  ],
  [
    '12', '03/02/2022', '12:23', 'Carlos', <Badge className='bg-danger'>Estudante</Badge>, 'Kz 40.000,00' , 
     <span className="text-success">KZ 00,00</span>, 'Kz 35,0', 'kZ 25,00', 'kz 38.975,00' , 'Kz 40.000,00', 
     'Banco Bic', <Badge className='bg-secondary'>No sistema</Badge>, <Link to=''><ArticleIcon/></Link>,  
     <div className="ed-flex">
     <button className="btn-circle bg-dark text-light">
         <RemoveRedEyeIcon/>
     </button>  
   </div>
  ],
  [
    '12', '03/02/2022', '12:23', 'Carlos', <Badge className='bg-info'>Encarregado</Badge>, 'Kz 40.000,00' , 
     <span className="text-success">KZ 00,00</span>, 'Kz 35,0', 'kZ 25,00', 'kz 38.975,00' , 'Kz 40.000,00', 
     'Banco Bic', <Badge className='bg-warning'>Manual</Badge>, <Link to=''><ArticleIcon/></Link>,  
     <div className="ed-flex">
     <button className="btn-circle bg-success text-light">
         <Edit/>
     </button>  
     <button className="btn-circle bg-danger ml-2 text-light">
         <Delete/>
     </button>
   </div>
  ],
  [
    '12', '03/02/2022', '12:23', 'Carlos', <Badge className='bg-danger'>Estudante</Badge>, 'Kz 40.000,00' , 
     <span className="text-success">KZ 00,00</span>, 'Kz 35,0', 'kZ 25,00', 'kz 38.975,00' , 'Kz 40.000,00', 
     'Banco Bic', <Badge className='bg-secondary'>No sistema</Badge>, <Link to=''><ArticleIcon/></Link>,  
     <div className="ed-flex">
     <button className="btn-circle bg-dark text-light">
         <RemoveRedEyeIcon/>
     </button>  
   </div>
  ],
  [
    '12', '03/02/2022', '12:23', 'Carlos', <Badge className='bg-danger'>Estudante</Badge>, 'Kz 40.000,00' , 
     <span className="text-success">KZ 00,00</span>, 'Kz 35,0', 'kZ 25,00', 'kz 38.975,00' , 'Kz 40.000,00', 
     'Banco Bic', <Badge className='bg-secondary'>No sistema</Badge>, <Link to=''><ArticleIcon/></Link>,  
     <div className="ed-flex">
     <button className="btn-circle bg-dark text-light">
         <RemoveRedEyeIcon/>
     </button>  
   </div>
  ],
]

const paymentsOptions = {
  filterType: 'checkbox'
}

function PaymentsTable() {
  return (
    <>
    <div className="table-container">
         <div className="table-area">
            <div className="filter-options">
                <div className="ed-space">
                       <div className="ed-flex">
                          <button className="btn bg-secondary"><LocalPrintshopOutlinedIcon/> Gerar relatorio</button>
                           
                       </div>
                       <div className="ed-flex">
                           <button className="btn bg-danger"><ShareOutlinedIcon/> Partilhar relatorio</button>
                       </div>
                </div>
            </div>
           <div className="table-box">
              <Table 
                TableHead={paymentsHead}
                TableBody={paymentsBody} 
                TableOptions={paymentsOptions} 
                TableTitle='Pagamentos gerais'
              />
           </div>
         </div>
         <div className="table-options bg-main">
            <div className="ed-space">
                 <div></div>
                 <div className="ed-flex count">
                     <div className="ed-flex">
                         <h5>Saldo usado :</h5>
                         <FormControl  className='bg-main-light' value='0' readOnly  aria-label="Username"aria-describedby="basic-addon1"/>
                      </div>
                      <div className="ed-flex">
                         <h5>Total pagamentos :</h5>
                         <FormControl   className='bg-main-light' value='0' readOnly  aria-label="Username" aria-describedby="basic-addon1"/>
                      </div>
                      <div className="ed-flex">
                          <h5>Total dividas :</h5>
                          <FormControl  className='bg-main-light' value='0'  readOnly  aria-label="Username"aria-describedby="basic-addon1"/>
                      </div>
                      <div className="ed-flex"></div>
                 </div>
            </div>
         </div> 
    </div>
   
    </>
  )
}



export default PaymentsTable

