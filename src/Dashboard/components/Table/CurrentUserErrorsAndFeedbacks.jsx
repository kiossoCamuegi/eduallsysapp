
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Delete, Description, Edit , PreviewOutlined } from '@mui/icons-material';
import Table from './Table';
import Hoot from '../../../General/components/Hoot';
import DeleteModal from '../elements/DeleteModal';
import NewCourseModal from '../modal/NewCourseModal';
import { Badge } from 'react-bootstrap';
const TABLEURL = Hoot()+"eduallfeedbacks/get";

 

const FeedbacksHead = [  
    'Tipo de registro',  
    'Status Visita',
    'Classificação',
    'Descrição', 
];


const FeedbacksOptions = {
    //filterType: 'checkbox',
    selection:true
}
 
 


function CurrentUserErrorsAndFeedbacks() {
  const [data, setData] = useState([]); 
  const [refresh, setRefresh] = useState(true);
   
  async function loadData(){
      const response = await axios.get(TABLEURL); 
      setData(response.data);
  };

 useEffect(()=>{
      loadData();
  });


const FeedbacksBody = [];
  data.map((item, index)=>{
    let vs = '';
    if(item.ed_feedback_visit_status === 0){vs = 'Irritatante'  
    } else if(item.ed_feedback_visit_status === 1){vs = 'Lento';
    }else if( item.ed_feedback_visit_status === 2){vs = 'Aborrecido'
    }else if( item.ed_feedback_visit_status === 3){vs = 'Muito bom'
    }else{vs = 'Amei super bom';}

      FeedbacksBody.push([  
        item.ed_feedback_type === 0 ? 'Erro' : 'Feedback' ,
        vs, 
        item.ed_feedback_rating,
        <button className='btn-circle  bg-primary text-light'><PreviewOutlined/></button>
    ]);
  }); 

  return (
    <Table
        TableHead={FeedbacksHead}
        TableBody={FeedbacksBody}
        TableOptions={FeedbacksOptions}
        TableTitle='Feedbacks & Erros'
    />
  )

  /*
  return (
    <div>
     <Table className='table-bt'>
      <thead>
        <tr>
          <th>Tipo de registro</th>
          <th>Visita no sistema</th>
          <th>Classificação</th> 
          <th>Detalhes</th>
        </tr>
      </thead>
      <tbody>
         <tr>
          <td>
            <div className="ed-flex">
                <div className="icon">❌</div>
                <span>Erro no sistema</span>
            </div>
          </td>
          <td>
              <Badge bg='danger'>Irritante</Badge>
          </td>
          <td>
              <Badge bg='info'>1 - 5</Badge>
          </td>
          <td> 
            <div className="ed-flex"> 
                <button  className="btn-circle bg-success text-light">
                    <Edit />
                </button>
                <button  className="btn-circle bg-warning ml-2 text-light">
                    <PreviewOutlined />
                </button>
                <button  className="btn-circle bg-danger ml-2 text-light">
                    <Delete />
                </button>
            </div>
          </td>
        </tr> 
         <tr>
          <td>
            <div className="ed-flex">
                <div className="icon">🤓</div>
                <span>Erro no sistema</span>
            </div>
          </td>
          <td>
              <Badge bg='danger'>Irritante</Badge>
          </td>
          <td>
              <Badge bg='warning'>1 - 2</Badge>
          </td>
          <td> 
            <div className="ed-flex"> 
                <button  className="btn-circle bg-success text-light">
                    <Edit />
                </button>
                <button  className="btn-circle bg-warning ml-2 text-light">
                    <PreviewOutlined />
                </button>
                <button  className="btn-circle bg-danger ml-2 text-light">
                    <Delete />
                </button>
            </div>
          </td>
        </tr> 
         <tr>
          <td>
            <div className="ed-flex">
                <div className="icon">❌</div>
                <span>Erro no sistema</span>
            </div>
          </td>
          <td>
              <Badge bg='danger'>Irritante</Badge>
          </td>
          <td>
              <Badge bg='info'>1 - 5</Badge>
          </td>
          <td> 
            <div className="ed-flex"> 
                <button  className="btn-circle bg-success text-light">
                    <Edit />
                </button>
                <button  className="btn-circle bg-warning ml-2 text-light">
                    <PreviewOutlined />
                </button>
                <button  className="btn-circle bg-danger ml-2 text-light">
                    <Delete />
                </button>
            </div>
          </td>
        </tr> 
         <tr>
          <td>
            <div className="ed-flex">
                <div className="icon">🤓</div>
                <span>Erro no sistema</span>
            </div>
          </td>
          <td>
              <Badge bg='danger'>Irritante</Badge>
          </td>
          <td>
              <Badge bg='warning'>1 - 2</Badge>
          </td>
          <td> 
            <div className="ed-flex"> 
                <button  className="btn-circle bg-success text-light">
                    <Edit />
                </button>
                <button  className="btn-circle bg-warning ml-2 text-light">
                    <PreviewOutlined />
                </button>
                <button  className="btn-circle bg-danger ml-2 text-light">
                    <Delete />
                </button>
            </div>
          </td>
        </tr> 
         <tr>
          <td>
            <div className="ed-flex">
                <div className="icon">❌</div>
                <span>Erro no sistema</span>
            </div>
          </td>
          <td>
              <Badge bg='danger'>Irritante</Badge>
          </td>
          <td>
              <Badge bg='info'>1 - 5</Badge>
          </td>
          <td> 
            <div className="ed-flex"> 
                <button  className="btn-circle bg-success text-light">
                    <Edit />
                </button>
                <button  className="btn-circle bg-warning ml-2 text-light">
                    <PreviewOutlined />
                </button>
                <button  className="btn-circle bg-danger ml-2 text-light">
                    <Delete />
                </button>
            </div>
          </td>
        </tr> 
         <tr>
          <td>
            <div className="ed-flex">
                <div className="icon">🤓</div>
                <span>Erro no sistema</span>
            </div>
          </td>
          <td>
              <Badge bg='danger'>Irritante</Badge>
          </td>
          <td>
              <Badge bg='warning'>1 - 2</Badge>
          </td>
          <td> 
            <div className="ed-flex"> 
                <button  className="btn-circle bg-success text-light">
                    <Edit />
                </button>
                <button  className="btn-circle bg-warning ml-2 text-light">
                    <PreviewOutlined />
                </button>
                <button  className="btn-circle bg-danger ml-2 text-light">
                    <Delete />
                </button>
            </div>
          </td>
        </tr> 
         <tr>
          <td>
            <div className="ed-flex">
                <div className="icon">❌</div>
                <span>Erro no sistema</span>
            </div>
          </td>
          <td>
              <Badge bg='danger'>Irritante</Badge>
          </td>
          <td>
              <Badge bg='info'>1 - 5</Badge>
          </td>
          <td> 
            <div className="ed-flex"> 
                <button  className="btn-circle bg-success text-light">
                    <Edit />
                </button>
                <button  className="btn-circle bg-warning ml-2 text-light">
                    <PreviewOutlined />
                </button>
                <button  className="btn-circle bg-danger ml-2 text-light">
                    <Delete />
                </button>
            </div>
          </td>
        </tr> 
         <tr>
          <td>
            <div className="ed-flex">
                <div className="icon">🤓</div>
                <span>Erro no sistema</span>
            </div>
          </td>
          <td>
              <Badge bg='danger'>Irritante</Badge>
          </td>
          <td>
              <Badge bg='warning'>1 - 2</Badge>
          </td>
          <td> 
            <div className="ed-flex"> 
                <button  className="btn-circle bg-success text-light">
                    <Edit />
                </button>
                <button  className="btn-circle bg-warning ml-2 text-light">
                    <PreviewOutlined />
                </button>
                <button  className="btn-circle bg-danger ml-2 text-light">
                    <Delete />
                </button>
            </div>
          </td>
        </tr>  
        <tr>
          <td>
            <div className="ed-flex">
                <div className="icon">❌</div>
                <span>Erro no sistema</span>
            </div>
          </td>
          <td>
              <Badge bg='danger'>Irritante</Badge>
          </td>
          <td>
              <Badge bg='info'>1 - 5</Badge>
          </td>
          <td> 
            <div className="ed-flex"> 
                <button  className="btn-circle bg-success text-light">
                    <Edit />
                </button>
                <button  className="btn-circle bg-warning ml-2 text-light">
                    <PreviewOutlined />
                </button>
                <button  className="btn-circle bg-danger ml-2 text-light">
                    <Delete />
                </button>
            </div>
          </td>
        </tr> 
         <tr>
          <td>
            <div className="ed-flex">
                <div className="icon">🤓</div>
                <span>Erro no sistema</span>
            </div>
          </td>
          <td>
              <Badge bg='danger'>Irritante</Badge>
          </td>
          <td>
              <Badge bg='warning'>1 - 2</Badge>
          </td>
          <td> 
            <div className="ed-flex"> 
                <button  className="btn-circle bg-success text-light">
                    <Edit />
                </button>
                <button  className="btn-circle bg-warning ml-2 text-light">
                    <PreviewOutlined />
                </button>
                <button  className="btn-circle bg-danger ml-2 text-light">
                    <Delete />
                </button>
            </div>
          </td>
        </tr> 
      </tbody>
    </Table>
    </div>
  )
  */
}

export default CurrentUserErrorsAndFeedbacks