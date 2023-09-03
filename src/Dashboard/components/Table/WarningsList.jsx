import React from 'react'
import Table from './Table';
import { Delete, Description, Edit ,OpenInBrowser, PrintTwoTone } from '@mui/icons-material';

const WarningHead = [ 
    'Nº',
    'Nome do Aluno', 
    'Mês de cobrança',
    'Data Limite',
    'Ação'
];

const WarningBody = [
    [ 
        '1', 'Carlos Mateus pedro' , 
        'Janeiro', '05 de Fevereiro de 2022',
        <div className="ed-flex">
        <button className="btn-circle bg-success text-light">
            <Edit/>
        </button>
        <button className="btn-circle bg-warning ml-2 text-light">
            <OpenInBrowser/>
        </button>
        <button className="btn-circle bg-secondary ml-2 text-light">
            <PrintTwoTone/>
        </button>
        <button className="btn-circle bg-danger ml-2 text-light">
            <Delete/>
        </button>
        </div>
    ],  
    [ 
        '1', <span className="text-danger">Aviso Geral</span> , 
        'Janeiro', '05 de Fevereiro de 2022',
        <div className="ed-flex">
        <button className="btn-circle bg-success text-light">
            <Edit/>
        </button>
        <button className="btn-circle bg-warning ml-2 text-light">
            <OpenInBrowser/>
        </button>
        <button className="btn-circle bg-secondary ml-2 text-light">
            <PrintTwoTone/>
        </button>
        <button className="btn-circle bg-danger ml-2 text-light">
            <Delete/>
        </button>
        </div>
    ],  
    [ 
        '1', <span className="text-danger">Aviso Geral</span> , 
        'Janeiro', '05 de Fevereiro de 2022',
        <div className="ed-flex">
        <button className="btn-circle bg-success text-light">
            <Edit/>
        </button>
        <button className="btn-circle bg-warning ml-2 text-light">
            <OpenInBrowser/>
        </button>
        <button className="btn-circle bg-secondary ml-2 text-light">
            <PrintTwoTone/>
        </button>
        <button className="btn-circle bg-danger ml-2 text-light">
            <Delete/>
        </button>
        </div>
    ],  
    [ 
        '1', 'Carlos Mateus pedro' , 
        'Janeiro', '05 de Fevereiro de 2022',
        <div className="ed-flex">
        <button className="btn-circle bg-success text-light">
            <Edit/>
        </button>
        <button className="btn-circle bg-warning ml-2 text-light">
            <OpenInBrowser/>
        </button>
        <button className="btn-circle bg-secondary ml-2 text-light">
            <PrintTwoTone/>
        </button>
        <button className="btn-circle bg-danger ml-2 text-light">
            <Delete/>
        </button>
        </div>
    ],  
    [ 
        '1', <span className="text-danger">Aviso Geral</span> , 
        'Janeiro', '05 de Fevereiro de 2022',
        <div className="ed-flex">
        <button className="btn-circle bg-success text-light">
            <Edit/>
        </button>
        <button className="btn-circle bg-warning ml-2 text-light">
            <OpenInBrowser/>
        </button>
        <button className="btn-circle bg-secondary ml-2 text-light">
            <PrintTwoTone/>
        </button>
        <button className="btn-circle bg-danger ml-2 text-light">
            <Delete/>
        </button>
        </div>
    ],  
    [ 
        '1', 'Carlos Mateus pedro' , 
        'Janeiro', '05 de Fevereiro de 2022',
        <div className="ed-flex">
        <button className="btn-circle bg-success text-light">
            <Edit/>
        </button>
        <button className="btn-circle bg-warning ml-2 text-light">
            <OpenInBrowser/>
        </button>
        <button className="btn-circle bg-secondary ml-2 text-light">
            <PrintTwoTone/>
        </button>
        <button className="btn-circle bg-danger ml-2 text-light">
            <Delete/>
        </button>
        </div>
    ],  
    [ 
        '1', <span className="text-danger">Aviso Geral</span> , 
        'Janeiro', '05 de Fevereiro de 2022',
        <div className="ed-flex">
        <button className="btn-circle bg-success text-light">
            <Edit/>
        </button>
        <button className="btn-circle bg-warning ml-2 text-light">
            <OpenInBrowser/>
        </button>
        <button className="btn-circle bg-secondary ml-2 text-light">
            <PrintTwoTone/>
        </button>
        <button className="btn-circle bg-danger ml-2 text-light">
            <Delete/>
        </button>
        </div>
    ],  
    [ 
        '1', <span className="text-danger">Aviso Geral</span> , 
        'Janeiro', '05 de Fevereiro de 2022',
        <div className="ed-flex">
        <button className="btn-circle bg-success text-light">
            <Edit/>
        </button>
        <button className="btn-circle bg-warning ml-2 text-light">
            <OpenInBrowser/>
        </button>
        <button className="btn-circle bg-secondary ml-2 text-light">
            <PrintTwoTone/>
        </button>
        <button className="btn-circle bg-danger ml-2 text-light">
            <Delete/>
        </button>
        </div>
    ],  
    [ 
        '1', 'Carlos Mateus pedro' , 
        'Janeiro', '05 de Fevereiro de 2022',
        <div className="ed-flex">
        <button className="btn-circle bg-success text-light">
            <Edit/>
        </button>
        <button className="btn-circle bg-warning ml-2 text-light">
            <OpenInBrowser/>
        </button>
        <button className="btn-circle bg-secondary ml-2 text-light">
            <PrintTwoTone/>
        </button>
        <button className="btn-circle bg-danger ml-2 text-light">
            <Delete/>
        </button>
        </div>
    ],  
    [ 
        '1', <span className="text-danger">Aviso Geral</span> , 
        'Janeiro', '05 de Fevereiro de 2022',
        <div className="ed-flex">
        <button className="btn-circle bg-success text-light">
            <Edit/>
        </button>
        <button className="btn-circle bg-warning ml-2 text-light">
            <OpenInBrowser/>
        </button>
        <button className="btn-circle bg-secondary ml-2 text-light">
            <PrintTwoTone/>
        </button>
        <button className="btn-circle bg-danger ml-2 text-light">
            <Delete/>
        </button>
        </div>
    ],  
    [ 
        '1', 'Carlos Mateus pedro' , 
        'Janeiro', '05 de Fevereiro de 2022',
        <div className="ed-flex">
        <button className="btn-circle bg-success text-light">
            <Edit/>
        </button>
        <button className="btn-circle bg-warning ml-2 text-light">
            <OpenInBrowser/>
        </button>
        <button className="btn-circle bg-secondary ml-2 text-light">
            <PrintTwoTone/>
        </button>
        <button className="btn-circle bg-danger ml-2 text-light">
            <Delete/>
        </button>
        </div>
    ],  
    [ 
        '1', <span className="text-danger">Aviso Geral</span> , 
        'Janeiro', '05 de Fevereiro de 2022',
        <div className="ed-flex">
        <button className="btn-circle bg-success text-light">
            <Edit/>
        </button>
        <button className="btn-circle bg-warning ml-2 text-light">
            <OpenInBrowser/>
        </button>
        <button className="btn-circle bg-secondary ml-2 text-light">
            <PrintTwoTone/>
        </button>
        <button className="btn-circle bg-danger ml-2 text-light">
            <Delete/>
        </button>
        </div>
    ],  
];


const WarningOptions = {
    filterType: 'checkbox'
}


function WarningsList() {
  return (
    <>
    <Table
        TableHead={WarningHead}
        TableBody={WarningBody}
        TableOptions={WarningOptions}
        TableTitle='Lista dos Avisos'
     />
   </>
  )
}

export default WarningsList