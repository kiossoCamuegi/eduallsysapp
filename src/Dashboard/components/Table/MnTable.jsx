import Table from './Table'
import { Delete, Description, Edit ,OpenInBrowser } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const MnHead = [
    'Nº',
    'Municipio',
    'Provincia',
    'Data de registro',  
    'Ação'
];

const MnBody = [
     ['1','Kilamba', 'Luanda', '10/01/2022', 
        <div className="ed-flex">
        <button className="btn-circle bg-success text-light">
            <Edit/>
        </button> 
        <button className="btn-circle bg-danger ml-2 text-light">
            <Delete/>
        </button>
    </div>
    ], 
    ['1','Kilamba', 'Luanda', '10/01/2022', 
    <div className="ed-flex">
        <button className="btn-circle bg-success text-light">
        <Edit/>
        </button> 
        <button className="btn-circle bg-danger ml-2 text-light">
            <Delete/>
        </button>
    </div>
    ], 
    ['1','Kilamba', 'Luanda', '10/01/2022', 
    <div className="ed-flex">
    <button className="btn-circle bg-success text-light">
        <Edit/>
    </button> 
    <button className="btn-circle bg-danger ml-2 text-light">
        <Delete/>
    </button>
    </div>
    ], 
    ['1','Kilamba', 'Luanda', '10/01/2022', 
    <div className="ed-flex">
    <button className="btn-circle bg-success text-light">
        <Edit/>
    </button> 
    <button className="btn-circle bg-danger ml-2 text-light">
        <Delete/>
    </button>
    </div>
    ], 
    ['1','Kilamba', 'Luanda', '10/01/2022', 
    <div className="ed-flex">
    <button className="btn-circle bg-success text-light">
        <Edit/>
    </button> 
    <button className="btn-circle bg-danger ml-2 text-light">
        <Delete/>
    </button>
    </div>
    ], 
    ['1','Kilamba', 'Luanda', '10/01/2022', 
    <div className="ed-flex">
    <button className="btn-circle bg-success text-light">
        <Edit/>
    </button> 
    <button className="btn-circle bg-danger ml-2 text-light">
        <Delete/>
    </button>
    </div>
    ], 
    ['1','Kilamba', 'Luanda', '10/01/2022', 
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

const MnOptions = {
    filterType: 'checkbox'
}


function MnTable() {
    return (
    <Table
        TableHead={MnHead}
        TableBody={MnBody}
        TableOptions={MnOptions}
        TableTitle='Lista dos Municipios'
    />
    )
}

export default MnTable