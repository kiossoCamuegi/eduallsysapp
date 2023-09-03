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
import { GetAcademicYear_byclass, GetAcademiclevel_byclass, GetClassroom_byclass, GetClasstitle_byclass, GetCourse_byclass, GetPeriod_byclass, GetStudentName, TitlesAndHeadersDataOptions } from '../../../General/components/InstituteData';
import PdGeneralAgendaForTheQuarterTable from '../Table/PdGeneralAgendaForTheQuarterTable';
import { useParams } from 'react-router-dom';
import PdSchoolMarksTable from '../Table/PdSchoolMarksTable';
import PdViewStatisticsTable from '../Table/PdViewStatisticsTable';


const DATAURL = [ 
    Hoot()+"eduallgetsingletitleandheader/get/", 
];


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

 function Print_pdstatistics(props) {
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
            let outputs = document.querySelectorAll(".paper-container.fl2 .header-print");
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
    documentTitle:'eduall_pauta_geral'+'_'+Date.now()+RandomCodeGenerator(10),
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
           <div> <Title>Imprimir estatisticas</Title></div>
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
          <div className="paper-container fl2" ref={containerPrint}>
            <div className="ed-center mb-3"> 
                 <div className="header-print"></div>  
              </div>
            <div className="mb-2">
            <Table responsive bordered  >  
                  <tbody>
                      <tr>
                      <td>
                          <div className='ed-flex'>  
                              <div><strong>Nome :</strong></div>
                              <div className="text-danger ml-2"><GetStudentName ID={props.StudentId} /></div>
                          </div>
                      </td>  
                      <td>
                          <div className="ed-space">
                              <div><strong>Sala</strong></div>
                              <div><GetClassroom_byclass ID={props.ClassId} /></div>
                          </div>
                      </td> 
                      <td>
                          <div className="ed-space">
                              <div><strong>Turma</strong></div>
                              <div><GetClasstitle_byclass ID={props.ClassId} /></div>
                          </div>
                      </td> 
                      <td>
                          <div className="ed-space">
                              <div><strong>Classe</strong></div>
                              <div> <GetAcademiclevel_byclass ID={props.ClassId}/></div>
                          </div>
                      </td>  
                      <td>
                          <div className="ed-space">
                              <div><strong>Período</strong></div>
                              <div><GetPeriod_byclass ID={props.ClassId} /></div>
                          </div>
                      </td> 
                  </tr> 
                  <tr> 
                      <td>
                          <div className="ed-space"> 
                              <div><strong>Ano letivo</strong></div>
                              <div><GetAcademicYear_byclass  ID={props.ClassId} /> </div>
                          </div>
                      </td> 
                      <td>
                          <div className="ed-space">
                              <div><strong>Nº de processo</strong></div>
                              <div>{props.StudentId}</div>
                          </div>
                      </td> 
                      <td rowSpan='2' colSpan='4'>
                          <div className="ed-flex"> 
                              <div><strong>Curso : </strong></div>
                              <div className='ml-2'><GetCourse_byclass ID={props.ClassId} /></div>
                          </div>
                      </td> 
                  </tr> 
                  </tbody>
              </Table>
            </div> 
                  <PdViewStatisticsTable  Filters={{subject:props.SubjectId, class:props.ClassId}} ClassId={props.ClassId}  />
                   <div className="legends ed-wrap mt-2">
                        <div className='mt-2 mr-2 '>Legendas :</div>
                        <div className="ed-flex mr-2 mt-2">NS = Não satisfatório</div>
                        <div className="ed-flex mr-2 mt-2">B = Bom</div>
                        <div className="ed-flex mr-2 mt-2">S = Satisfatório</div>
                        <div className="ed-flex mr-2 mt-2">MB =  Muito bom</div>
                        <div className="ed-flex mr-2 mt-2">E = Excelente</div>
                        <div className="ed-flex mr-2 mt-2">Fal = Faltas</div>
                   </div>
                <div >
                <div className="mt-4">
                  <div className="footer-content mt-4">   
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

 

export default Print_pdstatistics
