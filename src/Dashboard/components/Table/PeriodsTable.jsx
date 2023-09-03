import Table from './Table'
import { Delete,  Edit   } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const PRDHead = [
    'Código',
    'Titulo', 
    'Data de registro',  
    'Ação'
];

const PRDBody = [
     ['AM','Manha',  '10/01/2022', 
        <div className="ed-flex">
        <button className="btn-circle bg-success text-light">
            <Edit/>
        </button> 
        <button className="btn-circle bg-danger ml-2 text-light">
            <Delete/>
        </button>
    </div>
    ],  
    ['PM','Tarde',  '10/01/2022', 
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

const PRDOptions = {
    filterType: 'checkbox'
}

function PeriodsTable() {
    return (
        <Table
            TableHead={PRDHead}
            TableBody={PRDBody}
            TableOptions={PRDOptions}
            TableTitle='Lista dos periodos'
        />
    )
}

export default PeriodsTable