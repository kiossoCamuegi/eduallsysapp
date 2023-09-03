import React from 'react'
import Table from './Table'
import { Delete, Description, Edit, PreviewOutlined} from '@mui/icons-material'; 

const MnHead = [
    'Nº',
    'Data & Hora',
    'Nome do aluno',
    'Serviço',
    'Total Factura',
    'Dívida Anterior', 
    'Total a pagar',  
    'Operador',  
    'Ação'
];

const MnBody = [
     ['', '', '', '', '', '', '', '', 
        <div className="ed-flex">
        <button className="btn-circle bg-success text-light">
            <Edit/>
        </button> 
        <button className="btn-circle bg-warning ml-2 text-light">
           <PreviewOutlined/>
        </button>
        <button className="btn-circle bg-danger ml-2 text-light">
            <Delete/>
        </button>
    </div>
    ],  
    
];


const MnOptions = {
    filterType: 'checkbox'
}

function ListPaymentsTable() {
  return (
    <Table
      TableHead={MnHead}
      TableBody={MnBody}
      TableOptions={MnOptions}
      TableTitle='Listar pagamento dos serviços'
    />
  )
}

export default ListPaymentsTable