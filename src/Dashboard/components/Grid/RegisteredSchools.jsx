 
import React , { useState }  from 'react'; 
import { Avatar } from '@mui/material';
import styled from 'styled-components'; 

function RegisteredSchools(props) {
const [eduShools, SetEduSchools] = useState([]);

  return (
    <div> 
     <Row>
         {
            eduShools.map((item, index)=>{
                return(
                    <Card key={index}>
                        <div className="ed-flex">
                            <Avatar src='' alt=''>E</Avatar>
                            <div className="ed-block">
                            <h3 className="name">nome da instituição nest campo</h3>
                            <a href="#" className="text-main-light">schoolemailrighthere@gmail.com</a>
                            </div>
                        </div> 
                        <div className="checked-status">
            
                        </div>
                    </Card>
                )
            })
         }
     </Row>
    </div>
  )
}
 
const Row = styled.div`
    max-height:200px;
    overflow-y:auto;

    &&::-webkit-scrollbar{
        width:6px;
        background-color:transparent;
    }
    
   &&::-webkit-scrollbar-thumb{
        background:rgb(219, 219, 219); 
    }
`


const Card = styled.div`
   display:flex;
   justify-content:space-between;
   cursor:pointer;
   margin:10px 0px;
   width:100%;
   height:70px;
   background:var(--ed-background-color); 
   padding:10px;
   border:1px solid var(--ed-white-smoke);
   border-radius:6px;

      .ed-block{
          padding-left:20px;

          h3{
              margin:0px;
              font-size:16px;
          }

          a{
              font-size:14px;
          }
      }

`;

export default RegisteredSchools