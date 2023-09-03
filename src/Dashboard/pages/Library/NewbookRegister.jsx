import React, { useState } from 'react'
import { Form } from 'react-bootstrap' 
import styled from 'styled-components' 
import { Link } from 'react-router-dom'; 
import  {Save , Delete, Send, BallotOutlined, SummarizeOutlined} from '@mui/icons-material';
import { Alert } from 'bootstrap'; 
import BuildDataHistory from '../../components/elements/BuildDataHistory';
import FileUpload from '../../../General/components/FileUpload';
import CRValue from '../../../General/components/CRValue';
import ClearInputs from '../../../General/components/ClearInputs';
import Hoot from '../../../General/components/Hoot';
import axios from 'axios';
import { RichTextEditor } from '../../../General/components/RichTextEditor';
import {toast} from 'react-toastify';
import { LibraryAuthorDataOptions, LibraryBooksCategoryDataOptions, LibraryPublishersDataOptions, LibraryRackDataOptions, LibraryTypeOfBooksDataOptions, ProvidersDataOptions } from '../../../General/components/InstituteData';
import {Checkbox, FormControlLabel } from '@mui/material'; 

        
const FORMURL = [
  Hoot()+"edualllibrarybookregister/post/", 
];
  

function NewbookRegister() { 
    document.title = "Cadastrar livro";
 
    const [form, setForm] = useState({});
    const [errors, setErrors] = useState({});
    const [BookFile, setBookFile] = useState([]);  
   const [BookImage, setBookImage] = useState(null);
   const [Docfile, setDocfile] = useState(false);
 

    const showBoxFile = ()=>{ 
      if(Docfile === true){
        setDocfile(false)
      } else {
        setDocfile(true);
      }
    } 
 

    
   const INPUTS = { 
        book_title: CRValue("#book_title") , 
        book_category: CRValue("#book_category") , 
        book_type: CRValue("#book_type") , 
        book_author: CRValue("#book_author") , 
        book_price: CRValue("#book_price") , 
        book_publisher: CRValue("#book_publisher") , 
        book_colection: CRValue("#book_colection") , 
        book_place_of_publication: CRValue("#book_place_of_publication") , 
        book_classification: CRValue("#book_classification") , 
        book_copy: CRValue("#book_copy") , 
        book_subtitle: CRValue("#book_subtitle") , 
        book_subject: CRValue("#book_subject") , 
        book_year: CRValue("#book_year") , 
        book_acquisition_date: CRValue("#book_acquisition_date") , 
        book_acquisition_type: CRValue("#book_acquisition_type") , 
        book_place_of_publication: CRValue("#book_place_of_publication") , 
        book_provider: CRValue("#book_provider") , 
        book_pages: CRValue("#book_pages") ,  
        book_rack: CRValue("#book_rack"), 
        book_notes: CRValue("form div textarea"), 
        book_picture:BookImage,  
        book_file:BookFile,  
   }
   

      
    const GetBookFile = (e)=>{
         setBookFile(e[0]);
    }
    
   const GetBookImage = (e)=>{
      setBookImage(e[0]);
    }
 

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
     
 
   const validateForm = ()=>{
       const {book_title  , book_type , book_publisher  , book_colection , book_place_of_publication  , book_classification  , 
       book_copy  , book_subtitle  , book_author, book_subject , book_price, book_year , book_acquisition_date  , book_acquisition_type , book_provider  , 
        book_pages,   book_rack, book_category} = form; 
       const NewErrors = {}; 
       
       if(INPUTS.book_title ===  "" || INPUTS.book_title ===  " "){
       if(!book_title || book_title === '') NewErrors.book_title = 'Preencha o campo corretamente';  
       }else{if(!book_title){setField("book_title", INPUTS.book_title);}}
   
       if(INPUTS.book_price ===  "" || INPUTS.book_price ===  " "){
        if(!book_price || book_price === '') NewErrors.book_price = 'Preencha o campo corretamente';  
        }else{if(!book_price){setField("book_price", INPUTS.book_price);}}
           
       if(INPUTS.book_author ===  "" || INPUTS.book_author ===  " "){
        if(!book_author || book_author === '') NewErrors.book_author = 'Preencha o campo corretamente';  
        }else{if(!book_author){setField("book_author", INPUTS.book_author );}}
    
       if(INPUTS.book_publisher ===  "" || INPUTS.book_publisher ===  " "){
       if(!book_publisher || book_publisher === '') NewErrors.book_publisher = 'Genero inavalido';
       }else{if(!book_publisher){setField("book_publisher", INPUTS.book_publisher);}}
   
       if(INPUTS.book_type ===  "" || INPUTS.book_type ===  " "){
       if(!book_type || book_type === '') NewErrors.book_type = 'Idade invalida';  
       }else{if(!book_type){setField("book_type", INPUTS.book_type);}}

       if(INPUTS.book_provider ===  "" || INPUTS.book_provider ===  " "){
        if(!book_provider || book_provider === '') NewErrors.book_provider = 'Idade invalida';  
        }else{if(!book_provider){setField("book_provider", INPUTS.book_provider);}}
   
        if(INPUTS.book_acquisition_date  ===  "" || INPUTS.book_acquisition_date ===  " "){
        if(!book_acquisition_date || book_acquisition_date  === '') NewErrors.book_acquisition_date = 'Idade invalida';  
        }else{if(!book_acquisition_date){setField("book_acquisition_date", INPUTS.book_acquisition_date);}}
 
       if(INPUTS.book_copy ===  "" || INPUTS.book_copy ===  " "){
       if(!book_copy || book_copy === '') NewErrors.book_copy = 'Endereço invalido';
       }else{if(!book_copy){setField("book_copy", INPUTS.book_copy);}}
   
       if(INPUTS.book_colection ===  "" || INPUTS.book_colection ===  " "){
       if(!book_colection || book_colection === '') NewErrors.book_colection = 'Religião invalida';
       }else{if(!book_colection){setField("book_colection", INPUTS.book_colection);}}
   
       if(INPUTS.book_place_of_publication ===  "" || INPUTS.book_place_of_publication ===  " "){
       if(!book_place_of_publication || book_place_of_publication === '') NewErrors.book_place_of_publication = 'Preencha o campo corretamente';  
       }else{if(!book_place_of_publication){setField("book_place_of_publication", INPUTS.book_place_of_publication);}}
   
       if(INPUTS.book_year ===  "" || INPUTS.book_year ===  " "){
       if(!book_year || book_year === '') NewErrors.book_year =  'Numero de telefone invalido';
       }else{if(!book_year){setField("book_year", INPUTS.book_year);}}

          
       if(INPUTS.book_category ===  "" || INPUTS.book_category ===  " "){
        if(!book_category || book_category === '') NewErrors.book_category =  'Cátegoria invalida';
        }else{if(!book_category){setField("book_category", INPUTS.book_category);}}
   
       if(INPUTS.book_rack ===  "" || INPUTS.book_rack ===  " "){
       if(!book_rack || book_rack === '') NewErrors.book_rack =  'Numero de telefone invalido';  
       }else{if(!book_rack){setField("book_rack", INPUTS.book_rack);}}
   
       if(INPUTS.book_pages ===  "" || INPUTS.book_pages ===  " "){
       if(!book_pages || book_pages === '') NewErrors.book_pages = 'Email invalido';  
       }else{if(!book_pages){setField("book_pages", INPUTS.book_pages);}}
   
       if(INPUTS.book_subject ===  "" || INPUTS.book_subject ===  " "){
       if(!book_subject || book_subject === '') NewErrors.book_subject = 'Preencha o campo corretamente';  
       }else{if(!book_subject){setField("book_subject", INPUTS.book_subject);}}

       if(INPUTS.book_subtitle ===  "" || INPUTS.book_subtitle ===  " "){
        if(!book_subtitle || book_subtitle === '') NewErrors.book_subtitle = 'Preencha o campo corretamente';  
        }else{if(!book_subtitle){setField("book_subtitle", INPUTS.book_subtitle);}}
   
       if(INPUTS.book_classification ===  "" || INPUTS.book_classification ===  " "){
       if(!book_classification || book_classification === '') NewErrors.book_classification = 'Selecione uma opção valida';
       }else{if(!book_classification){setField("book_classification", INPUTS.book_classification);}}
   
       if(INPUTS.book_acquisition_type ===  "" || INPUTS.book_acquisition_type ===  " "){
       if(!book_acquisition_type || book_acquisition_type === '') NewErrors.book_acquisition_type =  'Selecione um estado valido';
       }else{if(!book_acquisition_type){setField("book_acquisition_type", INPUTS.book_acquisition_type);}}
      
   
       return NewErrors;
   }
   
   
   const FormSubmit = (e)=>{  
    e.preventDefault();  
    const formErrors = validateForm();
      if(Object.keys(formErrors).length > 0){
           setErrors(formErrors);
           toast.error("Verifique todos os  campos");    
      }else{   
       const formData = new FormData();   

       formData.append("book_title" , INPUTS.book_title); 
       formData.append("book_type" , INPUTS.book_type);
       formData.append("book_publisher" , INPUTS.book_publisher); 
       formData.append("book_colection"  , INPUTS.book_colection); 
       formData.append("book_place_of_publication" , INPUTS.book_place_of_publication); 
       formData.append("book_classification" , INPUTS.book_classification); 
       formData.append("book_copy" , INPUTS.book_copy); 
       formData.append("book_category" , INPUTS.book_category); 
       formData.append("book_subtitle"  , INPUTS.book_subtitle); 
       formData.append("book_author"  , INPUTS.book_author); 
       formData.append("book_subject" , INPUTS.book_subject); 
       formData.append("book_price" , INPUTS.book_price); 
       formData.append("book_year" , INPUTS.book_year); 
       formData.append("book_acquisition_date" , INPUTS.book_acquisition_date); 
       formData.append("book_acquisition_type" , INPUTS.book_acquisition_type); 
       formData.append("book_provider" , INPUTS.book_provider); 
       formData.append("book_pages" , INPUTS.book_pages);   
       formData.append("book_rack", INPUTS.book_rack);
       formData.append("book_notes", INPUTS.book_notes); 
       formData.append("book_cover", INPUTS.book_picture);   
       
        axios.post(FORMURL[0] , formData)
        .then((res)=>{ 
           console.log(res.data);
           toast.success("Livro cadastrado com sucesso !");
         
     
          setTimeout(() =>{
            //ClearInputs();
            // setForm({});
          }, 3000);
        }).catch((error)=>{console.log(error); }); 
      }   
   };
   
   
   
   const handleInput = (e)=>{  
     switch (e.target.id) {
      case "book_title":
         setField("book_title", e.target.value)
         INPUTS.book_title = e.target.value 
        break;
        case "book_type":
          setField("book_type", e.target.value)
          INPUTS.book_type = e.target.value 
         break;
        case "book_publisher":
           setField("book_publisher", e.target.value)
           INPUTS.book_publisher = e.target.value
         break;
         case "book_colection":
           setField("book_colection", e.target.value)
           INPUTS.book_colection = e.target.value
         break;
         case "book_place_of_publication":
           setField("book_place_of_publication", e.target.value)
           INPUTS.book_place_of_publication = e.target.value
         break; 
         case "book_classification":
           setField("book_classification", e.target.value)
           INPUTS.book_classification = e.target.value
         break; 
         case "book_copy":
           setField("book_copy", e.target.value)
           INPUTS.book_copy = e.target.value 
         break; 
         case "book_subtitle":
           setField("book_subtitle", e.target.value) 
           INPUTS.book_subtitle = e.target.value
         break; 
         case "book_subject":
           setField("book_subject", e.target.value) 
           INPUTS.book_subject = e.target.value
         break;
         case "book_author":
          setField("book_author", e.target.value) 
          INPUTS.book_author = e.target.value
        break; 
         case "book_year":
           setField("book_year", e.target.value) 
           INPUTS.book_year = e.target.value
         break; 
         case "book_acquisition_date":
           setField("book_acquisition_date", e.target.value) 
           INPUTS.book_acquisition_date = e.target.value
         break; 
         case "book_acquisition_type":
           setField("book_acquisition_type", e.target.value) 
           INPUTS.book_acquisition_type = e.target.value
         break;  
         case "book_pages":
           setField("book_pages", e.target.value) 
           INPUTS.book_pages = e.target.value
         break;   
        case "book_provider":
          setField("book_provider", e.target.value) 
          INPUTS.book_provider = e.target.value
        break;  
        case "book_rack":
          setField("book_rack", e.target.value) 
          INPUTS.book_rack = e.target.value
        break;  
        case "book_category":
          setField("book_category", e.target.value) 
          INPUTS.book_category = e.target.value
        break;  
     }
   } 

  return (
    <>
    <Form onSubmit={FormSubmit} method='post' encType='multipart/form-data'>
      <div className="box-register">
      <div className="ed-space mb-4">
           <div className="ed-flex">
               <button className="btn bg-danger" type='reset' id='clearForm'>
                  <Delete/>  Limpar
               </button>
               <button className="btn ml-2 bg-main" type="submit">
                 <Save/>  Salvar
               </button> 
           </div>
           <div className="ed-flex">
               <Link className='btn btn-icon bg-green-light' to='/library_books_Grid'>
                   <BallotOutlined/>
               </Link>
               <Link to='/library_books' className='btn ml-2 btn-main'>
                  <SummarizeOutlined/> Lista dos livros
               </Link>
           </div>
       </div> 
      <BoxContainer className='boxItem'>
         <div className="ed-space mb-4">
             <div><h2 className="title" style={{marginBottom:'0px'}}>Cadastrar livro</h2></div>
              <BuildDataHistory/>
         </div>
            <FlexBox> 
              <div className="box">
              <Form.Group className="mb-3"  >
                   <div className="ed-flex fill mt-2">
                       <div className="block">
                           <Form.Label>Titulo do livro</Form.Label>
                           <Form.Control className={!!errors.book_title && 'is-invalid'}  onChange={handleInput} value={form.book_title} isInvalid={!!errors.book_title}   type="text"   
                           placeholder="" name='book_title' id="book_title"  /> 
                          <Form.Control.Feedback type='invalid'>{errors.book_title}</Form.Control.Feedback>
                       </div>
                       <div className="block ml-2">
                           <Form.Label>Tipo de livro</Form.Label>
                           <Form.Select  onChange={handleInput} className={!!errors.book_type && 'is-invalid'} value={form.book_type} isInvalid={!!errors.book_type}
                               placeholder="" name='book_type' id="book_type"  >
                                  <LibraryTypeOfBooksDataOptions/>
                           </Form.Select>
                             <Form.Control.Feedback type='invalid'>{errors.book_type}</Form.Control.Feedback>
                       </div>
                   </div>
                <div className="ed-flex fill mt-4 ">
                  <div className="block">
                        <Form.Label>Subtitulo</Form.Label>
                        <Form.Control  onChange={handleInput} className={!!errors.book_subtitle && 'is-invalid'}  type="text" value={form.book_subtitle} isInvalid={!!errors.book_subtitle}
                        placeholder="" name='book_subtitle' id="book_subtitle"  /> 
                        <Form.Control.Feedback type='invalid'>{errors.book_subtitle}</Form.Control.Feedback>
                   </div>
                   <div className="block ml-2">
                        <Form.Label>Assunto</Form.Label>
                        <Form.Control  onChange={handleInput} className={!!errors.book_subject && 'is-invalid'}  type="text" value={form.book_subject} isInvalid={!!errors.book_subject}
                        placeholder="" name='book_subject' id="book_subject"  /> 
                        <Form.Control.Feedback type='invalid'>{errors.book_subject}</Form.Control.Feedback>
                   </div>
                </div>
              </Form.Group> 
              </div>
            </FlexBox> 
            <Form.Group> 
                 <div className="ed-flex col-ip-3 col-12 mt-4">
                       <div className="block">
                           <Form.Label>Classificação</Form.Label>
                           <Form.Control  onChange={handleInput} className={!!errors.book_classification && 'is-invalid'} value={form.book_classification} isInvalid={!!errors.book_classification}
                             name='book_classification' id="book_classification"/>
                           <Form.Control.Feedback type='invalid'>{errors.book_classification }</Form.Control.Feedback>
                       </div>
                       <div className="block ml-2">
                           <Form.Label>Exemplar</Form.Label>
                           <Form.Control  onChange={handleInput} className={!!errors.book_copy && 'is-invalid'}  value={form.book_copy} isInvalid={!!errors.book_copy}
                            type="text"  placeholder="" name='book_copy' id="book_copy"  /> 
                            <Form.Control.Feedback type='invalid'>{errors.book_copy}</Form.Control.Feedback>
                       </div>
                       <div className="block ml-2">
                           <Form.Label>Editora</Form.Label>
                           <Form.Select  onChange={handleInput} className={!!errors.book_publisher && 'is-invalid'}  value={form.book_publisher} isInvalid={!!errors.book_publisher}
                            name='book_publisher' id="book_publisher"  >
                                <LibraryPublishersDataOptions/>
                           </Form.Select> 
                           <Form.Control.Feedback type='invalid'>{errors.book_publisher}</Form.Control.Feedback>
                       </div>
                   </div>
            </Form.Group>
            <Form.Group> 
                 <div className="ed-flex col-ip-3 col-12 mt-4">
                       <div className="block">
                           <Form.Label>Data de aquisição</Form.Label>
                           <Form.Control onChange={handleInput} className={!!errors.book_acquisition_date && 'is-invalid'} value={form.book_acquisition_date} isInvalid={!!errors.book_acquisition_date}
                            type="date" placeholder="" name='book_acquisition_date' id="book_acquisition_date"  /> 
                           <Form.Control.Feedback type='invalid'>{errors.book_acquisition_date}</Form.Control.Feedback>
                       </div>
                       <div className="block ml-2">
                           <Form.Label>Preço</Form.Label>
                           <Form.Control  onChange={handleInput} className={!!errors.book_price && 'is-invalid'}  value={form.book_price} isInvalid={!!errors.book_price}
                            type="number"  placeholder="" name='book_price' id="book_price"  /> 
                            <Form.Control.Feedback type='invalid'>{errors.book_price}</Form.Control.Feedback>
                       </div>
                       <div className="block ml-2">
                           <Form.Label>Tipo de aquisição</Form.Label>
                           <Form.Select  onChange={handleInput} className={!!errors.book_acquisition_type && 'is-invalid'}  value={form.book_acquisition_type} isInvalid={!!errors.book_acquisition_type}
                            name='book_acquisition_type' id="book_acquisition_type"  >
                              <option value="0" selected>Doação</option>
                              <option value="1">Compra</option>     
                           </Form.Select> 
                           <Form.Control.Feedback type='invalid'>{errors.book_acquisition_type}</Form.Control.Feedback>
                       </div>
                   </div>
            </Form.Group>
            <Form.Group> 
                 <div className="ed-flex col-ip-3 col-12 mt-4">
                       <div className="block">
                           <Form.Label>Coleção</Form.Label>
                           <Form.Select  onChange={handleInput} className={!!errors.book_colection && 'is-invalid'}  value={form.book_colection} isInvalid={!!errors.book_colection}
                             name='book_colection' id="book_colection" >
                              <option value="0">books</option>
                           </Form.Select> 
                           <Form.Control.Feedback type='invalid'>{errors.book_colection}</Form.Control.Feedback>
                       </div>
                       <div className="block ml-2">
                           <Form.Label>Local de publicação</Form.Label>
                           <Form.Control className={!!errors.book_place_of_publication && 'is-invalid'}  onChange={handleInput}   value={form.book_place_of_publication} isInvalid={!!errors.book_place_of_publication}
                            type="text"  name='book_place_of_publication' id="book_place_of_publication"  /> 
                           <Form.Control.Feedback type='invalid'>{errors.book_place_of_publication}</Form.Control.Feedback>
                       </div>
                       <div className="block ml-2">
                           <Form.Label>Ano</Form.Label>
                           <Form.Control  onChange={handleInput} className={!!errors.book_year && 'is-invalid'}  type="number" value={form.book_year} isInvalid={!!errors.book_year}
                            placeholder="" name='book_year' id="book_year"  /> 
                           <Form.Control.Feedback type='invalid'>{errors.book_year}</Form.Control.Feedback>
                       </div>
                   </div>
            </Form.Group>
            <Form.Group>
            <div className="ed-flex fill">
                   <div className="block col-lg-6 mt-3">
                        <Form.Label>Paginas</Form.Label>
                        <Form.Control  onChange={handleInput} className={!!errors.book_pages && 'is-invalid'} value={form.book_pages} isInvalid={!!errors.book_pages}
                        type="number"  name='book_pages' id="book_pages"   placeholder="" />
                        <Form.Control.Feedback type='invalid'>{errors.book_pages}</Form.Control.Feedback>
                    </div>
                    <div className="block col-lg-5 ml-2 mt-3">
                        <Form.Label>Categoria</Form.Label>
                        <Form.Select  onChange={handleInput} className={!!errors.book_category && 'is-invalid'}  value={form.book_category} isInvalid={!!errors.book_category}
                             name='book_category' id="book_category">
                                 <LibraryBooksCategoryDataOptions/>
                           </Form.Select> 
                        <Form.Control.Feedback type='invalid'>{errors.book_category}</Form.Control.Feedback>
                    </div>
                </div>
            </Form.Group>
            <Form.Group> 
                 <div className="ed-flex col-ip-3 col-12 mt-4">
                       <div className="block">
                           <Form.Label>Fornecedor</Form.Label>
                           <Form.Select  onChange={handleInput} className={!!errors.book_provider && 'is-invalid'}  value={form.book_provider} isInvalid={!!errors.book_provider}
                             name='book_provider' id="book_provider">
                                <ProvidersDataOptions/>
                           </Form.Select> 
                           <Form.Control.Feedback type='invalid'>{errors.book_provider}</Form.Control.Feedback>
                       </div>
                       <div className="block ml-2">
                           <Form.Label>Autor</Form.Label>
                           <Form.Select className={!!errors.book_author && 'is-invalid'}  onChange={handleInput}   value={form.book_author} isInvalid={!!errors.book_author}
                            type="text"  name='book_author' id="book_author" >
                                 <LibraryAuthorDataOptions/>
                            </Form.Select> 
                           <Form.Control.Feedback type='invalid'>{errors.book_author}</Form.Control.Feedback>
                       </div>
                       <div className="block ml-2">
                          <Form.Label>Prateleira</Form.Label>
                          <Form.Select  onChange={handleInput} className={!!errors.book_rack && 'is-invalid'}  value={form.book_rack} isInvalid={!!errors.book_rack}  type="text"   
                          placeholder="" name='book_rack' id="book_rack" >
                              <LibraryRackDataOptions/>    
                          </Form.Select> 
                          <Form.Control.Feedback type='invalid'>{errors.book_rack}</Form.Control.Feedback>
                      </div>
                   </div> 
            </Form.Group>
      </BoxContainer> 
      </div> <br />
      <BoxContainer>
          <h2 className="title">Nota</h2>
          <RichTextEditor />
      </BoxContainer>
      <div>
            <FormControlLabel  onChange={()=>showBoxFile()}  control={<Checkbox  />} label="Adicionar imagem" />  
         </div>
       <FlexBox className={Docfile ===  true ? 'd-flex' : 'd-none'}> 
        <BoxContainer className='boxItem'>
           <h2 className="title">Carregar capa do livro</h2> 
            <FileUpload  FileArray={GetBookImage} single input_name="book_cover" Icon="1" type_of_files="image/x-png,image/gif,image/jpeg"  extensions="png, jpg, jpeg"  />
        </BoxContainer> 
       </FlexBox>
       <br />
    </Form>
    </>
  )
}
 
const BoxContainer = styled.div` 
    width:100%; 
    border-radius:6px;
    margin-bottom:20px;  
    padding:20px;
    min-height:200px;
    background:var(--ed-white);  
    box-shadow:var(--ed-shadow-df); 


    .Camera{
        min-height:80vh; 
        border:2px dashed var(--purple-light);
    }


    .title{
        font-size:18px; 
        text-transform:uppercase;
        font-weight:600;
        margin-top:10px;
        margin-bottom:25px;
    }

    .col-ip-3{
        width:100%;

        .block{
            width:33.3%;
        }
    }

    .box{ 
        width:100%;
        display:flex;
        flex-direction:column;

        .fill{
            width:100%;
            display:flex;

            .block{
                width:50%;
            }
        }
    }
`;

const FlexBox = styled.div`
   margin:10px 0;
   display:flex;
   } 
`;



export default NewbookRegister