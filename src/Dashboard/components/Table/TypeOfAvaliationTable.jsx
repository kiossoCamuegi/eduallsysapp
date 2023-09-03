import Table from './Table'
import { Delete,  Edit   } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const TOFVHead = [
    'Nº',
    'Tipo de avaliação', 
    'Data de registro',  
    'Ação'
];

const TOFVBody = [
    ['1','CAP',  '10/01/2022', 
        <div className="ed-flex">
        <button className="btn-circle bg-success text-light">
            <Edit/>
        </button> 
        <button className="btn-circle bg-danger ml-2 text-light">
            <Delete/>
        </button>
    </div>
    ],   
    ['1','CAP',  '10/01/2022', 
        <div className="ed-flex">
        <button className="btn-circle bg-success text-light">
            <Edit/>
        </button> 
        <button className="btn-circle bg-danger ml-2 text-light">
            <Delete/>
        </button>
    </div>
    ],   
    ['1','CAP',  '10/01/2022', 
    <div className="ed-flex">
    <button className="btn-circle bg-success text-light">
        <Edit/>
    </button> 
    <button className="btn-circle bg-danger ml-2 text-light">
        <Delete/>
    </button>
    </div>
    ],   
    ['1','CAP',  '10/01/2022', 
    <div className="ed-flex">
    <button className="btn-circle bg-success text-light">
        <Edit/>
    </button> 
    <button className="btn-circle bg-danger ml-2 text-light">
        <Delete/>
    </button>
    </div>
    ],   
    ['1','CAP',  '10/01/2022', 
    <div className="ed-flex">
    <button className="btn-circle bg-success text-light">
        <Edit/>
    </button> 
    <button className="btn-circle bg-danger ml-2 text-light">
        <Delete/>
    </button>
    </div>
    ]
];

const TOFVOptions = {
    filterType: 'checkbox'
}


function TypeOfAvaliationTable() {
  return (
    <Table
        TableHead={TOFVHead}
        TableBody={TOFVBody}
        TableOptions={TOFVOptions}
        TableTitle='Lista dos tipos de avaliação'
    />
  )
}

export default TypeOfAvaliationTable