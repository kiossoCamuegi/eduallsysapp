import React from 'react'
import { styled } from 'styled-components';
import {BsClock, BsStar } from "react-icons/bs";
import ReduceTextLength from '../../../General/components/ReduceTextLength';


function EmployeeLatestWorksGrid(props) {

  const Data = [
      {type:1 , event:1},
      {type:1 , event:2},
      {type:1 , event:3},
      {type:1 , event:4},
  ];

  return (
    <Container>
          <ul>
              {Data.map((item, index)=>{
                  return(
                      <li className={`list-item-${item.event}`} key={index}>
                        <div className="box-details">
                            <div className="ed-flex">
                                <div className="icon"><BsStar/></div>
                                <div className="ed-block">
                                <div className="time ed-flex mb-2"><BsClock/> <div className="ml-1">das 12:30 ate as 14:30 (1H)</div> </div>
                                     <h2 className="title">
                                        <ReduceTextLength  text="Efectuou um pagamento de propina para o estudante carlos mateus" length="40" />
                                      </h2>
                                </div>
                            </div>
                        </div>
                        <hr />
                      </li>
                   )
              })}
          </ul>
          <div className="box-details">
            {Data.length >= 1  ? 
                <button className="btn btn-bordered text-main-light">Visualizar todos os trabalhos</button>  
            : <></>}
        </div>
    </Container>
  )
}

const Container = styled.div`
   ul{
    padding:0px !important;
    padding-top:20px !important;
    margin:0px !important;
    border-top:1px solid #E9ECEF;

        li{
            list-style:none;
            padding-bottom:30px;
            padding-top:0px !important;

            .ed-flex{
                align-items:flex-start;
            }

            .box-details{
                padding-top:0px !important;
            }

            h2.title{
                font-size:16px;
                margin:10px 0px;
                font-weight:600;
                line-height:30px;
             }

            .time{
                color:var(--ed-grey-text);
                font-size:15px;
            } 

            .icon{
                width:45px;
                min-width:45px;
                height:45px;
                border-radius:100%; 
                margin-right:15px;
                display:flex;
                align-items:center;
                justify-content:center;

                  svg{
                      width:40px;
                      heigth:40px;
                  }
            }
        }

        .list-item-1{.icon{border:1px solid var(--ed-orange); svg{color: var(--ed-orange);}}}
        .list-item-2{.icon{border:1px solid var(--ed-green); svg{color: var(--ed-green);}}}
        .list-item-3{.icon{border:1px solid var(--ed-red-light); svg{color: var(--ed-red-light);}}}
        .list-item-4{.icon{border:1px solid var(--ed-blue-light); svg{color: var(--ed-blue-light);}}}


        li:last-child{
            padding-bottom:0px !important;
        }
   }

hr{ 
    border-color:#E9ECEF;
    margin:0px;
}

.btn.btn-bordered{
    width:100%;
    border:1px solid var(--ed-purple-light) !important;
    text-align:center;
    padding:10px !important;
}


`;

export default EmployeeLatestWorksGrid