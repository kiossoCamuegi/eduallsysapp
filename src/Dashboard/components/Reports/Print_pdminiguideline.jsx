import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog'; 
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import PdMiniguidelinestable from '../Table/PdMiniguidelinestable';
import { styled } from 'styled-components';
import { useReactToPrint } from 'react-to-print';
import { useRef } from 'react';
import RandomCodeGenerator from '../../../General/components/RandomCodeGenerator';
import { Close, Print } from '@mui/icons-material';
import axios from 'axios';
import Hoot from '../../../General/components/Hoot';
import { Form, Table } from 'react-bootstrap';
import { GetAcademicYear_byclass, GetAcademiclevel_byclass, GetClassroom_byclass, GetClasstitle_byclass, GetCourse_byclass, GetPeriod_byclass, TitlesAndHeadersDataOptions } from '../../../General/components/InstituteData';


const DATAURL = [ 
    Hoot()+"eduallgetsingletitleandheader/get/", 
];


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

 function Print_pdminiguideline(props) {
  const [open, setOpen] = React.useState(false);
  const containerPrint = useRef();
  const [studentData, setStudentData] = React.useState([]);


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  
  async function StudentData(e){
    if(Math.floor(e) >= 0){
        const response = await axios.get(DATAURL[0]+`${e}`)  
        if(response.data.length >= 1) {    
            let outputs = document.querySelectorAll(".paper-container.fl .header-print");
            for (let i = 0; i < outputs.length; i++) {
                outputs[i].innerHTML = JSON.parse(response.data[0].ed_title_description);
            }  
        }
      }
    }  

    let titleCode = 0;
    const setTitleCode = (e)=>{
        StudentData(e);
        titleCode = e;
    }

  
  const handlePrint = useReactToPrint({
    content:()=> containerPrint.current,
    documentTitle:'eduall_mini_pauta'+'_'+Date.now()+RandomCodeGenerator(10),
    copyStyles:true
});



  return (
    <div>
         <div onClick={handleClickOpen}>
            {props.toggle_btn ? props.toggle_btn : <></> }
         </div> 
      <Dialog  fullScreen   open={open}   onClose={handleClose}  TransitionComponent={Transition}   >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar> 
           <div className="ed-space">
           <div> <Title>Imprimir mini-pautas</Title></div>
           <div className="ed-flex">
             <Form >
               <Form.Group > 
                    <Form.Select onChange={(e)=>setTitleCode(e.target.value)} id="doc-header-type">
                        <TitlesAndHeadersDataOptions code={2} />
                    </Form.Select>
                </Form.Group>  
            </Form> 
            <button className=" ml-2 btn btn-icon bg-main-light btn-icon-m0" onClick={handlePrint}><Print/></button> 
            <button className='btn ml-2 btn-icon bg-black' autoFocus color="inherit" onClick={handleClose}><Close/></button> 
           </div>
           </div>
          </Toolbar>
        </AppBar>
        <Container className="container-print"> 
          <div className="paper-container fl" ref={containerPrint}>
            <div className="ed-center mb-3"> 
                 <div className="header-print"></div>  
              </div>
              <Table bordered >  
            <tbody>
            <tr>
            <td>
                  <div className="ed-space">
                     <div><strong>Sala</strong></div>
                     <div>{(props.ClassId !== null && props.ClassId*1 !== NaN )  ? <GetClassroom_byclass ID={props.ClassId} />: <></> } </div>
                  </div>
            </td> 
               <td>
                  <div className="ed-space">
                     <div><strong>Turma</strong></div>
                     <div> {(props.ClassId !== null && props.ClassId*1 !== NaN )  ? <GetClasstitle_byclass ID={props.ClassId} />: <></> } </div>
                  </div>
            </td> 
               <td>
                  <div className="ed-space">
                     <div><strong>Classe</strong></div>
                     <div> {(props.ClassId !== null && props.ClassId*1 !== NaN )  ? <GetAcademiclevel_byclass ID={props.ClassId}/>: <></> } </div>
                  </div>
            </td> 
            <td>
                  <div className="ed-space">
                     <div><strong>Período</strong></div>
                     <div> {(props.ClassId !== null && props.ClassId*1 !== NaN )  ?<GetPeriod_byclass ID={props.ClassId} />: <></> } </div>
                  </div>
            </td> 
         </tr>
         <tr> 
             <td>
                  <div className="ed-space"> 
                     <div><strong>Ano letivo</strong></div>
                     <div> {(props.ClassId !== null && props.ClassId*1 !== NaN )  ? <GetAcademicYear_byclass  ID={props.ClassId} /> : <></> } </div>
                  </div>
            </td> 
               <td>
                  <div className="ed-space">
                     <div><strong>Prof</strong></div>
                     <div>****</div>
                  </div>
            </td> 
            <td rowSpan='2' colSpan='2' >
                  <div className="ed-space"> 
                     <div><strong>Curso</strong></div>
                     <div>{(props.ClassId !== null && props.ClassId*1 !== NaN )  ? <GetCourse_byclass ID={props.ClassId} /> : <></> } </div>
                  </div>
            </td>  
         </tr> 
         </tbody>
         </Table> 
                <div className="mt-4">
                   <PdMiniguidelinestable  Filters={{subject:props.SubjectId , class:props.ClassId }} ClassId={props.ClassId}   />
                </div>
                <div >
                <div className="footer-content mt-4"> 
                   <div className="block-dets">
                   <div className="ed-block nb-item mt-2 mb-2 ed-flex">
                       O professor : <div className="line"></div>
                    </div>
                    <div className="ed-block nb-item mt-2 mb-2 ed-flex">
                       Contacto : <div className="line"></div>
                    </div>
                    <div className="ed-block nb-item mt-2 mb-2 ed-flex">
                      Data de Assinatura : <div className="line"></div>
                    </div>
                   </div>
                    <div className="ed-space">
                        <div className="ed-block ed-center block-line">
                            <h3 contentEditable>O Diretor de Turma</h3>
                            <div className="line"></div>
                        </div>
                        <div className="ed-block ed-center block-line">
                                <h3 contentEditable>O Diretor Pedagógico</h3>
                            <div className="line"></div>
                        </div>
                    </div>
                </div>
             </div>
          </div>
        </Container>
      </Dialog>
    </div>
  );
} 

const Title = styled.h1`
   font-size:20px;
   margin:0px;
   font-weight:600;
   color:var(--ed-dark);
`;


const Container = styled.div`
   width:100%;
   padding:20px;
   background:var(--ed-dark);
   overflow-x:auto;
   min-height:94vh;
`;



export default Print_pdminiguideline
