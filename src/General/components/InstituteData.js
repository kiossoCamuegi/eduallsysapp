import React, {useState, useEffect} from 'react'
import Hoot from './Hoot'
import axios from 'axios' 
import { Avatar } from '@mui/material';
import { UserAccountData } from './UserAccountData';
import RandomAvatarColor from './RandomAvatarColor';
import Tooltip from './Tooltip';
import SwitchFromPages from './SwitchFromPages';
import SelectSearch from 'react-select-search';
import { spacing } from '@mui/system';
import NumberToPrice from './NumberToPrice';
import FloorNumber from "./FloorNumber";
import  {IoWarningOutline} from "react-icons/io5";
import { Badge } from 'react-bootstrap';
import { Check, Close } from '@mui/icons-material';
import SmallLoader from './SmallLoader';

const DATA_URL = [
    /* 0 */    Hoot()+"eduallclassapi/get/",
    /* 1 */    Hoot()+"eduallcoursesapi/get/",
    /* 2 */   Hoot()+"eduallacademicyearapi/get/",
    /* 3 */   Hoot()+"eduallclassroomapi/get/",
    /* 4 */   Hoot()+"eduallciclesapi/get/",
    /* 5 */   Hoot()+"eduallsinglecoursesapi/get/",
    /* 6 */   Hoot()+"eduallsingleclassroomapi/get/",
    /* 7 */   Hoot()+"eduallsingleacademicyearapi/get/",
    /* 8 */   Hoot()+'eduallstudentsapi/get/',
    /* 9 */   Hoot()+'eduallsingleclassapi/get/',
    /* 10 */   Hoot()+'eduallstudentsapi/get/', 
    /* 11 */   Hoot()+'eduallsubjectsapi/get/',
    /* 12 */   Hoot()+'eduallsinglesubject/get/',
    /* 13 */   Hoot()+'eduallservicesapi/get/',
    /* 14 */   Hoot()+'eduallacademiclevelsapi/get/',
    /* 15 */   Hoot()+'eduallsingleacademiclevelsapi/get/',
    /* 16 */   Hoot()+'eduallsinglestudentapi/get/',
    /* 17 */   Hoot()+"eduallsingleserviceapi/get/",
    /* 18 */   Hoot()+"eduallprovidersapi/get/",
    /* 19 */   Hoot()+"eduallcoinsapi/get/",
    /* 20 */   Hoot()+"eduallgetsingleprovider/get/",
    /* 21 */   Hoot()+"edualltransportvehicleget/get/",
    /* 22 */   Hoot()+"edualltransportsinglevehicleget/get/",
    /* 23 */   Hoot()+"edualltransportstopsget/get/",
    /* 24 */   Hoot()+"edualltransportsinglestopget/get/",
    /* 25 */   Hoot()+"edualltransportroutesget/get/",
    /* 26 */   Hoot()+"eduallgettitlesandheaders/get/",
    /* 27 */   Hoot()+"edualllibrarypublishers/get",
    /* 28 */   Hoot()+"edualllibraryracks/get/",
    /* 29 */   Hoot()+"edualllibraryauthor/get",
    /* 30 */   Hoot()+"edualllibrarytypeofbooks/get",
    /* 31 */   Hoot()+"edualllibrarytypecategories/get",
    /* 32 */   Hoot()+"eduallsinglelibraryauthor/get/",
    /* 33 */   Hoot()+"eduallsinglelibrarytypeofbook/get/",
    /* 34 */   Hoot()+"eduallsinglelibrarycategory/get/",
    /* 35 */   Hoot()+"eduallsinglelibrarypublisher/get/",
    /* 36 */   Hoot()+"edualllibrarybooks/get",
    /* 37 */   Hoot()+"eduallsinglelibrarybook/get/",
    /* 38 */   Hoot()+"edualllibraryborrowedbooks/get",
    /* 39 */   Hoot()+"eduallparents/get",
    /* 40 */   Hoot()+"edualltransportsriverget/get/",
    /* 41 */   Hoot()+"eduallsinglecicle/get/",
    /* 42 */   Hoot()+"eduallgetstudentsbyclass/",
    /* 43 */   Hoot()+"eduallsinglequarterlynotebyqrtsubstdqrttyp/get/",
    /* 44 */   Hoot()+"eduallgetsinglestudentbycode/get/",
    /* 45 */   Hoot()+"eduallgetjobtitles/",
    /* 46 */   Hoot()+"eduallgetemployeebyjobtitle/get/0",
    /* 47 */   Hoot()+"edualltimings/get",
    /* 48 */   Hoot()+"eduallgetemployeebyjobtitle/get/",
    /* 49 */   Hoot()+"eduallgetsingletiming/get/",
    /* 50  */  Hoot()+"eduallgetsinglejobtitle/get/",
    /* 51 */   Hoot()+"eduallemployeesget/get/",
    /* 52 */   Hoot()+"eduallgetemployeeattendencebycode/get/",
    /* 53 */   Hoot()+"eduallgetstudentattendancebyclqrtsubjstcode/get/",
    /* 54 */   Hoot()+"eduallgetstudentexamscorebyclassubject/",
    /* 55 */   Hoot()+"eduallgetstudentfeaturedscorebyclassubject/",
    /* 56 */   Hoot()+"eduallgetallstudentattendance/get/"
];  
 

const getCurrent = (a, b , c)=>{
    if(c !== null){
        if(c === a)  return true; 
    }else{
        return b;
    } 
}


const GetIdCode = (props)=>{
    if(typeof props.ID  === 'number'){
      return Math.floor(props.ID)
    } else{ 
         if(props.INDEX){
           return Object.values(props.ID.data)[props.INDEX*1];
         }else{
           return Math.floor(props.ID);
         }
    }
}



export function GetTotalStudentsAttandanceByClassSubQrt(props){
    const [data, setData] = useState(0);  
        const [load, setLoaded] = useState(false);
    const CLASS = props.class  ? props.class  : 0;
    const SUBJECT = props.subject ? props.subject : 0;
    const STUDENT = props.student ? props.student : 0;
    const QUARTER = props.quarter ? props.quarter : 0;

    async function loadData(){ 
      try {
         const response = await axios.get(DATA_URL[53]+CLASS+","+SUBJECT+","+STUDENT+","+QUARTER);
         console.log(response.data)
         setData(response.data.length === 0 ? 0 : response.data.length); 
          setLoaded(true);
      } catch (error) {
          setLoaded(true);
      }
    }
    useEffect(()=>{
        loadData()
    },[CLASS,SUBJECT,STUDENT,QUARTER]); 

   return (<>{data}</>);
} 


export function  TimingsDataOptions(props){
    const [data, setData] = useState([]);  
    const [load, setLoaded] = useState(false);

    async function loadData(){ 
       try {
         const response = await axios.get(DATA_URL[47]); 
         setData(response.data);
         setLoaded(true);
       } catch (error) {
        setLoaded(true);
       }
    };

    useEffect(()=>{loadData();}, []);

    return (<>
    <option selected disabled>Selecione Horario</option> 
    {data.map((item, index)=>{   
         let a = index === 0 ? true : false;
         let b = props.code ? props.code : null;
        return(<> 
           <option value={item.ed_timing_id} selected={getCurrent(item.ed_timing_id, a, b)}>
              {item.ed_timing_hour_start+":"+item.ed_timing_minute_start + "-"+item.ed_timing_hour_end+":"+item.ed_timing_minute_end}
            </option>
        </>)})
    }</>);
}


export function GetTime(props){ 
    const [data, setData] = useState([]);  
    const [load, setLoaded] = useState(false); 
        const ID = GetIdCode(props);

        async function loadData(){ 
           try {
            const response = await axios.get(DATA_URL[49]+`${ID}`); 
            setData(response.data); 
            setLoaded(true);
           } catch (error) {
            setLoaded(true);
           }
        };

        useEffect(()=>{loadData();},[ID]); 

       return (<>{data.map((item, index)=>{  
       return(<> {item.ed_timing_hour_start+":"+item.ed_timing_minute_start + "-"+item.ed_timing_hour_end+":"+item.ed_timing_minute_end}</>)})}</>);
}





export function GetEmployeAttendanceValue(props){ 
    const [data, setData] = useState(0);  
        const [load, setLoaded] = useState(false); 
        const ID = GetIdCode(props);
        const Type = props.Type*1;

        async function loadData(){ 
          try {
            const rows = [];
            const response = await axios.get(DATA_URL[52]+`${ID}`);
                response.data.map((item, index)=>{
                    if(Type === 2 || Type === 0){
                        if(item.ed_employee_attd_status*1 === 0 || item.ed_employee_attd_status*1  === 2){
                            rows.push(index);
                        } 
                    }else if(Type === 1){
                        if(item.ed_employee_attd_status*1 === 1){
                            rows.push(index);
                        } 
                    } 
                });
            setData(rows.length);  
            setLoaded(true);
          } catch (error) {
            setLoaded(true);
          }
        };
        useEffect(()=>{loadData();},[ID]); 
       return (<>{data}</>);
}



export function GetStudentAttendanceValue(props){ 
    const [data, setData] = useState(0);  
        const [load, setLoaded] = useState(false); 
        const ID = GetIdCode(props);
        const CLASS = props.CLASS;
        const Type = props.Type*1;

        async function loadData(){ 
          try {
            const rows = [];
            const response = await axios.get(DATA_URL[56]+`${ID},${CLASS}`);
                response.data.map((item, index)=>{
                    if(Type === 2 || Type === 0){
                        if(item.ed_student_attd_status*1 === 0 || item.ed_student_attd_status*1  === 2){
                            rows.push(index);
                        } 
                    }else if(Type === 1){
                        if(item.ed_student_attd_status*1 === 1){
                            rows.push(index);
                        } 
                    } 
                });
            setData(rows.length);  
            setLoaded(true);
          } catch (error) {
            setLoaded(true);
          }
        };
        useEffect(()=>{loadData();},[ID]); 
       return (<>{data}</>);
}




export function  TitlesAndHeadersDataOptions(props){
    const [data, setData] = useState([]);  
    const [load, setLoaded] = useState(false);

    async function loadData(){ 
       try {
         const response = await axios.get(DATA_URL[26]); 
         setData(response.data);
       } catch (error) {
        
       }
    };

    useEffect(()=>{loadData();}, []);

    return (<>
    <option selected={props.code ? false : true} disabled>Selecione um titulo ou cabeçalho</option>
    {data.map((item, index)=>{   
         let a = index === 0 ? true : false;
         let b = props.code ? props.code : null;
        return(<> 
           <option value={item.ed_title_id} selected={item.ed_title_for*1 === b  ?  true : false} >{item.ed_title_name} </option>
        </>)})
    }</>);
}



export function  TransportDriversDataOptions(props){
    const [data, setData] = useState([]);  
    const [load, setLoaded] = useState(false);

    async function loadData(){ 
        try {
           const response = await axios.get(DATA_URL[40]); 
           setData(response.data);
        } catch (error) {
            
        }
    };

    useEffect(()=>{loadData();}, []);

    return (<>
    <option selected disabled>Selecione um motorista</option> 
    {data.map((item, index)=>{   
         let a = index === 0 ? true : false;
         let b = props.code ? props.code : null;
        return(<> 
           <option value={item.ed_transport_driver_id} selected={getCurrent(item.ed_transport_driver_id, a, b)}>{item.ed_transport_driver_name}</option>
        </>)})
    }</>);
}




export function  TeachersDataOptions(props){
    const [data, setData] = useState([]);  
    const [load, setLoaded] = useState(false);

    async function loadData(){ 
       try {
        const response = await axios.get(DATA_URL[46]); 
        setData(response.data);
       } catch (error) {
        
       }
    };

    useEffect(()=>{loadData();}, []);

    return (<>
    <option selected disabled>Selecione um professor</option> 
    {data.map((item, index)=>{   
         let a = index === 0 ? true : false;
         let b = props.code ? props.code : null;
        return(<> 
           <option value={item.ed_employee_id} selected={getCurrent(item.ed_employee_id, a, b)}>{item.ed_employee_name}</option>
        </>)})
    }</>);
}



export function  BooksDataOptionsSelector(){ 
    const [data, setData] = useState([]);  
    const [load, setLoaded] = useState(false); 

    async function loadData(){ 
        try {
            const response = await axios.get(DATA_URL[36]); 
            setData(response.data); 
        } catch (error) {
            
        }
    };

    useEffect(()=>{loadData();}, []);
    const options = [];

    data.map((item, index)=>{
        options.push({label:item.ed_library_book_title, value:item.ed_library_book_id});
    });

    return options;
}


export function  LibraryTotalBooks(){ 
    const [data, setData] = useState([]);  
    const [load, setLoaded] = useState(false); 

    async function loadData(){ 
        try {
            const response = await axios.get(DATA_URL[36]); 
            setData(response.data); 
            setLoaded(true);
        } catch (error) {
            setLoaded(true);
        }
    };

    useEffect(()=>{loadData();}, []); 

    return data.length;
}




export function  LibraryTotalBorrowedBooks(props){ 
    const [data, setData] = useState([]);  
    const [load, setLoaded] = useState(false); 

    async function loadData(){ 
       try {
         const response = await axios.get(DATA_URL[38]); 
         setData(response.data); 
          setLoaded(true);
       } catch (error) {
        setLoaded(true);
       }
    };

    useEffect(()=>{loadData();}, []); 

    props.GetData(data.length);
    return data.length;
}




export function  LibraryTotalReturnedBooks(props){ 
    const [data, setData] = useState([]);  
    const [load, setLoaded] = useState(false); 

    async function loadData(){ 
       try {
         const response = await axios.get(DATA_URL[38]); 
         setData(response.data); 
         setLoaded(true);
       } catch (error) {
        setLoaded(true);
       }
    }; 

    useEffect(()=>{loadData();}, []); 

    let returnedBooks = [];
    data.map((item, index)=>{
        if(item.ed_library_borrowed_book_status !== 0){
            returnedBooks.push(index)
        }
    })
   
    props.GetData(returnedBooks.length);
    return returnedBooks.length;
}

    
export function  GetsingleBookTitle(props){ 
    const [data, setData] = useState([]);  
    const [load, setLoaded] = useState(false);
    const  ID = GetIdCode(props);   
    async function loadData(){  
       try {
         if(props.ID === "#"){
             setData([]);
         }else{
             const response = await axios.get(DATA_URL[37]+`${ID}`);  
             setData(response.data);  
         }
         setLoaded(true);
       } catch (error) {
        setLoaded(true);
       }
    };
    useEffect(()=>{loadData();}, [ID]); 
  
    if(props.ID === "#") return "#";
    if(data[0] != null)  return data[0].ed_library_book_title ? data[0].ed_library_book_title : "#"; 
}




    
export function  GetsingleBookPicture(props){ 
    const [data, setData] = useState([]);  
    const [load, setLoaded] = useState(false);
    const  ID = GetIdCode(props);   
    async function loadData(){  
       try {
         if(props.ID === "#"){
             setData([]);
         }else{
             const response = await axios.get(DATA_URL[37]+`${ID}`);  
             setData(response.data);  
         }
          setLoaded(true);
       } catch (error) {
        setLoaded(true);
       }
    };
    useEffect(()=>{loadData();}, [ID]); 
  
    if(props.ID === "#") return "#";
    if(data[0] != null)  return <img loading="lazy" role="presentation" src={Hoot()+data[0].ed_library_book_picture} alt="" /> ? <img loading="lazy" role="presentation" alt="" src={Hoot()+data[0].ed_library_book_picture} /> : "#"; 
}


export function GetAuthorName(props) {
    const [data, setData] = useState([]);  
    const [load, setLoaded] = useState(false);
    const  ID = GetIdCode(props);   
    async function loadData(){  
      try {
        if(props.ID === "#"){
            setData([]);
        }else{
            const response = await axios.get(DATA_URL[32]+`${ID}`);  
            setData(response.data); 
        }
        setLoaded(true);
      } catch (error) {
        setLoaded(true);
      }
    };
    useEffect(()=>{loadData();}, [ID]); 

    if(props.ID === "#") return "#";
    if(data[0] != null)  return data[0].ed_library_author_name ? data[0].ed_library_author_name : "#"; 
}



export function GetTypeOfBookTitle(props) {
    const [data, setData] = useState([]);  
    const [load, setLoaded] = useState(false);
    const  ID = GetIdCode(props);   
    async function loadData(){  
      try {
        if(props.ID === "#"){
            setData([]);
        }else{
            const response = await axios.get(DATA_URL[33]+`${ID}`);  
            setData(response.data); 
        }
        setLoaded(true);
      } catch (error) {
        setLoaded(true);
      }
    };
    useEffect(()=>{loadData();}, [ID]); 

    if(props.ID === "#") return "#";
    if(data[0] != null)  return data[0].ed_library_typeofbook_title ? data[0].ed_library_typeofbook_title : "#"; 
}



export function GetBookCategoryTitle(props) {
    const [data, setData] = useState([]);  
    const [load, setLoaded] = useState(false);
    const  ID = GetIdCode(props);   
    async function loadData(){  
        try {
            if(props.ID === "#"){
                setData([]);
            }else{
                const response = await axios.get(DATA_URL[34]+`${ID}`);  
                setData(response.data); 
            }
            setLoaded(true);
        } catch (error) {
            setLoaded(true);
        }
    };
    useEffect(()=>{loadData();}, [ID]); 

    if(props.ID === "#") return "#";
    if(data[0] != null)  return data[0].ed_library_category_title ? data[0].ed_library_category_title : "#"; 
}



export function GetBookPublisherName(props) {
    const [data, setData] = useState([]);  
    const [load, setLoaded] = useState(false);
    const  ID = GetIdCode(props);   
    async function loadData(){  
      try {
          if(props.ID === "#"){
              setData([]);
          }else{
              const response = await axios.get(DATA_URL[35]+`${ID}`);  
              setData(response.data); 
          }
        setLoaded(true);
      } catch (error) {
        setLoaded(true);
      }
    };
    useEffect(()=>{loadData();}, [ID]); 

    if(props.ID === "#") return "#";
    if(data[0] != null)  return data[0].ed_library_publisher_name ? data[0].ed_library_publisher_name : "#"; 
}


export function  LibraryTypeOfBooksDataOptions(props){
    const [data, setData] = useState([]);  
    const [load, setLoaded] = useState(false);

    async function loadData(){ 
       try {
         const response = await axios.get(DATA_URL[30]); 
         setData(response.data);
         setLoaded(true);
       } catch (error) {
        setLoaded(true);
       }
    };

    useEffect(()=>{loadData();}, []);

    return (<>
    <option selected disabled>Selecione um tipo de livro</option> 
    {data.map((item, index)=>{   
         let a = index === 0 ? true : false;
         let b = props.code ? props.code : null;
        return(<> 
           <option value={item.ed_library_typeofbook_id} selected={getCurrent(item.ed_library_typeofbook_id, a, b)}>{item.ed_library_typeofbook_title}</option>
        </>)})
    }</>);
}


export function  LibraryBooksCategoryDataOptions(props){
    const [data, setData] = useState([]);  
    const [load, setLoaded] = useState(false);

    async function loadData(){ 
        try {
            const response = await axios.get(DATA_URL[31]); 
            setData(response.data);
            setLoaded(true);
        } catch (error) {
            setLoaded(true);
        }
    };

    useEffect(()=>{loadData();}, []);

    return (<>
    <option selected disabled>Selecione uma categoria</option> 
    {data.map((item, index)=>{   
         let a = index === 0 ? true : false;
         let b = props.code ? props.code : null;
        return(<> 
           <option value={item.ed_library_category_id} selected={getCurrent(item.ed_library_category_id , a, b)}>{item.ed_library_category_title}</option>
        </>)})
    }</>);
}

export function  LibraryPublishersDataOptions(props){
    const [data, setData] = useState([]);  
    const [load, setLoaded] = useState(false);

    async function loadData(){ 
        try {
          const response = await axios.get(DATA_URL[27]); 
          setData(response.data);
          setLoaded(true);
        } catch (error) {
            setLoaded(true);
        }
    };

    useEffect(()=>{loadData();}, []);

    return (<>
    <option selected disabled>Selecione a editora</option> 
    {data.map((item, index)=>{ 
         let a = index === 0 ? true : false;
         let b = props.code ? props.code : null;
        return(<> 
           <option value={item.ed_library_publisher_id} selected={getCurrent(item.ed_library_publisher_id, a, b)}>{item.ed_library_publisher_name}</option>
        </>)})
    }</>);
}



export function  LibraryRackDataOptions(props){
    const [data, setData] = useState([]);  
    const [load, setLoaded] = useState(false);

    async function loadData(){ 
       try {
         const response = await axios.get(DATA_URL[28]); 
         setData(response.data);
       } catch (error) {
        
       }
    };

    useEffect(()=>{loadData();}, []);

    return (<>
    <option selected>Selecione uma prateleira</option> 
    {data.map((item, index)=>{   
         let a = index === 0 ? true : false;
         let b = props.code ? props.code : null;
        return(<> 
           <option value={item.ed_library_rack_id} selected={getCurrent(item.ed_library_rack_id, a, b)}>{item.ed_library_rack_name}</option>
        </>)})
    }</>);
}



export function  LibraryAuthorDataOptions(props){
    const [data, setData] = useState([]);  
    const [load, setLoaded] = useState(false);

    async function loadData(){ 
     try {
        const response = await axios.get(DATA_URL[29]); 
        setData(response.data);
     } catch (error) {
        
     }
    };

    useEffect(()=>{loadData();}, []);

    return (<>
    <option selected>Selecione uma prateleira</option> 
    {data.map((item, index)=>{    
        let a = index === 0 ? true : false;
        let b = props.code ? props.code : null;
        return(<> 
            <option value={item.ed_library_author_id} selected={getCurrent(item.ed_library_author_id, a, b)}>{item.ed_library_author_name}</option>
        </>)})
    }</>);
}


export function  LibraryTotalAuthors(){
    const [data, setData] = useState([]);  
    const [load, setLoaded] = useState(false);

    async function loadData(){ 
        try {
            const response = await axios.get(DATA_URL[29]); 
          setData(response.data);
          setLoaded(true);
        } catch (error) {
            setLoaded(true);
        }
    };

    useEffect(()=>{loadData();}, []);

    return data.length;
}

export function  ServiceDataOptions(props){
    const [data, setData] = useState([]);  
    const [load, setLoaded] = useState(false);

    async function loadData(){ 
       try {
        const response = await axios.get(DATA_URL[13]); 
        setData(response.data);
       } catch (error) {
        
       }
    };

    useEffect(()=>{loadData();}, []);

    return (<>
    <option selected>Selecione um serviço</option> 
    {data.map((item, index)=>{  
         let a = index === 0 ? true : false;
         let b = props.code ? props.code : null;
        return(
           <option value={item.ed_service_id} key={index} selected={getCurrent(item.ed_service_id, a, b)}>{item.ed_service_title}</option>
         )})
    }</>);
}

            

export function  ServiceDataOptionsSelector(){ 
    const [data, setData] = useState([]);  
    const [load, setLoaded] = useState(false); 

    async function loadData(){ 
       try {
        const response = await axios.get(DATA_URL[13]); 
        setData(response.data); 
       } catch (error) {
        
       }
    };

    useEffect(()=>{loadData();}, []);
    const options = [];

    data.map((item, index)=>{
        options.push({label:item.ed_service_title, value:item.ed_service_id});
    });

    return options;
}



 
    export function  ClassDataOptions(props){
        const [data, setData] = useState([]);  
        const [load, setLoaded] = useState(false);

        async function loadData(){ 
           try {
             const response = await axios.get(DATA_URL[0]); 
             setData(response.data);
           } catch (error) {
            
           }
        };

        useEffect(()=>{loadData();}, []);


        return (<>
         <option  disabled>Selecione uma turma</option> 
        {data.map((item, index)=>{  
            let a = index === 0 ? true : false;
            let b = props.code ? props.code : null;
            let x = index === 0 ? item.ed_class_id : null;
            return(<>
               <option value={item.ed_class_id} selected={getCurrent(item.ed_class_id, a, b, x)}>{item.ed_class_title}</option>
           </>)})
        }</>);
    }



    export function  ProvidersDataOptions(props){
        const [data, setData] = useState([]);  
    const [load, setLoaded] = useState(false);

        async function loadData(){ 
           try {
             const response = await axios.get(DATA_URL[18]); 
             setData(response.data);
           } catch (error) {
            
           }
        };

        useEffect(()=>{loadData();}, []);

        return (<>
           <option disabled selected >Selecione um fornecedor</option>
        {data.map((item, index)=>{   
            let a = index === 0 ? true : false;
            let b = props.code ? props.code : null;
            return(<> 
            <option value={item.ed_provider_id} selected={getCurrent(item.ed_provider_id , a, b)}>{item.ed_provider_title}</option>
            </>)})
        }</>);
    }


    export function GetProviderName(props) {
        const [data, setData] = useState([]);  
    const [load, setLoaded] = useState(false);
        const  ID = GetIdCode(props);   
        async function loadData(){  
           try {
             if(props.ID === "#"){
                 setData([]);
             }else{
                 const response = await axios.get(DATA_URL[20]+`${ID}`);  
                 setData(response.data); 
             }
             setLoaded(true);
           } catch (error) {
            setLoaded(true);
           }
        };
        useEffect(()=>{loadData();}, [ID]); 

        if(props.ID === "#") return "#";
        if(data[0] != null)  return data[0].ed_provider_title ? data[0].ed_provider_title : "#"; 
    }


    export function  CoinsDataOptions(props){
        const [data, setData] = useState([]);  
        const [load, setLoaded] = useState(false);

        async function loadData(){ 
           try {
            const response = await axios.get(DATA_URL[19]); 
            setData(response.data);
           } catch (error) {
            
           }
        };

        useEffect(()=>{loadData();}, []);

        return (<>
         <option selected disabled>Selecione uma moeda</option> 
        {data.map((item, index)=>{  
                let a = index === 0 ? true : false;
                let b = props.code ? props.code : null;
                return(<> 
                   <option value={item.ed_coin_id} selected={getCurrent(item.ed_coin_id, a, b)}>{item.ed_coin_title}</option>
                </>)})
        }</>);
    }


 
    export function  ClassCountData(){
        const [data, setData] = useState([]);  
        const [load, setLoaded] = useState(false);

        async function loadData(){ 
           try {
            const response = await axios.get(DATA_URL[0]); 
            setData(response.data);
            setLoaded(true);
           } catch (error) {
            setLoaded(true);
           }
        };

        useEffect(()=>{loadData();}, []); 
        return data.length;
    }
    

     
    export function  EmployeesCountData(){
        const [data, setData] = useState([]);  
        const [load, setLoaded] = useState(false);

        async function loadData(){ 
           try {
            const response = await axios.get(DATA_URL[51]); 
            setData(response.data);
            setLoaded(true);
           } catch (error) {
            setLoaded(true);
           }
        };

        useEffect(()=>{loadData();}, []); 
        return data.length;
    }
    

    export function  GetClass(props){
        const [data, setData] = useState([]);  
    const [load, setLoaded] = useState(false);

        async function loadData(){ 
           try {
             const response = await axios.get(DATA_URL[0]); 
             setData(response.data);
             setLoaded(true);
           } catch (error) {
            setLoaded(true);
           }
        };

        useEffect(()=>{loadData();}, []);

        return (<>
         <option selected disabled>Selecione uma turma</option> 
        {data.map((item, index)=>{   
                let a = index === 0 ? true : false;
                let b = props.code ? props.code : null;
               return(<> 
                  <option value={item.ed_class_id } selected={getCurrent(item.ed_class_id, a, b)}>{item.ed_class_title}</option>
               </>)})
        }</>);
    }


    export function  GetClasstitle_byclass(props){
        const [data, setData] = useState([]);  
        const [load, setLoaded] = useState(false);
        const  ID = GetIdCode(props);   

        async function loadData(){  
           try {
            if(props.ID === "#"){
                setData([]);
            }else{
                const response = await axios.get(DATA_URL[9]+`${ID}`);  
                setData(response.data); 
            }
            setLoaded(true);
           } catch (error) {
            setLoaded(true);
           }
        };
        useEffect(()=>{loadData();}, [ID]); 

        if(props.ID === "#") return "#";
        if(data[0] != null)  return data[0].ed_class_title ? data[0].ed_class_title : "#";
    }


    export function  GetClasstitle_bystudentid(props){
        const [data, setData] = useState([]);  
        const [load, setLoaded] = useState(false);
        const  ID = GetIdCode(props);   
        async function loadData(){  
          try {
            if(props.ID === "#"){
                setData([]);
            }else{
                const student_response = await axios.get(DATA_URL[16]+`${ID}`)
                let class_id = student_response.data[0].ed_student_class ? student_response.data[0].ed_student_class : null;
                if (class_id !== null){
                    const response = await axios.get(DATA_URL[9]+`${class_id}`);  
                    setData(response.data); 
                }
            
            } 
            setLoaded(true);
          } catch (error) {
            setLoaded(true);
          }
        };
        useEffect(()=>{loadData();}, [ID]); 

        if(props.ID === "#") return "#";
        if(data[0] != null)  return data[0].ed_class_title ? data[0].ed_class_title : "#";
    }

 
 

    export function  GetClassroom_byclass(props){
        const [data, setData] = useState([]);  
    const [load, setLoaded] = useState(false);
        const  ID = GetIdCode(props);   
        async function loadData(){  
           try {
            if(props.ID === "#"){
                setData([]);
            }else{
                const response = await axios.get(DATA_URL[9]+`${ID}`); 
                const info = await axios.get(DATA_URL[6]+`${response.data[0].ed_class_room}`); 
                setData(info.data); 
            }
             setLoaded(true);
           } catch (error) {
            setLoaded(true);
           }
        };
        useEffect(()=>{loadData();}, [ID]); 
 
        if(props.ID === "#") return "#";
        if(data[0] != null)  return   data[0].ed_classroom_title ? data[0].ed_classroom_title : "#";     
    }


    
    export function  GetCicle_byclass(props){
        const [data, setData] = useState([]);  
       const [load, setLoaded] = useState(false);
        const  ID = GetIdCode(props);   
        async function loadData(){  
           try {
             if(props.ID === "#"){
                 setData([]);
             }else{
                 const response = await axios.get(DATA_URL[9]+`${ID}`); 
                 const info = await axios.get(DATA_URL[41]+`${response.data[0].ed_class_cicle}`); 
                 setData(info.data); 
             }
             setLoaded(true);
           } catch (error) {
              setLoaded(true);
           }
        };
        useEffect(()=>{loadData();}, [ID]); 
 
        if(props.ID === "#") return "#";
        if(data[0] != null)  return   data[0].ed_cicle_title ? data[0].ed_cicle_title : "#";
         
    }





    export function  GetPeriod_byclass(props){
        const periods = ["Manha", "Tarde", "Noite"]
        const [data, setData] = useState(null);
        const  ID = GetIdCode(props);   
        const [load, setLoaded] = useState(false);

        async function loadData(){  
           try {
            if(props.ID === "#"){
                setData([]);
            }else{
                const response = await axios.get(DATA_URL[9]+`${ID}`);  
                setData(response.data[0].ed_class_period); 
            }
            setLoaded(true);
           } catch (error) {
            setLoaded(true);
           }
        };
        useEffect(()=>{loadData();}, [ID]);  

        if(props.ID === "#") return "#";
        if(data != null)  return  periods[Math.floor(data)];
         
    }


    export function  GetCourse_byclass(props) { 
        const [data, setData] = useState([]);  
        const [load, setLoaded] = useState(false);
        const  ID = GetIdCode(props); 
        async function loadData(){  
           try {
             if(props.ID === "#"){
                  setData([]);
             }else{
                 const response = await axios.get(DATA_URL[9]+`${ID}`); 
                 const info = await axios.get(DATA_URL[5]+`${response.data[0].ed_class_course}`); 
                 setData(info.data);
             }
             setLoaded(true);
           } catch (error) {
             setLoaded(true);
           }
        };
        useEffect(()=>{loadData();}, [ID]);  

        if(props.ID === "#") return "#";
        if(data[0] != null) return data[0].ed_course_title ? data[0].ed_course_title : "#";
    }



    export function  GetAcademiclevel_byclass(props) { 
        const [data, setData] = useState([]);  
    const [load, setLoaded] = useState(false);
        const  ID = GetIdCode(props); 
        async function loadData(){  
          try {
            if(props.ID === "#"){
                setData([]);
           }else{
               const response = await axios.get(DATA_URL[9]+`${ID}`);  
              const info = await axios.get(DATA_URL[15]+`${response.data[0].ed_class_academic_level}`); 
              setData(info.data);
           }
           setLoaded(true);
          } catch (error) {
            setLoaded(true);
          }
        };
        useEffect(()=>{loadData();}, [ID]);   

        if(props.ID === "#") return "#";
        if(data[0] != null) return data[0].ed_academic_level_title ? data[0].ed_academic_level_title : "#";
    }


    export function  GetAcademicYear_byclass(props) { 
        const [data, setData] = useState([]);  
       const [load, setLoaded] = useState(false);
        const  ID = GetIdCode(props); 
        async function loadData(){  
           try {
             if(props.ID === "#"){
                  setData([]);
             }else{
                 const response = await axios.get(DATA_URL[9]+`${ID}`);  
                const info = await axios.get(DATA_URL[7]+`${response.data[0].ed_class_year}`); 
                setData(info.data);
             }
             setLoaded(true);
           } catch (error) {
             setLoaded(true);
           }
        };
        useEffect(()=>{loadData();}, [ID]);   

        if(props.ID === "#") return "#";
        if(data[0] != null) return data[0].ed_academic_year_title ? data[0].ed_academic_year_title : "#";
    }




    export function  GetAcademicYearCodebyclass(ID) { 
        let data  = []
        const [load, setLoaded] = useState(false);
        async function loadData(){  
            try {
                if(ID === "#"){
                    data = [];
               }else{
                   const response = await axios.get(DATA_URL[9]+`${ID}`);  
                  const info = await axios.get(DATA_URL[7]+`${response.data[0].ed_class_year}`); 
                  data.push(info.data);
               }
               setLoaded(true);
            } catch (error) {
                setLoaded(true);
            }
        };
        useEffect(()=>{loadData();}, [ID]);   

      return data.length >= 1 ? data[0].ed_academic_year_id : null;
    }


    
    export function  GetAcademicYearcode_byclass(props) { 
        const [data, setData] = useState('');
        const [load, setLoaded] = useState(false);
        const  ID = GetIdCode(props); 
        async function loadData(){  
           try {
             if(props.ID === "#"){
                  setData([]);
             }else{
                 const response = await axios.get(DATA_URL[9]+`${ID}`);   
                setData(response.data[0].ed_class_year);
             }
             setLoaded(true);
           } catch (error) {
            setLoaded(true);
           }
        };
        useEffect(()=>{loadData();}, [ID]);   

        if(props.ID === "#") return "#";
        props.YearCode ? props.YearCode(data) : props.YearCode(0);
        if(data != null) return data ? data : "#";
    }

    export function  GetStudentClassroom(e){
        const [data, setData] = useState([]);  
        const [load, setLoaded] = useState(false); 
        const  ID = Math.floor(e);

        async function loadData(){ 
           try {
             const response = await axios.get(DATA_URL[9]+`${ID}`); 
             setData(response.data);
             setLoaded(true);
           } catch (error) {
            setLoaded(true);
           } 
        };
 
        useEffect(()=>{loadData();},[ID]); 

       return (<>{data.map((item, index)=>{  
       return(<><div key={index}>{item.ed_class_id}</div></>)})}</>);
    }




    export function  CourseDataOptions(props){ 
        const [data, setData] = useState([]);  
    const [load, setLoaded] = useState(false); 

        async function loadData(){ 
           try {
             const response = await axios.get(DATA_URL[1]); 
             setData(response.data); 
           } catch (error) {
            
           }
        };

        useEffect(()=>{loadData();}, []); 

        return (<>
       <option selected disabled>Selecione um curso</option> 
        {data.map((item, index)=>{   
                let a = index === 0 ? true : false;
                let b = props.code ? props.code : null;
                return(<> 
                <option value={item.ed_course_id} selected={getCurrent(item.ed_course_id, a, b)}>{item.ed_course_title}</option>
             </>)})
        }</>);
    }



    export function  CourseCountData(){ 
        const [data, setData] = useState([]);  
        const [load, setLoaded] = useState(false); 

        async function loadData(){ 
          try {
              const response = await axios.get(DATA_URL[1]); 
              setData(response.data); 
              setLoaded(true);
          } catch (error) {
            setLoaded(true);
          }
        };

        useEffect(()=>{loadData();}, []); 

        return data.length;
    }


    export function  GetCourse(props){
        const [data, setData] = useState([]);  
        const [load, setLoaded] = useState(false); 
        const ID = GetIdCode(props);

        async function loadData(){ 
           try {
            const response = await axios.get(DATA_URL[5]+`${ID}`); 
            setData(response.data); 
            setLoaded(true);
           } catch (error) {
            setLoaded(true);
           }
        };

        useEffect(()=>{loadData();},[ID]); 

       return (<>{data.map((item, index)=>{  
       return(<><div>{item.ed_course_title}</div></>)})}</>);
    }




    export function  SubjectDataOptions(props){ 
        const [data, setData] = useState([]);  
         const [load, setLoaded] = useState(false); 

        async function loadData(){ 
           try {
             const response = await axios.get(DATA_URL[11]); 
             setData(response.data);
             setLoaded(true);
           } catch (error) {
            setLoaded(true);
           } 
        }; 
        useEffect(()=>{loadData();}, []);   

        return (<>
         <option selected disabled>Selecione uma disciplina</option> 
          {data.map((item, index)=>{   
                let a = index === 0 ? true : false;
                let b = props.code ? props.code : null;
               return(<> 
                  <option value={item.ed_subject_id} selected={getCurrent(item.ed_subject_id, a, b)}>{item.ed_subject_title}</option>
               </>)})
        }</>);
    }


    export function GetemployeesOptionsType(props){
        const [data, setData] = useState([]);  
    const [load, setLoaded] = useState(false); 

        async function loadData(){ 
           try {
            const response = await axios.get(DATA_URL[48]+props.ID); 
            setData(response.data); 
           } catch (error) {
            
           }
        }; 
        useEffect(()=>{loadData();}, []);   

        return (<>
         <option selected disabled>Selecione um funcionario</option> 
          {data.map((item, index)=>{   
                let a = index === 0 ? true : false;
                let b = props.code ? props.code : null;
               return(<> 
                  <option value={item.ed_employee_id} selected={getCurrent(item.ed_employee_id, a, b)}>{item.ed_employee_name}</option>
               </>)})
        }</>);
    }


    
    export function  JobTitlesDataOptions(props){ 
        const [data, setData] = useState([]);  
    const [load, setLoaded] = useState(false); 

        async function loadData(){ 
          try {
              const response = await axios.get(DATA_URL[45]); 
              setData(response.data); 
          } catch (error) {
            
          }
        }; 
        useEffect(()=>{loadData();}, []);   

        return (<>
         <option selected disabled>Selecione uma disciplina</option> 
          {data.map((item, index)=>{   
                let a = index === 0 ? true : false;
                let b = props.code ? props.code : null;
               return(<> 
                  <option value={item.ed_job_title_id} selected={getCurrent(item.ed_job_title_id, a, b)}>{item.ed_job_title}</option>
               </>)})
        }</>);
    }


    export function  GetJobTitle(props){
        const [data, setData] = useState([]);  
    const [load, setLoaded] = useState(false); 
        const ID = GetIdCode(props);

        async function loadData(){ 
           try {
            const response = await axios.get(DATA_URL[50]+`${ID}`); 
            setData(response.data); 
            setLoaded(true);
           } catch (error) {
            setLoaded(true);
           }
        };

        useEffect(()=>{loadData();},[ID]); 

       return (<>{data.map((item, index)=>{  
       return(<>{item.ed_job_title}</>)})}</>);
    }


    export function  GetSubject(props){
        const [data, setData] = useState([]);  
    const [load, setLoaded] = useState(false); 
        const ID = GetIdCode(props);

        async function loadData(){ 
          try {
              const response = await axios.get(DATA_URL[12]+`${ID}`); 
              setData(response.data); 
              setLoaded(true);
          } catch (error) {
            setLoaded(true);
          }
        };

        useEffect(()=>{loadData();},[ID]); 

       return (<>{data.map((item, index)=>{  
       return(<>{item.ed_subject_title}</>)})}</>);
    }



    export function  GetSubjectAsOption(props){
        const [data, setData] = useState([]);  
        const [load, setLoaded] = useState(false); 
        const IDS =  props.ID.split(',') ;

        async function loadData(){ 
           try {
             let SubjectsArray = [];
               for(let i = 0; i < IDS.length; i++) {
                   const response = await axios.get(DATA_URL[12]+`${IDS[i]}`); 
                   SubjectsArray.push(response.data[0]);
               } 
             setData(SubjectsArray); 
             setLoaded(true);
           } catch (error) {
            setLoaded(true);
           }
        };

        useEffect(()=>{loadData();},[IDS]); 

       return (
        <select  className='form-control'>
         <option selected disabled>Selecione uma disciplina</option> 
          {data.map((item, index)=>{  
               return(<option key={index} value={item.ed_subject_id}>{item.ed_subject_title}</option>)
           })
         }</select>);
    }
 




    export function  AcademicYearDataOptions(props){ 
        const [data, setData] = useState([]);  
        const [load, setLoaded] = useState(false); 

        async function loadData(){ 
           try {
             const response = await axios.get(DATA_URL[2]); 
             setData(response.data);
           } catch (error) {
            
           } 
        };

        useEffect(()=>{loadData();}, []);

        return (<>
        <option selected disabled>Selecione o ano letivo</option> 
        {data.map((item, index)=>{   
            let a = index === 0 ? true : false;
            let b = props.code ? props.code : null;
            return(<> 
               <option value={item.ed_academic_year_id} selected={getCurrent(item.ed_academic_year_id, a, b)}>{item.ed_academic_year_title}</option>
            </>)})
        }</>);
    }

    
    export function  GetAcademicYear(props){
        const [data, setData] = useState([]);  
        const [load, setLoaded] = useState(false); 
        const ID = GetIdCode(props);

        async function loadData(){ 
          try {
              const response = await axios.get(DATA_URL[7]+`${ID}`); 
              setData(response.data); 
              setLoaded(true);
          } catch (error) {
            setLoaded(true);
          }
        };

        useEffect(()=>{loadData();},[ID]); 

        return (<>{data.map((item, index)=>{  
        return(<><div>{item.ed_academic_year_title}</div></>)})}</>);
     }


 
    
    export function  GetAcademicLevel(props){
        const [data, setData] = useState([]);  
        const [load, setLoaded] = useState(false); 
        const ID = GetIdCode(props);

        async function loadData(){ 
           try {
             const response = await axios.get(DATA_URL[15]+`${ID}`); 
             setData(response.data);
             setLoaded(true);
           } catch (error) {
            setLoaded(true);
           } 
        };

        useEffect(()=>{loadData();},[ID]); 

        return (<>{data.map((item, index)=>{  
        return(<><div>{item.ed_academic_level_title}</div></>)})}</>);
     }
  

    export function  ClassroomsDataOptions(props){ 
        const [data, setData] = useState([]);  
    const [load, setLoaded] = useState(false); 

        async function loadData(){ 
            try {
                const response = await axios.get(DATA_URL[3]); 
                setData(response.data); 
            } catch (error) {
                
            }
        };

        useEffect(()=>{loadData();}, []);

        return (<>
        <option selected disabled>Selecione uma sala de aula</option> 
        {data.map((item, index)=>{   
                let a = index === 0 ? true : false;
                let b = props.code ? props.code : null;
               return(<> 
                  <option value={item.ed_classroom_id} selected={getCurrent(item.ed_classroom_id, a, b)}>{item.ed_classroom_title}</option>
               </>)})
        }</>);
    }


    export function  GetClassroom(props){
        const [data, setData] = useState([]);  
        const [load, setLoaded] = useState(false); 
        const ID = GetIdCode(props);

        async function loadData(){ 
           try {
            const response = await axios.get(DATA_URL[6]+`${ID}`); 
            setData(response.data); 
            setLoaded(true);
           } catch (error) {
            setLoaded(true);
           }
        };

            useEffect(()=>{loadData();},[ID]); 

        return (<>{data.map((item, index)=>{  
        return(<><div>{item.ed_classroom_title}</div></>)})}</>);
     }


    export function  CicleDataOptions(props){ 
        const [data, setData] = useState([]);  
        const [load, setLoaded] = useState(false); 

        async function loadData(){ 
           try {
             const response = await axios.get(DATA_URL[4]); 
             setData(response.data); 
             setLoaded(true);
           } catch (error) {
            setLoaded(true);
           }
        };

        useEffect(()=>{loadData();}, []);

        return (<>
        <option selected disabled>Selecione um ciclo academico</option> 
        {data.map((item, index)=>{   
                let a = index === 0 ? true : false;
                let b = props.code ? props.code : null;
               return(<> 
                  <option value={item.ed_cicle_id} selected={getCurrent(item.ed_cicle_id, a, b)}>{item.ed_cicle_title}</option>
               </>)})
        }</>);
    }
 


    export function  StudentsDataOptions(props){ 
        const [data, setData] = useState([]);  
    const [load, setLoaded] = useState(false); 

        async function loadData(){ 
          try {
            const response = await axios.get(DATA_URL[10]); 
            setData(response.data); 
          } catch (error) {
            
          }
        };

        useEffect(()=>{loadData();}, []);

        return (<>
        <option selected disabled>Selecione um estudante </option> 
        {data.map((item, index)=>{   
                let a = index === 0 ? true : false;
                let b = props.code ? props.code : null;
               return(<> 
                  <option value={item.ed_student_id} selected={getCurrent(item.ed_student_id, a, b)}>{item.ed_student_name}</option>
               </>)})
        }</>);
    }


    
    export function  StudentsDataOptionsSelector(){ 
        const [data, setData] = useState([]);  
    const [load, setLoaded] = useState(false); 

        async function loadData(){ 
          try {
              const response = await axios.get(DATA_URL[10]); 
              setData(response.data); 
          } catch (error) {
            
          }
        };

        useEffect(()=>{loadData();}, []);
        const options = [];

        data.map((item, index)=>{
            options.push({label:item.ed_student_name, value:item.ed_student_id});
        });

        return options;
    }







    export function  EmployeesDataOptions(props){ 
        const [data, setData] = useState([]);  
    const [load, setLoaded] = useState(false); 

        async function loadData(){ 
           try {
            const response = await axios.get(DATA_URL[51]); 
            setData(response.data); 
           } catch (error) {
            
           }
        };

        useEffect(()=>{loadData();}, []);

        return (<>
        <option selected disabled>Selecione um estudante </option> 
        {data.map((item, index)=>{   
                let a = index === 0 ? true : false;
                let b = props.code ? props.code : null;
               return(<> 
                  <option value={item.ed_employee_id} selected={getCurrent(item.ed_employee_id, a, b)}>{item.ed_employee_name}</option>
               </>)})
        }</>);
    }


    
    export function  EmployeesDataOptionsSelector(){ 
        const [data, setData] = useState([]);  
    const [load, setLoaded] = useState(false); 

        async function loadData(){ 
          try {
              const response = await axios.get(DATA_URL[51]); 
              setData(response.data); 
          } catch (error) {
            
          }
        };

        useEffect(()=>{loadData();}, []);
        const options = [];

        data.map((item, index)=>{
            options.push({label:item.ed_employee_name, value:item.ed_employee_id});
        });

        return options;
    }



    export function EmployeeArray() {
        const [data, setData] = useState([]);  
        const [load, setLoaded] = useState(false);
        async function loadData(){
            try {
                  const response = await axios.get(DATA_URL[51]);
                  setData(response.data);
            } catch (error) {
                
            }
        }
        useEffect(()=>{loadData()},[]);

        const students = [];
        data.map((item, index)=>{
           students.push({name:item.ed_employee_name, value:item.ed_employee_id});
        })
        return [students];
    }







        
    export function  StudentsCodeDataOptionsSelector(){ 
        const [data, setData] = useState([]);  
        const [load, setLoaded] = useState(false); 

        async function loadData(){ 
           try {
             const response = await axios.get(DATA_URL[10]); 
             setData(response.data); 
           } catch (error) {
            
           }
        };

        useEffect(()=>{loadData();}, []);
        const options = [];

        data.map((item, index)=>{
            options.push({label:item.ed_student_name, value:item.ed_student_code});
        });

        return options;
    }



            
    export function  ClassDataOptionsSelector(){ 
        const [data, setData] = useState([]);  
        const [load, setLoaded] = useState(false); 

        async function loadData(){ 
           try {
             const response = await axios.get(DATA_URL[0]); 
             setData(response.data);
           } catch (error) {
            
           } 
        };

        useEffect(()=>{loadData();}, []);
        const options = [];

        data.map((item, index)=>{
            options.push({label:item.ed_class_title, value:item.ed_class_id});
        });

        return options;
    }


    export function  StudentsCountData(){ 
        const [data, setData] = useState([]);  
        const [load, setLoaded] = useState(false); 

        async function loadData(){ 
            try {
                const response = await axios.get(DATA_URL[10]); 
                setData(response.data); 
                setLoaded(true);
            } catch (error) {
                setLoaded(true);
            }
        };

        useEffect(()=>{loadData();}, []);

        return data.length;
    }


    
    export function  GetStudentName(props){ 
        const [data, setData] = useState([]);  
        const [load, setLoaded] = useState(false); 
        const ID = GetIdCode(props);

        async function loadData(){ 
           try {
            const response = await axios.get(DATA_URL[16]+`${ID}`); 
            setData(response.data); 
            setLoaded(true);
           } catch (error) {
            setLoaded(true);
           }
        };

        useEffect(()=>{loadData();},[ID]); 

        return (<>{data.map((item, index)=>{  
        return(<><div>{item.ed_student_name}</div></>)})}</>);
    }
  

        
    export function  GetStudentGender(props){ 
        const [data, setData] = useState([]);  
        const [load, setLoaded] = useState(false); 
        const ID = GetIdCode(props);

        async function loadData(){ 
           try {
             const response = await axios.get(DATA_URL[16]+`${ID}`); 
             setData(response.data); 
             setLoaded(true);
           } catch (error) {
            setLoaded(true);
           }
        };

        useEffect(()=>{loadData();},[ID]); 

        return (<>{data.map((item, index)=>{  
        return(<><div>{item.ed_student_gender === "male" ? "Masculino" : "Femenino"}</div></>)})}</>);
    }
  

        
    export function  GetStudentPicture(props){ 
        const [data, setData] = useState([]);  
        const [load, setLoaded] = useState(false); 
        const ID = GetIdCode(props);

        async function loadData(){ 
           try {
            const response = await axios.get(DATA_URL[16]+`${ID}`); 
            setData(response.data);
            setLoaded(true);
           } catch (error) {
            setLoaded(true);
           } 
        };

        useEffect(()=>{loadData();},[ID]); 

        let size = props.size ? props.size : 60;

        return (<>{data.map((item, index)=>{  
        return(<><Avatar style={{background:`${RandomAvatarColor()}`}} sx={{width:size,height:size}}  
         alt={item.ed_student_name} src={item.ed_student_picture != ""  ?  Hoot()+item.ed_student_picture : ""}/></>)})}</>);
    }

        
    export function  GetStudentNameAndPicture(props){ 
        const [data, setData] = useState([]);  
        const [load, setLoaded] = useState(false); 
        const ID = GetIdCode(props);

        async function loadData(){ 
         try {
             const response = await axios.get(DATA_URL[16]+`${ID}`); 
            setData(response.data);
             setLoaded(true);
         } catch (error) {
            setLoaded(true);
         } 
        };

        useEffect(()=>{loadData();},[ID]); 

        let size = props.size ? props.size : 60;

        return (<>{data.map((item, index)=>{  
        return(<div className='ed-flex'>
             <Avatar sx={{width:size,height:size}}  
             alt={item.ed_student_name} src={item.ed_student_picture != ""  ?  Hoot()+item.ed_student_picture : ""}/>
             <div className='ml-2'>{item.ed_student_name}</div>
         </div>)})}</>);
    }




  
    export function  GetParentStudentAvatars(props){ 
        const [data, setData] = useState([]);  
        const [load, setLoaded] = useState(false);  
        let StudentsData = [];
        async function loadData(){ 
           try {
             for(let i = 0; i < props.ID.length; i++) {
                 const student = props.ID[i]; 
                 const response = await axios.get(DATA_URL[44]+`${student}`);
                 StudentsData.push(response.data[0]);  
                 console.log(DATA_URL[16]+`${student}`)
             }  
             setLoaded(true);
           } catch (error) {
            setLoaded(true);
           }
          setData(StudentsData); 
        };

        useEffect(()=>{loadData();},[]);  

        return(<>{
            data.map((item, index)=>{
                if(item !== undefined && item !== null){

                 return <SwitchFromPages link={`studentinfo/${item.ed_student_id}`}
                 menu='3'  menu_item='17'  toggle_btn={   
                    <Tooltip  place='left' text={item.ed_student_name} toggle_btn={ 
                        <Avatar alt={item.ed_student_name} 
                    src={item.ed_student_picture !== ""  ?  Hoot()+item.ed_student_picture : ""}  />
                   } />  
                  } /> 
                }
            })
        }</>);
        
       }
  

  
    export function  GetStudentParentsAvatars(props){ 
        let ID = props.ID;
        const [data, setData] = useState([]);  
        const [load, setLoaded] = useState(false);  

        let ParentsData = [];
        async function loadData(){   
           try {
             const response = await axios.get(DATA_URL[39]); 
             if (response.data.length >= 1){ 
                 response.data.map((item, index)=>{   
                     if(item.ed_parent_students_code !== null){
                         let students = item.ed_parent_students_code.split(',');  
 
                         
                         for(let i = 0; i < students.length; i++){
                             if((students[i]*1) >= 0){ 
                                 if(Math.floor(students[i]) === Math.floor(ID)){
                                      let SH = item.ed_parent_name.split('')[0] + item.ed_parent_name.split('')[item.ed_parent_name.split('').length -1]
                                       ParentsData.push({parent_avatar_letter:SH.toUpperCase(), parent_name:item.ed_parent_name, parent_picture:Hoot()+item.ed_parent_picture});
                                 }
                             }
                         }
 
                         setData(ParentsData);
                         
                     }
                 })   
             } 
             setLoaded(true);
           } catch (error) {
            setLoaded(true);
           }
        };  

        useEffect(()=>{loadData();},[ID]);    
        
        
       if(data.length >= 1) {
          return (<>{data.map((item, index)=>{  
            return(
                <SwitchFromPages  link="" menu="1" menu_item="26" toggle_btn={
                  <Tooltip  place='top' text={item.parent_name}  
                    toggle_btn={<Avatar key={index} alt={item.parent_name} src={item.parent_picture} 
                    style={{background:`${RandomAvatarColor()}` }}>{item.parent_avatar_letter}</Avatar>} /> 
                } />
            )})}</>);
       }



    }



   
    export function  GetServiceTitle(props){ 
        const [data, setData] = useState([]);  
        const [load, setLoaded] = useState(false); 
        const ID = GetIdCode(props);

        async function loadData(){ 
            try {
                const response = await axios.get(DATA_URL[17]+`${ID}`); 
                setData(response.data); 
                setLoaded(true);
            } catch (error) {
                setLoaded(true);
            }
        };

        useEffect(()=>{loadData();},[ID]); 

        return (<>{data.map((item, index)=>{  
        return(<><div>{item.ed_service_title}</div></>)})}</>);
    }

        
    export function  GetServicePrice(props){ 
        const [data, setData] = useState([]);  
        const [load, setLoaded] = useState(false); 
        const ID = GetIdCode(props);

        async function loadData(){ 
           try {
             const response = await axios.get(DATA_URL[17]+`${ID}`); 
             setData(response.data); 
             setLoaded(true);
           } catch (error) {
            setLoaded(true);
           }
        };

        useEffect(()=>{loadData();},[ID]); 

        return (<>{data.map((item, index)=>{  
        return(<><div>{NumberToPrice(item.ed_service_price)}   { item.ed_service_coin} </div></>)})}</>);
    }
    

            
    export function  GetServicePriceNumb(ID){ 
        const [data, setData] = useState(0);  
        const [load, setLoaded] = useState(false); 

        async function loadData(){ 
          try {
            const response = await axios.get(DATA_URL[17]+`${ID}`); 
            setData(NumberToPrice(response.data[0].ed_service_price*1));
            setLoaded(true);
          } catch (error) {
            setLoaded(true);
          }
        };

        useEffect(()=>{loadData();},[ID]);  
        return data; 
    }


                
    export function  GetServiceCointText(ID){ 
        const [data, setData] = useState(''); 
        const [load, setLoaded] = useState(false); 

        async function loadData(){ 
           try {
             const response = await axios.get(DATA_URL[17]+`${ID}`); 
             setData(response.data[0].ed_service_coin)
             setLoaded(true);
           } catch (error) {
            setData("")
            setLoaded(true);
           }
        };

        useEffect(()=>{loadData();},[ID]); 
 
        return data; 
    }

    

    export function  GetserviceCoin(props){ 
        const [data, setData] = useState([]);  
        const [load, setLoaded] = useState(false); 
        const ID = GetIdCode(props);

        async function loadData(){ 
           try {
             const response = await axios.get(DATA_URL[17]+`${ID}`); 
             setData(response.data); 
           } catch (error) {
              setData([]);
           }
        };

        useEffect(()=>{loadData();},[ID]); 

        return (<>{data.map((item, index)=>{  
        return(<>{item.ed_service_coin}</>)})}</>);
    }


            
    export function  GetServiceWithPrice(props){ 
        const [data, setData] = useState([]);  
        const [load, setLoaded] = useState(false); 
        const ID = GetIdCode(props);

        async function loadData(){ 
           try {
             const response = await axios.get(DATA_URL[17]+`${ID}`); 
             setData(response.data); 
             setLoaded(true);
           } catch (error) {
              setData([]);
              setLoaded(true);
           }
        };

        useEffect(()=>{loadData();},[ID]); 

        return (<>{data.map((item, index)=>{  
        return(<><div className='ed-wrap'>{item.ed_service_title} <div className='text-green ml-2'> ({NumberToPrice(item.ed_service_price)}   { item.ed_service_coin} )</div> </div></>)})}</>);
    }

    export function  AcademiclevelDataOptions(props){ 
        const [data, setData] = useState([]);  
        const [load, setLoaded] = useState(false); 

        async function loadData(){ 
           try {
             const response = await axios.get(DATA_URL[14]); 
             setData(response.data); 
             setLoaded(true);
           } catch (error) {
              setData([]);
              setLoaded(true);
           }
        };

        useEffect(()=>{loadData();}, []);

        return (<>
        <option selected disabled>Selecione uma classe </option> 
        {data.map((item, index)=>{   
                let a = index === 0 ? true : false;
                let b = props.code ? props.code : null;
               return(<> 
                  <option value={item.ed_academic_level_id} selected={getCurrent(item.ed_academic_level_id, a, b)}>{item.ed_academic_level_title}</option>
               </>)})
        }</>);
    }

        

    export function  VehiclesDataOptions(props){ 
        const [data, setData] = useState([]);  
        const [load, setLoaded] = useState(false); 

        async function loadData(){ 
           try {
             const response = await axios.get(DATA_URL[21]); 
             setData(response.data); 
             setLoaded(true);
           } catch (error) {
              setData([]);
              setLoaded(true);
           }
        };

        useEffect(()=>{loadData();}, []);

        return (<>
        <option selected disabled>Selecione um veiculo</option> 
        {data.map((item, index)=>{   
                let a = index === 0 ? true : false;
                let b = props.code ? props.code : null;
               return(<> 
                  <option value={item.ed_transport_vehicle_id} selected={getCurrent(item.ed_transport_vehicle_id, a, b)}>{item.ed_transport_vehicle_model}</option>
               </>)})
        }</>);
    }


    export function  GetVehicleModel(props){ 
        const [data, setData] = useState([]);  
        const [load, setLoaded] = useState(false); 
        const ID = GetIdCode(props);

        async function loadData(){ 
          try {
              const response = await axios.get(DATA_URL[22]+`${ID}`); 
              setData(response.data); 
              setLoaded(true);
          } catch (error) {
            setData([]);
            setLoaded(true);
          }
        };

        useEffect(()=>{loadData();},[ID]); 

        return (<>{data.map((item, index)=>{  
        return(<><div>{item.ed_transport_vehicle_model}</div></>)})}</>);
    }




    export function  GetTransportStopsDataOptions(props){ 
        const [data, setData] = useState([]);  
    const [load, setLoaded] = useState(false);  

        async function loadData(){ 
           try {
             const response = await axios.get(DATA_URL[23]); 
             setData(response.data);
           } catch (error) {
             setData([]);
           } 
        };

        useEffect(()=>{loadData();},[]); 

        return (<>
        <option selected disabled>Selecione uma paragem</option> 
        {data.map((item, index)=>{   
                let a = index === 0 ? true : false;
                let b = props.code ? props.code : null;
               return(<> 
                  <option value={item.ed_transport_stop_id} selected={getCurrent(item.ed_transport_stop_id, a, b)}>{item.ed_transport_stop_name}</option>
               </>)})
        }</>);
    }


    export function  GetTransportRoutesDataOptions(props){ 
        const [data, setData] = useState([]);  
    const [load, setLoaded] = useState(false);  

        async function loadData(){ 
          try {
            const response = await axios.get(DATA_URL[25]); 
            setData(response.data); 
          } catch (error) {
              setData([]);
          }
        };

        useEffect(()=>{loadData();},[]); 

        return (<>
        <option selected disabled>Selecione uma rota</option> 
        {data.map((item, index)=>{   
                let a = index === 0 ? true : false;
                let b = props.code ? props.code : null;
               return(<> 
                  <option value={item.ed_transport_route_id} selected={getCurrent(item.ed_transport_route_id, a, b)}>{item.ed_transport_route_name}</option>
               </>)})
        }</>);
    }

    
    export function  GetTransportStopName(props){ 
        const [data, setData] = useState([]);  
        const [load, setLoaded] = useState(false); 
        const ID = GetIdCode(props);

        async function loadData(){ 
           try {
             const response = await axios.get(DATA_URL[24]+`${ID}`); 
             setData(response.data); 
             setLoaded(true);
           } catch (error){
             setData([]);
             setLoaded(true);
           }
        };

            useEffect(()=>{loadData();},[ID]); 

        return (<>{data.map((item, index)=>{  
        return(<><div>{item.ed_transport_stop_name}</div></>)})}</>);
    }



    export function  SubjectMultipleSelect(){
        const [data, setData] = useState([]);  
        const [load, setLoaded] = useState(false);  

        async function loadData(){ 
            try {
                const response = await axios.get(DATA_URL[11]); 
                setData(response.data); 
                setLoaded(true);
            } catch (error) {
                setData([]);
                setLoaded(true);
            }
        };

        useEffect(()=>{loadData();},[]); 

        const subjects = [];
        for (let i = 0; i < data.length; i++) {
           subjects.push({label:data[i].ed_subject_title, value:data[i].ed_subject_id, selected: i === 0 ? true : false });
        }
       
        return [subjects]
    }


    export function StudentsArray() {
        const [data, setData] = useState([]);  
        const [load, setLoaded] = useState(false);
        async function loadData(){
            try {
                const response = await axios.get(DATA_URL[10]);
                setData(response.data);
            } catch (error) {
                setData([]);
            }
        }
        useEffect(()=>{loadData()},[]);

        const students = [];
        data.map((item, index)=>{
           students.push({name:item.ed_student_name, value:item.ed_student_id});
        })
        return [students];
    }



export function  GetAcademiclevel_avlEnValue(e) {  
        const [data, setData] = useState([]);  
        const [load, setLoaded] = useState(false); 

        async function loadData(){  
            if(e === null && e*1 < 0){
                 setData([]);
            }else{
              try {
                  const response = await axios.get(DATA_URL[9]+`${e}`);  
                  console.log()
                  if(response.data.length >= 1){
                      const info = await axios.get(DATA_URL[15]+`${response.data[0].ed_class_academic_level}`); 
                      setData(info.data); 
                  } 
                  setLoaded(true);
              } catch (error) {
                setLoaded(true);
              }
            }
        };
        useEffect(()=>{loadData();}, [e]);   

       
        if(data[0] != null) return data[0].ed_academic_level_avaliationtype_endat ? 
        data[0].ed_academic_level_avaliationtype_endat*1 : 0;
    }


    export function  GetAcademiclevelAVLendValueStatus(props) {  
        const [data, setData] = useState([]);  
        const [load, setLoaded] = useState(false); 
        const SCORE = props.score;
        const e = props.class;

        const StatusType = [
            <Badge bg={'success'}><Check/>Transito</Badge> ,
            <Badge bg={'danger'}> <Close/>Reprovado</Badge> , 
        ]; 

        const StatusType1 = [
            <Badge bg={'success'}>{SCORE}</Badge> ,
            <Badge bg={'danger'}>{SCORE}</Badge> , 
        ];

        async function loadData(){  
            if(e === null && e*1 < 0){
                 setData([]);
            }else{
              try {
                  const response = await axios.get(DATA_URL[9]+`${e}`);  
                  console.log()
                  if(response.data.length >= 1){
                      const info = await axios.get(DATA_URL[15]+`${response.data[0].ed_class_academic_level}`); 
                      setData(info.data); 
                  } 
                  setLoaded(true);
              } catch (error) {
                 setData([]);
                 setLoaded(true);
              }
            }
        };
        useEffect(()=>{loadData();}, [e]);   

       
       if(props.color){
        if(data[0] != null) return data[0].ed_academic_level_avaliationtype_endat ? 
        (SCORE < (data[0].ed_academic_level_avaliationtype_endat*1 / 2) ? StatusType1[1] : StatusType1[0])
       : StatusType1[1] ;
       }else{
        if(data[0] != null) return data[0].ed_academic_level_avaliationtype_endat ? 
        (SCORE < (data[0].ed_academic_level_avaliationtype_endat*1 / 2) ? StatusType[1] : StatusType[0])
       : StatusType[1] ;
       }
    }




    export function StudentSelectSearch(props) {
        const [data, setData] = useState([]);  
        const [load, SetLoaded] = useState(false); 

        async function loadData(){
             try {
                 const response = await axios.get(DATA_URL[10]);
                 setData(response.data);
             } catch (error) {
                setData([]);
             }
        }
        useEffect(()=>{
            loadData();
            SetLoaded(true);
        },[]);
        

        const students = [];
        for(let i = 0; i < data.length; i++) {
             students.push({name:data[i].ed_student_name, value:data[i].ed_student_id});
        }  

        const GetStudentCode = (e)=>{
            if(props.GetCode)  props.GetCode(e);
        }

       
       if(load ===  true  && students.length >= 1){
         return <SelectSearch  onChange={(e)=>GetStudentCode(e)} search={true} options={students} id="" placeholder= "Selecione um aluno"  />
       }else{
        return <SelectSearch  onChange={(e)=>GetStudentCode(e)} search={true} options={[]} id="" placeholder= "Selecione um aluno"  />
       }
    }

    export function StudentsArrayByClass(e){
        const [data, setData] = useState([]);  
       const [load, setLoaded] = useState(false);
        async function loadData(){ 
         try {
            const response = await axios.get(DATA_URL[10]);
            setData(response.data); 
         } catch (error) {
            setData([]);
         }
        }
        useEffect(()=>{
            loadData()
        },[]); 

        const students = [];
        for(let i = 0; i < data.length; i++) { 
             students.push({name:data[i].ed_student_name, value:data[i].ed_student_id});
        } 
        return [students];
    }
 



    export function  GetInstituteCode(){ 
        return "29sVaJwcQMpLYNUDfVJfz128kygWOOmExbqKWL18EDWdyDJYCD2Tp4yVGup4qyHwReG0BaILnYio1rini2oB9hQD28xcsZKsOUZ"; 
    }

    
     export function  GetSchoolNotes(props){ 
        const [data, setData] = useState([]);  
        const [load, setLoaded] = useState(false); 
        const quarter = Math.floor(props.quarter);
        const student =  Math.floor(props.student);
        const subject =  Math.floor(props.subject);
        const type = Math.floor(props.type);
        const Class =  Math.floor(props.class);
        const [MAXVALUE, setMAXVALUE] =  useState(null);

 
        const StatusType = [
            <Badge bg={'success'}><Check/> Positivo</Badge> ,
            <Badge bg={'danger'}> <Close/> Negativo</Badge> , 
        ];

        async function loadData(){ 
          try {
            setLoaded(false);
            const response = await axios.get(DATA_URL[43]+`${subject},${student},${quarter},${Class}`); 
            setData(response.data); 
            setMAXVALUE(response.data[0].ed_academic_level_avaliationtype_endat*1);
            setLoaded(true);  
          } catch (error) {
            setLoaded(true);
          }  
        };

          const GetstudentMT = (n1, n2, n3)=>{   
            let res = ""; 
            const total = ""+(((n1*1) + (n2*1) + (n3*1)) / 3)+"".split('');
              for(let i = 0; i < total.length; i++) {
                  if(i <= 4)  res += total[i];
              } 
            return FloorNumber(res); 
          }
          

        useEffect(()=>{loadData();},[quarter,student,subject,type,Class]);   


          if(load){
            if (type === 1) {
               
                if(data.length >= 1){
                   return (<>{data.map((item, index)=>{  
                   return(<><div>{FloorNumber(item.ed_quarter_note_mac) < (MAXVALUE/2) ?
                   <span className='text-danger'>{FloorNumber(item.ed_quarter_note_mac)}</span>
                  :<span className='text-success'>{FloorNumber(item.ed_quarter_note_mac)}</span>}</div></>)})}</>);
                  }else{return (<span className='text-main-light'>#</span>)}
   
              }else if(type === 2){
                  
                if(data.length >= 1){
                  return (<>{data.map((item, index)=>{  
                  return(<><div>{FloorNumber(item.ed_quarter_note_npp) < (MAXVALUE/2) ?
                   <span className='text-danger'>{FloorNumber(item.ed_quarter_note_npp)}</span>
                  :<span className='text-success'>{FloorNumber(item.ed_quarter_note_npp)}</span>}</div></>)})}</>);
                  }else{return (<span className='text-main-light'>#</span>)}
   
              }else if(type === 3){
   
                if(data.length >= 1){
                return (<>{data.map((item, index)=>{  
                return(<><div>{
   
                   FloorNumber(item.ed_quarter_note_npt) < (MAXVALUE/2) ?
                   <span className='text-danger'>{FloorNumber(item.ed_quarter_note_npt)}</span>
                  :<span className='text-success'>{FloorNumber(item.ed_quarter_note_npt)}</span> 
   
                 }</div></>)})}</>);
                }else{return (<span className='text-main-light'>#</span>)}
   
              }else if(type === 4){
   
                if(data.length >= 1){
                return (<>{data.map((item, index)=>{  
                return(<><div>{ 
   
                   (GetstudentMT(item.ed_quarter_note_mac, item.ed_quarter_note_npp, item.ed_quarter_note_npt) > MAXVALUE) ? <div className="text-warning"><IoWarningOutline /></div> :
                   ((GetstudentMT(item.ed_quarter_note_mac, item.ed_quarter_note_npp, item.ed_quarter_note_npt) < (MAXVALUE/2))  ?
                    <span className='text-danger'>{GetstudentMT(item.ed_quarter_note_mac, item.ed_quarter_note_npp, item.ed_quarter_note_npt)}</span>
                   :<span className='text-success'>{GetstudentMT(item.ed_quarter_note_mac, item.ed_quarter_note_npp, item.ed_quarter_note_npt)}</span>) 
   
                }</div></>)})}</>);
                }else{return (<span className='text-main-light'>#</span>)}
   
              }else if(type === 5){
   
               if(data.length >= 1){
               return (<>{data.map((item, index)=>{  
               return(<><div>{ 
   
                  (GetstudentMT(item.ed_quarter_note_mac, item.ed_quarter_note_npp, item.ed_quarter_note_npt) > MAXVALUE) ? 
                   <div className="text-warning"><IoWarningOutline /></div> :
                  ((GetstudentMT(item.ed_quarter_note_mac, item.ed_quarter_note_npp, item.ed_quarter_note_npt) < (MAXVALUE/2))  ? 
                   <>{StatusType[1]}</>  : <>{StatusType[0]}</> 
                  )}</div></>)})}</>);
               }else{return (<span className='text-main-light'>#</span>)}
   
             } 
        }else{
            return <SmallLoader sm />
        }
    }  
    
     export function  GetSchoolNoteMFD(props){ 
        const [data, setData] = useState([]);  
        const [load, setLoaded] = useState(false);  
        const student =  Math.floor(props.student);
        const subject =  Math.floor(props.subject); 
        const Class =  props.class ? props.class : 0;
        const [MAXVALUE, setMAXVALUE] =  useState(null);
 
        async function loadData(){ 
           try {
             setLoaded(false); 
            const [response1, response2, response3] = await Promise.all([
                axios.get(DATA_URL[43]+`${subject},${student},${1},${Class}`),
                axios.get(DATA_URL[43]+`${subject},${student},${2},${Class}`),
                axios.get(DATA_URL[43]+`${subject},${student},${3},${Class}`)
            ]);

            setMAXVALUE(response1.data[0].ed_academic_level_avaliationtype_endat*1);
 
             setData([{
                 q1:response1.data,
                 q2:response2.data,
                 q3:response3.data
             }]);   
             setLoaded(true);
           } catch (error) {
             setLoaded(true);
           }
        };

         const GetstudentMT = (n1, n2, n3)=>{   
            let res = ""; 
            const total = ""+(((n1*1) + (n2*1) + (n3*1)) / 3)+"".split('');
              for(let i = 0; i < total.length; i++) {
                  if(i <= 3)  res += total[i];
              } 
            return FloorNumber(res); 
          }
 

        useEffect(()=>{loadData();},[student,subject]); 
 
        if(load){
            if(data.length >= 1){
                let n1, n2, n3 = 0 
                    
               data[0].q1.length >= 1 ? n1 = GetstudentMT(data[0].q1[0].ed_quarter_note_mac, data[0].q1[0].ed_quarter_note_npp, data[0].q1[0].ed_quarter_note_npt) : n1 = 0;
               data[0].q2.length >= 1 ? n2 = GetstudentMT(data[0].q2[0].ed_quarter_note_mac, data[0].q2[0].ed_quarter_note_npp, data[0].q2[0].ed_quarter_note_npt) : n2 = 0;
               data[0].q3.length >= 1 ? n3 = GetstudentMT(data[0].q3[0].ed_quarter_note_mac, data[0].q3[0].ed_quarter_note_npp, data[0].q3[0].ed_quarter_note_npt) : n3 = 0;
    
               let n = ""+(((n1 !== NaN ? n1*1 : 0) + (n2 !== NaN ? n2*1 : 0) + (n3 !== NaN ? n3*1 : 0)) / 3)+"".split("");
               let res = "";
               for(let i = 0; i < n.length; i++){if(i <= 2)  res += n[i];}  
    
    
              if(res*1 === 0) return <span className='text-danger'>{res*1}</span>

              return   (res*1 > MAXVALUE) ? <div className="text-warning"><IoWarningOutline /></div> :  (res*1 < (MAXVALUE/2))  ?
              <span className='text-danger'>{res*1}</span> : <span className='text-success'>{res*1}</span>
    
            } 
        }else{
            return <SmallLoader sm />
        }

    }





    
    export function  GetSchoolNoteExam(props){ 
        const [data, setData] = useState(0);  
        const [load, setLoaded] = useState(false);  
        const student =  Math.floor(props.student);
        const subject =  Math.floor(props.subject); 
        const Class =  props.class ? props.class : 0;
        const [MAXVALUE, setMAXVALUE] =  useState(null); 
 
 
        async function loadData(){ 
           try { 
            setLoaded(false);
             const response = await axios.get(DATA_URL[54]+`${subject},${student},${Class}`); 
             setData(response.data.length >= 1  ? response.data[0].ed_student_exam_score : null); 
             setMAXVALUE(response.data.length >= 1  ? response.data[0].ed_academic_level_avaliationtype_endat*1 : null);
 

              console.log(response.data);

             setLoaded(true);
           } catch (error) {
             setData(0);
             setLoaded(true);
           }
        };
 

        useEffect(()=>{loadData();},[]);  


        if(load){
        if(data !== null){
            return   (data > MAXVALUE) ? <div className="text-warning"><IoWarningOutline /></div> :  (data < (MAXVALUE/2))  ?
            <span className='text-danger'>{data}</span> : <span className='text-success'>{data}</span>  
        }else{
            return <span className='text-main-light'>#</span>
        }
        }else{
            return <SmallLoader sm />
        }
       
    }
    

    

    
    export function  GetSchoolNoteFeatured(props){ 
        const [data, setData] = useState(0);  
        const [load, setLoaded] = useState(false);  
        const student =  Math.floor(props.student);
        const subject =  Math.floor(props.subject); 
        const Class =  props.class ? props.class : 0; 
        const [MAXVALUE, setMAXVALUE] =  useState(null); 
 
 
        async function loadData(){ 
           try { 
             setLoaded(false);
             const response = await axios.get(DATA_URL[55]+`${subject},${student},${Class}`); 
             setData(response.data.length >= 1  ? response.data[0].ed_student_featured_note_score : null); 
            setMAXVALUE(response.data.length >= 1  ? response.data[0].ed_academic_level_avaliationtype_endat*1 : null);
 
             setLoaded(true);
           } catch (error) {
             setData(0);
             setLoaded(true);
           }
        };
 

        useEffect(()=>{loadData();},[]);  

        if(load){ 
            if(data !== null){

                if(data*1 === 0) return  <span className='text-danger'>{data*1}</span> 
                return   (data > MAXVALUE) ? <div className="text-warning"><IoWarningOutline /></div> :  (data < (MAXVALUE/2))  ?
                <span className='text-danger'>{data}</span> : <span className='text-success'>{data}</span>   

            }else{
                return <span className='text-main-light'>#</span>
            }
        }else{
            return <SmallLoader sm />
        }
 
       
    }

    
    export function  GetSchoolNoteExamResult(props){ 
        const [data, setData] = useState([]);  
        const [load, setLoaded] = useState(false);  
        const student =  Math.floor(props.student);
        const subject =  Math.floor(props.subject); 
        const Class =  props.class ? props.class : 0;  
        const [MAXVALUE, setMAXVALUE] =  useState(null); 
 
 
        async function loadData(){ 
           try {
             setLoaded(false); 
            const [response1, response2, response3, response4] = await Promise.all([
                axios.get(DATA_URL[43]+`${subject},${student},${1},${Class}`),
                axios.get(DATA_URL[43]+`${subject},${student},${2},${Class}`), 
                axios.get(DATA_URL[43]+`${subject},${student},${3},${Class}`),  
                axios.get(DATA_URL[54]+`${subject},${student},${Class}`)
            ]);   
            setMAXVALUE(response4.data[0].ed_academic_level_avaliationtype_endat*1); 
 
             setData([{
                 q1:response1.data,
                 q2:response2.data,
                 q3:response3.data,
                 examScore:response4.data.length >= 1  ? response4.data[0].ed_student_exam_score : 0
             }]); 
             setLoaded(true);  
           } catch (error) {
            setLoaded(true);
           }
        };

         const GetstudentMT = (n1, n2, n3)=>{   
            let res = ""; 
            const total = ""+(((n1*1) + (n2*1) + (n3*1)) / 3)+"".split('');
              for(let i = 0; i < total.length; i++) {
                  if(i <= 3)  res += total[i];
              } 
            return FloorNumber(res); 
          }
 

        useEffect(()=>{loadData();},[student,subject]); 
 

    if(load){ 
        if(data.length >= 1){
            let n1, n2, n3 = 0  
           data[0].q1.length >= 1 ? n1 = GetstudentMT(data[0].q1[0].ed_quarter_note_mac, data[0].q1[0].ed_quarter_note_npp, data[0].q1[0].ed_quarter_note_npt) : n1 = 0;
           data[0].q2.length >= 1 ? n2 = GetstudentMT(data[0].q2[0].ed_quarter_note_mac, data[0].q2[0].ed_quarter_note_npp, data[0].q2[0].ed_quarter_note_npt) : n2 = 0;
           data[0].q3.length >= 1 ? n3 = GetstudentMT(data[0].q3[0].ed_quarter_note_mac, data[0].q3[0].ed_quarter_note_npp, data[0].q3[0].ed_quarter_note_npt) : n3 = 0;

           let n = ""+(((n1 !== NaN ? n1*1 : 0) + (n2 !== NaN ? n2*1 : 0) + (n3 !== NaN ? n3*1 : 0)) / 3)+"".split("");
           let res = "";
           for(let i = 0; i < n.length; i++){if(i <= 2)  res += n[i];}   
           let finalValue  =  FloorNumber((res*1 * 0.4) + (data[0].examScore * 0.6));  

          if(finalValue*1 === 0) return  <span className='text-danger'>{finalValue*1}</span> 
          return   (finalValue > MAXVALUE) ? <div className="text-warning"><IoWarningOutline /></div> :  (finalValue < (MAXVALUE/2))  ?
          <span className='text-danger'>{finalValue}</span> : <span className='text-success'>{finalValue}</span> 
        } 
    }else{
        return <span className='text-main-light'>#</span>
    } 
}


