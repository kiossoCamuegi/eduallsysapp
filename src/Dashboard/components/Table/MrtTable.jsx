import React from 'react'
import Table from './Table';
import { Delete, Edit , PreviewOutlined } from '@mui/icons-material';


const MrtHead = [ 
    'Nº', 
    'Nome', 
    'Ação'
];

const MrtBody = [
    [ 
        '4553', 
        'Paulo Manuel José',  
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
    [ 
        '4553', 
        'Paulo Manuel José',  
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
    [ 
        '4553', 
        'Paulo Manuel José',  
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
    [ 
        '4553', 
        'Paulo Manuel José',  
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
    [ 
        '4553', 
        'Paulo Manuel José',  
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
    [ 
        '4553', 
        'Paulo Manuel José',  
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
    [ 
        '4553', 
        'Paulo Manuel José',  
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
    [ 
        '4553', 
        'Paulo Manuel José',  
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
    [ 
        '4553', 
        'Paulo Manuel José',  
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


const MrtOptions = {
    filterType: 'checkbox'
}


function MrtTable() {
    return (
        <Table
          TableHead={MrtHead}
          TableBody={MrtBody}
          TableOptions={MrtOptions}
          TableTitle='Atribuições de méritos'
        />
      )
}

export default MrtTable