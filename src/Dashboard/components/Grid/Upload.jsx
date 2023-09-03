import axios from 'axios';
import React , {useState, useEffect} from 'react'
import styled from 'styled-components'
import Hoot from '../../../General/components/Hoot';


const U = Hoot()+"eduallstudentsapi/get/";

function PAGAMENTO(props){
 
 
  const [files, setFiles] = useState([]);

  const onInputChange = (e)=>{
    console.table(e.target.files);
     setFiles(e.target.files);
  }

  const Send = (e)=>{
    e.preventDefault();
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {   
        data.append('file',files[i]);
    }
    console.log(data)

    axios.post(Hoot()+'eduallfilesregisterapi/post/', {data:data}).then((response)=>{
        console.log(response.data);
    }).catch((e)=>{
       console.error(e);
    })
  }

  return (
    <div>
        <Box>
          <form action="" onSubmit={Send}>
              <label htmlFor="doc">Meu ficheiro</label><br /><br />
              <input type="file" name="doc" id="doc"  onChange={onInputChange} multiple />

              <main className="rename-container">
                   <div className="box-file">

                   </div>
              </main><br />
              <button className='btn bg-dark text-light' type="submit">Submit file</button>
          </form>
        </Box>
    </div>
  ) 
}

const  Box = styled.div`
    padding:40px;
`;

export default PAGAMENTO