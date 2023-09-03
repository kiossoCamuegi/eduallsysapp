import React from 'react';
import styled from 'styled-components';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';

const Widgets = [
    {widget_name: 'Total funcionarios', widget_total:'12', widget_update_link: '#', widget_active:false, widget_icon : <BadgeOutlinedIcon/>},
    {widget_name: 'Total funcionarios', widget_total:'12', widget_update_link: '#', widget_active:false, widget_icon : <BadgeOutlinedIcon/>},
    {widget_name: 'Total funcionarios', widget_total:'12', widget_update_link: '#', widget_active:false, widget_icon : <BadgeOutlinedIcon/>},
    {widget_name: 'Total funcionarios', widget_total:'12', widget_update_link: '#', widget_active:false, widget_icon : <BadgeOutlinedIcon/>},

    {widget_name: 'Total funcionarios', widget_total:'12', widget_update_link: '#', widget_active:false, widget_icon : <BadgeOutlinedIcon/>},
    {widget_name: 'Total funcionarios', widget_total:'12', widget_update_link: '#', widget_active:false, widget_icon : <BadgeOutlinedIcon/>},
    {widget_name: 'Total funcionarios', widget_total:'12', widget_update_link: '#', widget_active:false, widget_icon : <BadgeOutlinedIcon/>},
    {widget_name: 'Total funcionarios', widget_total:'12', widget_update_link: '#', widget_active:false, widget_icon : <BadgeOutlinedIcon/>},

    {widget_name: 'Total funcionarios', widget_total:'12', widget_update_link: '#', widget_active:false, widget_icon : <BadgeOutlinedIcon/>},
    {widget_name: 'Total funcionarios', widget_total:'12', widget_update_link: '#', widget_active:false, widget_icon : <BadgeOutlinedIcon/>},
    {widget_name: 'Total funcionarios', widget_total:'12', widget_update_link: '#', widget_active:false, widget_icon : <BadgeOutlinedIcon/>},
    {widget_name: 'Total funcionarios', widget_total:'12', widget_update_link: '#', widget_active:false, widget_icon : <BadgeOutlinedIcon/>},
];


function WidgetBox() {
  return (
      <div className="box-wrapper">
          {
            Widgets.map((item, index)=>{
                return(
                  <Box key={index}>
                       <button className="btn-check checked"><div></div></button>
                       <div> {item.widget_icon}</div>
                     <Block>
                        <h3>{item.widget_total} </h3>
                        <span> {item.widget_name} </span>
                     </Block>
                  </Box>
                )
            })
          }
      </div>
  )
}

const Box = styled.div`
    width:24%;
    min-width:200px;
    border-radius:6px; 
    height:150px;
    margin-right:15px;
    margin-bottom:21px !important;
    background:var(--ed-white);  
    box-shadow:var(--ed-shadow-df);
    display:flex;
    align-items:center;
    justify-content:space-between;
    padding:20px;
    position: relative;

    button{
       background:transparent;
       width:30px;
       height:30px;
       border-radius:100%;
       border:4px solid var(--ed-green-light);
        
    }

    
   svg{
      width:45px;
      height:45px;
    }

    h3{
      text-transform:capitalize;
      font-size:27px;
      font-weight:600;
    }

    span{
      font-size:13px;
    }
`;

const Block = styled.div`
   display:block;
   text-align:center;
`;


export default WidgetBox