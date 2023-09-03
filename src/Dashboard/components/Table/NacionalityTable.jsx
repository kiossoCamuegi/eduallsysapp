import React from 'react'
import Table from './Table';
import { Delete, Description, Edit , PreviewOutlined } from '@mui/icons-material';

const NacionalityHead = [ 
    'Nº',
    'Nacionalidade',  
    'Data de Registro',
    'Ação'
];

const NacionalityBody = [
    [ 
        '1',
        'Angolana', 
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
        'Angolana', 
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
        'Angolana', 
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
        'Angolana', 
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
        'Angolana', 
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
        'Angolana', 
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
        'Angolana', 
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


const NacionalityOptions = {
    filterType: 'checkbox'
}

function NacionalityTable() {
  return (
    <Table
        TableHead={NacionalityHead}
        TableBody={NacionalityBody}
        TableOptions={NacionalityOptions}
        TableTitle='Lista das Nacionalidades'
    />
  )
}

export default NacionalityTable