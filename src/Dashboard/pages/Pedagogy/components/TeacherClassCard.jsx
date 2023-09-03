import styled from '@emotion/styled'
import { Avatar } from '@mui/material';
import React from 'react'
import { ProgressBar } from 'react-bootstrap';
import { GetClasstitle_byclass } from '../../../../General/components/InstituteData';

function TeacherClassCard(props) {
  return (
    <Card>
        <div className="ed-flex">
            <Avatar src='' alt=''/>
            <div className="ed-block">
                <h1>#############</h1>
                <div className="ed-flex">Disciplina : ******* </div>
            </div>
        </div>
        <div className="block-list">
           {props.data.class_data.map((el, e)=>{
              return(  
              <div className="block mt-2" key={e}>
                   <div className="ed-flex">
                      Turma :  <strong><GetClasstitle_byclass ID={el.class_code} /> </strong>
                   </div>
                    <ProgressBar  variant='info' now={el.curricular_plan} />
                </div>)
           })}
        </div>
    </Card>
  )
}


const Card = styled.li`
   width:100%;
   min-height:100px;
   background:#eff2fb;
    padding:10px;
    border-radius:6px;
    list-style:none;
    margin: 10px 0px;

    .ed-block{
        padding-left:10px; 

        h1{
          font-size:14px;
          color:var(--ed-dark);
          margin:0px;
        }

        span{
            color:var(--dark);
            font-size:12px;
        }  
    }

    .progress {
        height:6px;
    }
`;

export default TeacherClassCard
