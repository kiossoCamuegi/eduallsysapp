import React from 'react'
import Table from './Table';
import { Delete, Description, Edit , PreviewOutlined } from '@mui/icons-material';

const jobHead = [ 
    'Nº',
    'Titulo',  
    'Data de Registro',
    'Ação'
];

const jobBody = [
    [ 
        '1',
        'Programador', 
        '18/02/2022 - 10:28', 
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
        '1',
        'Programador', 
        '18/02/2022 - 10:28', 
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
        '1',
        'Programador', 
        '18/02/2022 - 10:28', 
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
        '1',
        'Programador', 
        '18/02/2022 - 10:28', 
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
        '1',
        'Programador', 
        '18/02/2022 - 10:28', 
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
        '1',
        'Programador', 
        '18/02/2022 - 10:28', 
        <div className="ed-flex">
        <button className="btn-circle bg-success text-light">
            <Edit/>
        </button> 
        <button className="btn-circle bg-danger ml-2 text-light">
            <Delete/>
        </button>
        </div>
    ],    
];


const jobOptions = {
    filterType: 'checkbox'
}

function JobsTitlesTable() {
  return (
    <Table
      TableHead={jobHead}
      TableBody={jobBody}
      TableOptions={jobOptions}
      TableTitle='Lista das profissões'
   />
  )
}

export default JobsTitlesTable