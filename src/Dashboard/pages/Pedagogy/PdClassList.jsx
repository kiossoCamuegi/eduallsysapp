 import { AddCircleOutline, PrintOutlined, Search } from '@mui/icons-material';
import React, { useEffect, useState } from 'react' 
import { Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ClassDataOptions } from '../../../General/components/InstituteData';
import PdStudentsByClass from '../../components/Table/PdStudentsByClass';
import CRValue from '../../../General/components/CRValue';
 
 function PdClassList() {
   document.title = "Estudantes por turma"; 
   const [CurrentClass, SetCurrentClass] = useState(null);

   const ChangeClass = (e)=>{
      SetCurrentClass(null);
      SetCurrentClass(e.target.value);
   }

   useEffect(()=>{
    SetCurrentClass(CRValue("#get-selector-class"));
   },[]);

   return (
     <div> 
         <div className="ed-space">
        <div style={{width:'60%'}}>
           <Form style={{width:'60%'}}>
              <div className='search-box'>
              <Form.Group>
                    <div className="ed-flex col ed-space">
                     <Search />   
                        <div className="block ml-2 col"> 
                            <Form.Select id="get-selector-class" onChange={(e)=>ChangeClass(e)} >
                                  <ClassDataOptions />
                             </Form.Select> 
                        </div>  
                    </div> 
               </Form.Group> 
              </div>
            </Form>  
        </div>
        <div className="ed-flex" >
            <Link to="#"> <button className='btn bg-black btn-icon'><PrintOutlined /></button> </Link>
            <div  style={{minWidth:'230px'}}> 
                <button className="btn bg-main ml-2"> <AddCircleOutline /> Registrar novo estudante</button>
            </div>
        </div>
    </div>
       <div className="eduall-table mt-4"> 
          {CurrentClass !== null ? <PdStudentsByClass ClassId={CurrentClass}  /> : <></>}
       </div>
     </div>
   )
 }
 
 export default PdClassList