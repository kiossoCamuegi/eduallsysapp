import React, { useState } from 'react'
import { Button } from 'react-bootstrap';
import FileUpload from '../../General/components/FileUpload';

function UploadDemo() {

  const [assets, Setassets] = useState([]);
  
  const getData = (data)=>{
      console.log(data);
      Setassets(data);
  }


  const print = ()=>{
    console.log(assets)
  }

  return (
    <div>
          <h5>Dados do usúario</h5><br/> 
          <Button onClick={print} >Get information</Button><br/><br/>

          <FileUpload onSubmit={getData} input_name="student_files" 
           Icon="0" type_of_files="image/x-png,image/png,image/gif,image/jpeg"  
           extensions="png" />
    </div>
  )
}

export default UploadDemo