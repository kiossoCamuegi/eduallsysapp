import React from 'react'  
import {PreviewOutlined , LocalPrintshopOutlined, Delete, Edit} from '@mui/icons-material';  
import Table from './Table';
import { Link } from 'react-router-dom';
import { Badge } from 'react-bootstrap';

const studentMarksHead = [
    "Código",
    "Nome",
    "Turma",
    "Situação",
    "Ação"
];

const studentsMarksBody = [
    [ 
        <Link to='/StudentInfo?student_code='>#89263</Link>, "Carlos Manuel Gonsalvez", "JKD9", 
        <Badge class="badge  bg-danger">Reprovado</Badge>,
        <div className="ed-flex">
          <button className="btn-circle bg-success text-light">
          <Edit/>
        </button> 
        <button className="btn-circle bg-danger ml-2 text-light">
            <Delete/>
        </button> 
        <button className="btn-circle bg-secondary ml-2 text-light">
            <LocalPrintshopOutlined/>
        </button>
      </div>
      ],
    [ 
      <Link to='/StudentInfo?student_code='>#89263</Link>, "Carlos Manuel Gonsalvez", "JKD9", 
      <Badge class="badge  bg-success">Transito</Badge>,
      <div className="ed-flex">
        <button className="btn-circle bg-success text-light">
        <Edit/>
      </button> 
      <button className="btn-circle bg-danger ml-2 text-light">
          <Delete/>
      </button> 
      <button className="btn-circle bg-secondary ml-2 text-light">
          <LocalPrintshopOutlined/>
      </button>
    </div>
    ],
    [ 
        <Link to='/StudentInfo?student_code='>#89263</Link>, "Carlos Manuel Gonsalvez", "JKD9", 
        <Badge class="badge  bg-danger">Reprovado</Badge>,
        <div className="ed-flex">
          <button className="btn-circle bg-success text-light">
          <Edit/>
        </button> 
        <button className="btn-circle bg-danger ml-2 text-light">
            <Delete/>
        </button> 
        <button className="btn-circle bg-secondary ml-2 text-light">
            <LocalPrintshopOutlined/>
        </button>
      </div>
      ],
      [ 
        <Link to='/StudentInfo?student_code='>#89263</Link>, "Carlos Manuel Gonsalvez", "JKD9", 
        <Badge class="badge  bg-success">Transito</Badge>,
        <div className="ed-flex">
          <button className="btn-circle bg-success text-light">
          <Edit/>
        </button> 
        <button className="btn-circle bg-danger ml-2 text-light">
            <Delete/>
        </button> 
        <button className="btn-circle bg-secondary ml-2 text-light">
            <LocalPrintshopOutlined/>
        </button>
      </div>
      ],
      [ 
        <Link to='/StudentInfo?student_code='>#89263</Link>, "Carlos Manuel Gonsalvez", "JKD9", 
        <Badge class="badge  bg-warning">Pendente</Badge>,
        <div className="ed-flex">
          <button className="btn-circle bg-success text-light">
          <Edit/>
        </button> 
        <button className="btn-circle bg-danger ml-2 text-light">
            <Delete/>
        </button> 
        <button className="btn-circle bg-secondary ml-2 text-light">
            <LocalPrintshopOutlined/>
        </button>
      </div>
      ],
]


const studentMarksOptions = {
    filterType: "checkbox"
}


function TableMarks() {
  return (
     <> 
     <Table 
         TableHead={studentMarksHead}
         TableBody={studentsMarksBody}
         TableOptions={studentMarksOptions}
         TableTitle="Boletins de notas"
     />
     </>
  )
} 

export default TableMarks