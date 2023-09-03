import { Delete, Edit } from '@mui/icons-material'
import React from 'react'
import Hoot from '../../../General/components/Hoot'
import DeleteModal from '../elements/DeleteModal'
import styled from 'styled-components';
import RandomAvatarColor from '../../../General/components/RandomAvatarColor';
import { Avatar, AvatarGroup } from '@mui/material';

function FinesGrid() {
 const Data = ["", "", "","", "", ""];
 return (
   <div>
      {
         Data.map((item, index)=>{
             return (
                <LI key={index}>
                 <div className="ed-space">
                   <div className="ed-flex">
                      <h3 className='mr-2'>Titulo do serviço</h3>
                      <div className="badge bg-info"><small>Valor do serviço  1900.00 AOA </small></div>
                   </div>
                    <div className="ed-flex">
                    <button className="btn-circle btn-edit-timing bg-success text-light">
                        <Edit/>
                    </button> 
                    <DeleteModal title='este horário' url={Hoot()+`edualltimingdelete/delete/ `} 
                        message='Horário deletado com sucesso' toggle_btn={
                          <button className="btn-circle btn-delete-timing bg-danger ml-2 text-light">
                              <Delete />
                          </button>
                        }/> 
                    </div>
                 </div>
                <div className="mt-2">
                  <stong className="ed-flex">
                    Valor da multa : <div className="text-main-light ml-2">15% do valor do serviço (250.00 AOA)</div>
                   </stong>
                </div>
                 <div className="description">
                     Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius corrupti quis itaque quidem,
                      porro aliquam quam, sed tenetur obcaecati dolore dicta amet, minima numquam! Nam omnis earum 
                      dignissimos consectetur laudantium ea sequi tenetur atque voluptatum, odio repudiandae. 
                      Tempore, error sint!
                 </div>
                    <p>
                       <small>
                            Circunstancias a serem aplicadas a multa :
                       </small>
                    </p>
                     <div className='rs'><div className="dt bg-red"></div> 3 dias apos o mês ancessor o atual</div>
                    <div className='rs'><div className="dt bg-green"></div> Incrementar o valor a cada  mês</div>
                    <div className="aply-for">
                       <div className="ed-wrap">
                           <h4>Aplicar a multa para : </h4>
                           <div className="it-cl mr-2">Turma | KLH780</div>
                           <div className="it-cl mr-2">Turma | ML038</div>
                           <div className="it-cl mr-2">Turma | LPO83</div>
                       </div>
                       <div className='fn-users'>
                         <AvatarGroup max={10}  sx={{height:30}}>
                            <Avatar style={{background:`${RandomAvatarColor()}` }} />
                            <Avatar style={{background:`${RandomAvatarColor()}` }}  />
                            <Avatar style={{background:`${RandomAvatarColor()}` }}  />
                            <Avatar style={{background:`${RandomAvatarColor()}` }}  />
                            <Avatar style={{background:`${RandomAvatarColor()}` }}  />
                            <Avatar style={{background:`${RandomAvatarColor()}` }}  />
                            <Avatar style={{background:`${RandomAvatarColor()}` }}  />
                            <Avatar style={{background:`${RandomAvatarColor()}` }}  />
                            <Avatar style={{background:`${RandomAvatarColor()}` }}  />
                            <Avatar style={{background:`${RandomAvatarColor()}` }}  />
                            <Avatar style={{background:`${RandomAvatarColor()}` }}  />
                         </AvatarGroup>
                       </div>
                    </div>
                    <div className="ed-space pg">
                        <div> 
                        </div>
                        <div>
                            <button className="btn bg-main-light"> {index+1} </button>
                        </div>
                    </div>
                </LI>
             )
         })
      }
   </div>
  )
}

 


const LI = styled.li` 
    border-top:2px dotted var(--ed-silver-light);
    min-height:100px;  
    padding:40px 20px;
    padding-bottom:20px;


    .ed-space.pg{  

          .btn{
              width:30px;
              height:30px;
              border-radius:100%;
              display:flex;
              align-items:center;
              justify-content:center;
          }
    }


    .ed-space{
        .ed-flex{
            align-items:center; 
        }
    }


    strong.ed-flex{
        font-weight:600; 
    }

    .description{
        margin:15px 0px;
        font-size:13px;
        max-width:980px;
        background:var(--ed-background-color); 
        border-radius:6px; 
        border:1px solid var(--ed-silver-light);
        padding:10px;
        width:auto;
        max-width:1000px;
    }

    h3{
       font-size:16px;
       font-weight:600;
    }

    p{
       margin:10px 0px;
       max-width:700px;

       small{
          font-size:13px;
          color:var(--ed-dark);
          font-weight:600;
       }      
    }

 
    

    .rs{
        margin:5px 0px;
        font-size:14px;
        display:flex;
        align-items:center;

          .dt{
            width:7px;
            height:7px;
            border-radius:100%;
            margin-right:10px;
          }
    }  


    .aply-for{
        margin:15px 0px;

       .ed-wrap{
        align-items:center;
            h4{
                font-size:16px;
                margin:0px;
                margin-right:10px;
            }

            .it-cl{
                padding:5px 10px;
                background:var(--ed-background-color); 
                border-radius:6px;
                font-size:13px;
                border:1px solid var(--ed-silver-light);
            }
       }


       .fn-users{
          margin:20px 0px;

            .MuiAvatarGroup-root{
                   width:auto;
                   margin-left:10px; 
                   max-width:350px;
            }
       }
    }
`;


export default FinesGrid