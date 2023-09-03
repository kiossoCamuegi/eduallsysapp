import React from 'react'
import Table from './Table';
import { Delete, Description, Edit} from '@mui/icons-material';

const TOSHead = [ 
    'Nº',
    'Titulo',
    'Taxa do serviço',
    'Status',
    'Forma de pagamento',
    'Multa', 
    'Ação'
];

const TOSBody = [
    [ 
        '1','Recurso','19.000.00 Kz', 'Ativo', 'Mensal', 'Nenhuma', 
        <div className="ed-flex">
        <button className="btn-circle bg-success text-light">
            <Edit/>
        </button>
        <button className="btn-circle bg-warning ml-2 text-light">
            <Description/>
        </button>
        <button className="btn-circle bg-danger ml-2 text-light">
            <Delete/>
        </button>
        </div>
    ],  
    [ 
        '1','Recurso','19.000.00 Kz', 'Ativo', 'Mensal', 'Nenhuma', 
        <div className="ed-flex">
        <button className="btn-circle bg-success text-light">
            <Edit/>
        </button>
        <button className="btn-circle bg-warning ml-2 text-light">
            <Description/>
        </button>
        <button className="btn-circle bg-danger ml-2 text-light">
            <Delete/>
        </button>
        </div>
    ],  
    [ 
        '1','Recurso','19.000.00 Kz', 'Ativo', 'Mensal', 'Nenhuma', 
        <div className="ed-flex">
        <button className="btn-circle bg-success text-light">
            <Edit/>
        </button>
        <button className="btn-circle bg-warning ml-2 text-light">
            <Description/>
        </button>
        <button className="btn-circle bg-danger ml-2 text-light">
            <Delete/>
        </button>
        </div>
    ],  
    [ 
        '1','Recurso','19.000.00 Kz', 'Ativo', 'Mensal', 'Nenhuma', 
        <div className="ed-flex">
        <button className="btn-circle bg-success text-light">
            <Edit/>
        </button>
        <button className="btn-circle bg-warning ml-2 text-light">
            <Description/>
        </button>
        <button className="btn-circle bg-danger ml-2 text-light">
            <Delete/>
        </button>
        </div>
    ],  
    [ 
        '1','Recurso','19.000.00 Kz', 'Ativo', 'Mensal', 'Nenhuma', 
        <div className="ed-flex">
        <button className="btn-circle bg-success text-light">
            <Edit/>
        </button>
        <button className="btn-circle bg-warning ml-2 text-light">
            <Description/>
        </button>
        <button className="btn-circle bg-danger ml-2 text-light">
            <Delete/>
        </button>
        </div>
    ],  
    [ 
        '1','Recurso','19.000.00 Kz', 'Ativo', 'Mensal', 'Nenhuma', 
        <div className="ed-flex">
        <button className="btn-circle bg-success text-light">
            <Edit/>
        </button>
        <button className="btn-circle bg-warning ml-2 text-light">
            <Description/>
        </button>
        <button className="btn-circle bg-danger ml-2 text-light">
            <Delete/>
        </button>
        </div>
    ],  
    [ 
        '1','Recurso','19.000.00 Kz', 'Ativo', 'Mensal', 'Nenhuma', 
        <div className="ed-flex">
        <button className="btn-circle bg-success text-light">
            <Edit/>
        </button>
        <button className="btn-circle bg-warning ml-2 text-light">
            <Description/>
        </button>
        <button className="btn-circle bg-danger ml-2 text-light">
            <Delete/>
        </button>
        </div>
    ],  
    [ 
        '1','Recurso','19.000.00 Kz', 'Ativo', 'Mensal', 'Nenhuma', 
        <div className="ed-flex">
        <button className="btn-circle bg-success text-light">
            <Edit/>
        </button>
        <button className="btn-circle bg-warning ml-2 text-light">
            <Description/>
        </button>
        <button className="btn-circle bg-danger ml-2 text-light">
            <Delete/>
        </button>
        </div>
    ],  
    [ 
        '1','Recurso','19.000.00 Kz', 'Ativo', 'Mensal', 'Nenhuma', 
        <div className="ed-flex">
        <button className="btn-circle bg-success text-light">
            <Edit/>
        </button>
        <button className="btn-circle bg-warning ml-2 text-light">
            <Description/>
        </button>
        <button className="btn-circle bg-danger ml-2 text-light">
            <Delete/>
        </button>
        </div>
    ],  
    [ 
        '1','Recurso','19.000.00 Kz', 'Ativo', 'Mensal', 'Nenhuma', 
        <div className="ed-flex">
        <button className="btn-circle bg-success text-light">
            <Edit/>
        </button>
        <button className="btn-circle bg-warning ml-2 text-light">
            <Description/>
        </button>
        <button className="btn-circle bg-danger ml-2 text-light">
            <Delete/>
        </button>
        </div>
    ]
];

const TOSOptions = {
    filterType: 'checkbox'
}

function TypeofServiceTable() {
  return (
    <Table
        TableHead={TOSHead}
        TableBody={TOSBody}
        TableOptions={TOSOptions}
        TableTitle='Lista dos tipos serviços'
    />
  )
}

export default TypeofServiceTable