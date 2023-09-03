import React, { useState } from 'react'
import styled from 'styled-components'
import Switch from '@mui/material/Switch';
import { Button, Form } from 'react-bootstrap';
import { GetServicePrice, GetServiceTitle, ServiceDataOptions, ServiceDataOptionsSelector } from '../../../../General/components/InstituteData';
import CRValue from '../../../../General/components/CRValue';
import { Remove, RemoveDone, Save } from '@mui/icons-material';
import { Close } from '@material-ui/icons';
import { MultiSelect } from 'react-multi-select-component';
import { toast } from 'react-toastify';
import Hoot from '../../../../General/components/Hoot';
import axios from 'axios';

function DiscountForm() {
    const [form, setForm] = useState({});
    const [errors, setErrors] = useState({});
    const [errorFor, setErrorFor] = useState(0);
    const [serviceError, SetserviceError] = useState(null);
    const [SelectedServices, SetSelectedServices] = useState([]); 

    const FORMURL = [
        Hoot()+"eduallupdateservicediscount/update/",
        Hoot()+"eduallsingleserviceapi/get/", 
    ];
      
    function selectServices(e){
        SetSelectedServices(e)    
    } 

   const HandleForm = (e)=>{
     e.preventDefault();  
        const INPUTS = {
            discount_years_of_study:CRValue("#"+e.target.id+" "+".discount_years_of_study"), 
            discount_parents_childrens:CRValue("#"+e.target.id+" "+".discount_parents_childrens"), 
            discount_value:CRValue("#"+e.target.id+" "+".discount_value"),  
            discount_for_scholarship_holders:CRValue("#"+e.target.id+" "+".discount_for_scholarship_holders"),
            discount_servicecode:CRValue("#"+e.target.id+" "+".discount_servicecode")
        };  
        let message =  document.querySelector("#"+e.target.id+" "+".error");
 
        const setField = (field, value)  =>{
            setForm({
                ...form,
                [field]:value
            })
            if(!!errors[field]){
                 setErrors({
                    ...errors,
                    [field]:null
                 });  
            }
        }

        console.log(INPUTS);

        setField("discount_value", INPUTS.discount_value);
        setField("discount_for_scholarship_holders", INPUTS.discount_for_scholarship_holders);
        setField("discount_parents_childrens", INPUTS.discount_parents_childrens);
        setField("discount_servicecode", INPUTS.discount_servicecode);
        setField("discount_years_of_study", INPUTS.discount_years_of_study)         
    
        let FormValidateErrors = [];
        const validateForm = async()=>{ 
            const NewErrors = {}; 
            const CheckData = async()=>{
                const {discount_value, discount_for_scholarship_holders, discount_parents_childrens, discount_servicecode, discount_years_of_study} = form; 
    
                if(INPUTS.discount_value === "" || INPUTS.discount_value === " "){
                if(!discount_value || discount_value === '') NewErrors.discount_value = "O valor para desconto é invalido";  
                }else{if(!discount_value){setField("discount_value", INPUTS.discount_value);}} 
    
                if(INPUTS.discount_for_scholarship_holders === "" || INPUTS.discount_for_scholarship_holders === " "){
                if(!discount_for_scholarship_holders || discount_for_scholarship_holders === '') NewErrors.discount_for_scholarship_holders = "Informção de bolseiro invalido";  
                }else{if(!discount_for_scholarship_holders){setField("discount_for_scholarship_holders", INPUTS.discount_for_scholarship_holders);}} 
    
                if(INPUTS.discount_parents_childrens === "" || INPUTS.discount_parents_childrens === " "){
                if(!discount_parents_childrens || discount_parents_childrens === '') NewErrors.discount_parents_childrens = "Número de educando invalido";  
                }else{if(!discount_parents_childrens){setField("discount_parents_childrens", INPUTS.discount_parents_childrens);}} 
    
                if(INPUTS.discount_servicecode === "" || INPUTS.discount_servicecode === " "){
                if(!discount_servicecode || discount_servicecode === '') NewErrors.discount_servicecode = "O Serviço selecionado é invalido ";  
                }else{if(!discount_servicecode){setField("discount_servicecode", INPUTS.discount_servicecode);}} 
    
                if(INPUTS.discount_years_of_study === "" || INPUTS.discount_years_of_study === " "){
                if(!discount_years_of_study || discount_years_of_study === '') NewErrors.discount_years_of_study = "O Número de anos de estudo na instituição é invalido";  
                }else{if(!discount_years_of_study){setField("discount_years_of_study", INPUTS.discount_years_of_study);}} 
            
                if(!discount_servicecode){
                    setField("discount_servicecode", INPUTS.discount_servicecode);
                }else{
                    if(INPUTS.discount_servicecode*1 >= 0){
                        let response = await axios.get(FORMURL[1]+INPUTS.discount_servicecode*1);
                        if(response.data.length === 0) NewErrors.discount_servicecode = "Serviço selecionado não encomtrado";   
                    }else{NewErrors.discount_servicecode = "Serviço selecionado invalido 2";}
                }     
            }
            CheckData();
            setTimeout(() => {
                FormValidateErrors = [];
                FormValidateErrors.push(NewErrors);
                return NewErrors; 
            }, 100);
        }
 
        
          setTimeout(() => {
             validateForm(); 
             setTimeout(() => {
                const formErrors = FormValidateErrors[0]
                if(Object.keys(formErrors).length > 0){  
                    message.innerHTML =  Object.values(formErrors)[0];   
                }else{
                    message.innerHTML =  ''; 
                    axios.put(FORMURL[0]+INPUTS.discount_servicecode, INPUTS)
                      .then((e)=>{  
                         
                         toast.success("Desconto aplicado com sucesso !"); 
                         message.innerHTML =  '';
                         console.log(e.data);

                      }).catch((error)=>{
                        message.innerHTML =  "Lamentamos mas não foi  possivel executar esta ação"; 
                        console.log(error); 
                     }); 
                } 
             }, 300);
        }, 200);

  
      

   }

  

  return (
    <Container>
        <div className="ed-space header-title"> 
           <div><h2 className="title">Descontos</h2></div>
           <div className='d-none'>
               <span>{'Abilitado'}</span>
               <Switch checked={true} />
           </div>
        </div>
        <p className="description mb-2 mt-2">
           Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatibus, laudantium unde corporis expedita 
           consequatur sit nobis magnam maxime sed consequuntur! <strong>selecione serviços e atribui o Desconto.</strong> 
        </p>
        <div className='mt-4'>
            <Form  >
               <div className="mb-3">
                   <MultiSelect 
                        options={ServiceDataOptionsSelector()}
                        value={SelectedServices}
                        className={serviceError !== null ? 'border-red' : ''}
                        onChange={selectServices}
                        labelledBy='select'
                    />
                </div> 
            </Form>  
        </div> 
        <ul>
           {SelectedServices.map((item, index)=>{ 
                  return (
                    <Form onSubmit={HandleForm} key={index} id={`discount_form_${index+1}`}>
                        <li className='mt-4'> 
                          <input type="hidden" className='discount_servicecode' value={item.value}/>
                           <div className="content">
                                <div className="counter">
                                    <div className="count border-main-light text-main-light">{index+1}</div>
                                    <div className="line"></div>
                                </div>
                              <div className='content-data'>
                              <div className="block">
                                    <div className="ed-space">
                                        <div className="ed-flex">
                                            <h2><GetServiceTitle ID={item.value} /></h2>
                                            <div className="price ml-2"><GetServicePrice ID={item.value}/></div>
                                        </div>
                                        <div className="ed-flex">
                                             <div className="remove"><Close /></div>
                                             <Button type='submit' className='bg-main-light ml-2'><Save /></Button>
                                             <div className="ml-2 discountinput">
                                                <Form.Control type='number' placeholder='Desconto' className="discount_value" />
                                                 <div className="perc">%</div>
                                             </div>
                                        </div>
                                    </div>
                                    <div className="text-main-light">Aplicar desconto se :</div>
                                    <div className="mt-4 ed-wrap">
                                        <Form.Group className="mb-3">
                                            <Form.Label>Encarregado têm mais de</Form.Label>
                                            <Form.Select   className="discount_parents_childrens">
                                                    <option value="2">2 educandos</option>
                                                    <option value="3">3 educandos</option>
                                                    <option value="4">4 educandos</option>
                                                    <option value="5">5 educandos</option>
                                                    <option value="6">6 educandos</option>
                                                    <option value="7">7 educandos</option>
                                                    <option value="8">8 educandos</option>
                                                    <option value="9">9 educandos</option>
                                                    <option value="10">+10 educandos</option>
                                            </Form.Select>
                                         </Form.Group>  
                                        <Form.Group className="mb-3 ml-2">
                                            <Form.Label>Bolseiros</Form.Label>
                                            <Form.Select   className="discount_for_scholarship_holders">
                                                    <option value="0">Não</option>
                                                    <option value="1">Sim</option> 
                                            </Form.Select>
                                         </Form.Group>  
                                        <Form.Group className="mb-3 ml-2">
                                            <Form.Label>Anos de estudo na instituição</Form.Label>
                                            <Form.Select   className="discount_years_of_study" >
                                                    <option value="2">2 anos</option>
                                                    <option value="3">3 anos</option>
                                                    <option value="4">4 anos</option>
                                                    <option value="5">5 anos</option>
                                                    <option value="6">6 anos</option>
                                                    <option value="7">7 anos</option>
                                                    <option value="8">8 anos</option>
                                                    <option value="9">9 anos</option>
                                                    <option value="10">+10 anos</option>
                                            </Form.Select> 
                                        </Form.Group>  
                                    </div>  
                                    <div className="error text-danger"></div>
                                </div>  
                                <div className="line-bottom"></div>
                              </div>
                           </div>  
                       </li>
                  </Form>
                )
           })}
        </ul> 
    </Container>
  )
}

const Container = styled.div`
   padding: 0px 20px;
 
   .title{
      margin: 0;
      font-family: "Roboto", "Helvetica", "Arial", sans-serif;
      font-weight: 600;
      font-size: 18px;
      line-height: 1.6;
      letter-spacing: 0.0075em;
   }


   .discountinput{
    width:170px;
    height:47px;
    display:flex;
    align-items:center; 
    background:#F2F6FB;
    border:1px solid var(--ed-silver-light);
    border-radius:6px;
    overflow:hidden;

       input{
           border:none !important;
           background:#F2F6FB;
           height:47px;
           text-align:center;
           border-radius:0px;
           border-right:1px solid var(--ed-silver-light) !important;
       }

       .perc{
           min-width:40px;
           display:flex;
           align-items:center; 
           justify-content:center;
       } 
    }
   
   p.description{
      font-size:14px;
      font-weight:normal;
      max-width:1000px;
   } 



    ul{
        padding:0px; 

        form{
            width:100%;
        }

        li{
            width:100%;
            list-style:none; 

           .content-data{ 
               width:100%; 

               .error{
                  height:40px;
               }

                .line-bottom{
                    position:relative;
                    width:100%;
                    height:1px;
                    background:var(--ed-silver);
                    margin-left:-20px;
                    margin-top:0px;

                    &::after{
                        content:'';
                        position:absolute;
                        width:10px;
                        height:10px;
                        border-radius:100%;
                        background:var(--ed-blue);
                        top:-5px;
                        right:0px;
                    }
                }

            
           }
            .content{
                display:flex;
                width:100%;

                .ed-space{
                    width:100%; 

                      .remove{
                         cursor:pointer;

                          svg{
                              width:30px;
                              height:30px;
                              fill:var(--ed-red-light);
                          }
                      }

                      button{
                         svg{
                            margin:0px !important;
                         }
                      }
                }

                  .counter{
                    display:flex;
                    align-items:center;
                    flex-direction:column;

                     .count{
                        border-radius:100%;
                        display:flex;
                        align-items:center; 
                       justify-content:center;
                       width:40px;
                       height:40px; 
                       border:1px solid;
                       font-size:18px;
                     }


                     .line{
                        width:1px;
                        height:183px;
                        background:var(--ed-silver);
                     }

                  }


                  .block{
                     padding-left:30px;

                         h2{
                            font-size:16px;
                            margin:0px;
                            margin-right:10px;
                         }

                         .price{
                            background:var(--ed-green);
                            color:var(--ed-white);
                            padding:4px 14px;
                            font-size:16px;
                            border-radius:30px;
                            display:flex;
                            align-items:center; 
                           justify-content:center;
                         }
                  }


            }
        }
    }

`;

export default DiscountForm