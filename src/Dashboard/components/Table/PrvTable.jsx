import React from 'react'
import Table from './Table';
import { Delete, Description, Edit , PreviewOutlined } from '@mui/icons-material';

const prvHead = [ 
    'Nº',
    'Titulo',  
    'Data de Registro',
    'Ação'
];

const prvBody = [
    [ 
        '1',
        'Luanda', 
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
        'Luanda', 
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
        'Luanda', 
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
        'Luanda', 
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
        'Luanda', 
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
        'Luanda', 
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


const prvOptions = {
    filterType: 'checkbox'
}


function PrvTable() {
    return (
        <Table
          TableHead={prvHead}
          TableBody={prvBody}
          TableOptions={prvOptions}
          TableTitle='Lista das provincias'
       />
    )
}

export default PrvTable