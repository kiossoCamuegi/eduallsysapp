import React from 'react'
import Table from './Table'
import { Delete,  Edit  } from '@mui/icons-material';


const SessionsHead = [ 
    'Titulo',
    'Tutor',
    'Curso',
    'Turma',
    'Data',
    'Hora',
    'Ação'
];

const SessionsBody = [
    ['Trigonometria','Paulo lopes', 'C.F.B', 'JSK9', '12 de Maio', '12:00 - 14:30', 
    <div className="ed-flex">
      <button className="btn-circle bg-success text-light">
          <Edit/>
      </button> 
      <button className="btn-circle bg-danger ml-2 text-light">
          <Delete/>
      </button>
    </div>
     ], 
    ['Trigonometria','Paulo lopes', 'C.F.B', 'JSK9', '12 de Maio', '12:00 - 14:30', 
    <div className="ed-flex">
      <button className="btn-circle bg-success text-light">
          <Edit/>
      </button> 
      <button className="btn-circle bg-danger ml-2 text-light">
          <Delete/>
      </button>
   </div>
    ], 
    ['Trigonometria','Paulo lopes', 'C.F.B', 'JSK9', '12 de Maio', '12:00 - 14:30', 
    <div className="ed-flex">
      <button className="btn-circle bg-success text-light">
          <Edit/>
      </button> 
      <button className="btn-circle bg-danger ml-2 text-light">
          <Delete/>
      </button>
  </div>
    ], 
    ['Trigonometria','Paulo lopes', 'C.F.B', 'JSK9', '12 de Maio', '12:00 - 14:30', 
    <div className="ed-flex">
      <button className="btn-circle bg-success text-light">
          <Edit/>
      </button> 
      <button className="btn-circle bg-danger ml-2 text-light">
          <Delete/>
      </button>
  </div>
    ], 
    ['Trigonometria','Paulo lopes', 'C.F.B', 'JSK9', '12 de Maio', '12:00 - 14:30', 
    <div className="ed-flex">
      <button className="btn-circle bg-success text-light">
          <Edit/>
      </button> 
      <button className="btn-circle bg-danger ml-2 text-light">
          <Delete/>
      </button>
  </div>
    ], 
    ['Trigonometria','Paulo lopes', 'C.F.B', 'JSK9', '12 de Maio', '12:00 - 14:30', 
    <div className="ed-flex">
      <button className="btn-circle bg-success text-light">
          <Edit/>
      </button> 
      <button className="btn-circle bg-danger ml-2 text-light">
          <Delete/>
      </button>
  </div>
    ], 
    ['Trigonometria','Paulo lopes', 'C.F.B', 'JSK9', '12 de Maio', '12:00 - 14:30', 
    <div className="ed-flex">
      <button className="btn-circle bg-success text-light">
          <Edit/>
      </button> 
      <button className="btn-circle bg-danger ml-2 text-light">
          <Delete/>
      </button>
  </div>
    ], 
    ['Trigonometria','Paulo lopes', 'C.F.B', 'JSK9', '12 de Maio', '12:00 - 14:30', 
    <div className="ed-flex">
      <button className="btn-circle bg-success text-light">
          <Edit/>
      </button> 
      <button className="btn-circle bg-danger ml-2 text-light">
          <Delete/>
      </button>
  </div>
    ], 
    ['Trigonometria','Paulo lopes', 'C.F.B', 'JSK9', '12 de Maio', '12:00 - 14:30', 
    <div className="ed-flex">
      <button className="btn-circle bg-success text-light">
          <Edit/>
      </button> 
      <button className="btn-circle bg-danger ml-2 text-light">
          <Delete/>
      </button>
  </div>
    ],  ['Trigonometria','Paulo lopes', 'C.F.B', 'JSK9', '12 de Maio', '12:00 - 14:30', 
    <div className="ed-flex">
      <button className="btn-circle bg-success text-light">
          <Edit/>
      </button> 
      <button className="btn-circle bg-danger ml-2 text-light">
          <Delete/>
      </button>
  </div>
    ]
]

const SessionsOptions = {
    filterType: 'checkbox'
}

function SessionsTable() {
  return (
    <Table
        TableHead={SessionsHead}
        TableBody={SessionsBody}
        TableOptions={SessionsOptions}
        TableTitle='Lista das Sessões / Aulas'
    />
  )
}

export default SessionsTable