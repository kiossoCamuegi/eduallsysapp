import { PreviewOutlined } from '@mui/icons-material';
import { Delete,  Edit  } from '@mui/icons-material';
import React from 'react'
import Table from './Table';

const trpHead = [
    'Nº',
    'Nomde do aluno',
    'Local de transferencia',  
    'Motivo da transferencia',
    'Data de transferencia',
    'Data do registro',
    'Operador',
    'Ação'
];

const trpBody = [
    ['1','Carlos pedro  Manuel pinto', 'Diversos', 
    <div className="ed-flex"><span>Doença </span> <button className="btn-circle bg-info ml-2"><PreviewOutlined/></button></div>, 
    '01/02/2023', '12/10/2022', 'Paulo Silva Job',
    <div className="ed-flex">
       <button className="btn-circle bg-success text-light">
        <Edit/>
      </button> 
      <button className="btn-circle bg-danger ml-2 text-light">
          <Delete/>
      </button>
   </div>
  ],
  ['1','Carlos pedro  Manuel pinto', 'Diversos', 
  <div className="ed-flex"><span>Doença </span> <button className="btn-circle bg-info ml-2"><PreviewOutlined/></button></div>, 
  '01/02/2023', '12/10/2022', 'Paulo Silva Job',
  <div className="ed-flex">
     <button className="btn-circle bg-success text-light">
      <Edit/>
    </button> 
    <button className="btn-circle bg-danger ml-2 text-light">
        <Delete/>
    </button>
   </div>
  ],
  ['1','Carlos pedro  Manuel pinto', 'Diversos', 
  <div className="ed-flex"><span>Doença </span> <button className="btn-circle bg-info ml-2"><PreviewOutlined/></button></div>, 
  '01/02/2023', '12/10/2022', 'Paulo Silva Job',
  <div className="ed-flex">
     <button className="btn-circle bg-success text-light">
      <Edit/>
    </button> 
    <button className="btn-circle bg-danger ml-2 text-light">
        <Delete/>
    </button>
  </div>
  ],
  ['1','Carlos pedro  Manuel pinto', 'Diversos', 
  <div className="ed-flex"><span>Doença </span> <button className="btn-circle bg-info ml-2"><PreviewOutlined/></button></div>, 
  '01/02/2023', '12/10/2022', 'Paulo Silva Job',
  <div className="ed-flex">
     <button className="btn-circle bg-success text-light">
      <Edit/>
    </button> 
    <button className="btn-circle bg-danger ml-2 text-light">
        <Delete/>
    </button>
  </div>
 ],
 ['1','Carlos pedro  Manuel pinto', 'Diversos', 
 <div className="ed-flex"><span>Doença </span> <button className="btn-circle bg-info ml-2"><PreviewOutlined/></button></div>, 
 '01/02/2023', '12/10/2022', 'Paulo Silva Job',
 <div className="ed-flex">
    <button className="btn-circle bg-success text-light">
     <Edit/>
   </button> 
   <button className="btn-circle bg-danger ml-2 text-light">
       <Delete/>
   </button>
  </div>
 ],
]

const trpOptions = {
    filterType: 'checkbox'
}

function StudentsTrpTable() {
  return (
    <>
    <Table 
        TableBody={trpBody}
        TableHead={trpHead}
        TableOptions={trpOptions}
        TableTitle="Transferências"
    />  
  </>
  )
}

export default StudentsTrpTable