import { AccessTimeOutlined } from '@mui/icons-material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import {  HiOutlineDocumentText } from "react-icons/hi";
import { Link } from 'react-router-dom';
import Hoot from '../../../General/components/Hoot';
import NumberToBytes from '../../../General/components/NumberToBytes';
import ReduceTextLength from '../../../General/components/ReduceTextLength';

const FILESURL =  Hoot()+ 'eduallsingleuserfiles/get/';

function PersonalInformation(props) { 

  let studentCode = props.data.ed_student_code ? props.data.ed_student_code  : 0;
  const [Files, SetFiles] = useState([]);
  const type = "student_register";


   async function GetFiles(){
    console.clear();
      const response = await axios.get(FILESURL+`${studentCode}`);
      if(response.data.length >= 1){  
           SetFiles(response.data); 
      }
  }


   useEffect(()=>{ 
       GetFiles();
   },[]);



  return (
      <>
         <Table bordered > 
         <tbody>
            <tr> 
                <td>
                    <div className="ed-space">
                        <div>Nº do BI</div>
                        <div><span>{props.data.ed_student_identityCard}</span> </div>
                    </div>
                </td>
                <td>
                    <div className="ed-space">
                        <div>Morada</div>
                        <div><span>{props.data.ed_student_address}</span></div>
                    </div>
                </td>
            </tr> 
            <tr> 
                <td>
                    <div className="ed-space">
                        <div>Genero</div>
                        <div><span>{props.data.ed_student_gender === "female" ? "Femenino" : "Masculino"}</span></div>
                    </div>
                </td>
                <td>
                    <div className="ed-space">
                        <div>Telefone</div>
                        <div><span>{props.data.ed_student_phone}</span> </div>
                    </div>
                </td>
            </tr> 
            <tr> 
                <td>
                    <div className="ed-space">
                        <div>Nacionalidade</div>
                        <div><span>{props.data.ed_student_nacionality}</span> </div>
                    </div>
                </td>
                <td>
                    <div className="ed-space">
                        <div>Data de nascimento</div>
                        <div><span>{props.data.ed_student_birthday}</span> </div>
                    </div>
                </td>
            </tr> 
            <tr> 
                <td>
                    <div className="ed-space">
                        <div>Morada</div>
                        <div><span>{props.data.ed_student_address}</span></div>
                    </div>
                </td>
                <td>
                    <div className="ed-space">
                        <div>Religião</div>
                        <div><span>{props.data.ed_student_religion}</span> </div>
                    </div>
                </td>
            </tr>  
         </tbody>
        </Table>
        <br /> 
        {
         props.data.ed_student_health_problems === 1 ?
        <Table>
          <thead>
            <tr>
              <th>Informações sobre saude</th> 
            </tr>
          </thead>
          <tbody>
            <tr> 
              <td>{props.data.ed_student_health_problems_description }</td> 
            </tr> 
          </tbody>
        </Table>
           : 
           <></>
        }
        <ul className='student-file-cp'>
        {
            Files.map((item, index)=>{  
              return (
               <a download href={Hoot()+`${item.ed_file_name}`} key={index}>
                <li className='student-file-el'>
                <div className="icon">
                       <HiOutlineDocumentText/>
                   </div>
                   <div className="block">
                   <div className="title text-main-light"><ReduceTextLength text={item.ed_file_name} length={ window.width >= 1300 ? 80 : 50} /></div>
                     <div className="ed-flex">
                     <div className="date text-dark"><AccessTimeOutlined/><span>{item.ed_file_register_date}</span></div>
                         | <div className="size text-dark">{NumberToBytes(item.ed_file_size)}</div>
                     </div>
                   </div>
                  </li>
               </a>
              )
            })
          }
      </ul>
      </>
  )
}

export default PersonalInformation