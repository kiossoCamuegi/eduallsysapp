import Table from './Table'
import { Delete,  Edit   } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const SSTHead = [
    'Nº',
    'Titulo', 
    'Data de registro',  
    'Ação'
];

const SSTBody = [
     ['1','Anulou', '10/12/2022 - 10:26',
        <div className="ed-flex">
        <button className="btn-circle bg-success text-light">
            <Edit/>
        </button> 
        <button className="btn-circle bg-danger ml-2 text-light">
            <Delete/>
        </button>
    </div>
    ],  
    ['1','Anulou', '10/12/2022 - 10:26',
    <div className="ed-flex">
    <button className="btn-circle bg-success text-light">
        <Edit/>
    </button> 
    <button className="btn-circle bg-danger ml-2 text-light">
        <Delete/>
    </button>
   </div>
   ], 
    ['1','Anulou', '10/12/2022 - 10:26',
    <div className="ed-flex">
    <button className="btn-circle bg-success text-light">
        <Edit/>
    </button> 
    <button className="btn-circle bg-danger ml-2 text-light">
        <Delete/>
    </button>
    </div>
    ],  
    ['1','Anulou', '10/12/2022 - 10:26',
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

const SSTOptions = {
    filterType: 'checkbox'
}
 
function StudentStatusTable() {
    return (
        <Table
            TableHead={SSTHead}
            TableBody={SSTBody}
            TableOptions={SSTOptions}
            TableTitle='Lista dos status'
        />
    )
}
export default StudentStatusTable