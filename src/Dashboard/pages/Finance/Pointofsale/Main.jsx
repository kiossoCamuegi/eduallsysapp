import { AttachMoney, Euro, MoneyOutlined, Shop } from '@material-ui/icons';
import { Inventory2Outlined,  SellOutlined, Shop2Outlined } from '@mui/icons-material';
import React from 'react'
import styled from 'styled-components'
import Chart_salles_per_month from '../../../components/elements/Charts/Chart_salles_per_month';
import PointOfSaleNavbar from '../../../components/elements/Finance/PointOfSaleNavbar'
import LatestSelledProducts from '../../../components/Table/PointOfSales/LatestSelledProducts';
import MostSelledProducts from '../../../components/Table/PointOfSales/MostSelledProducts';

function Main() {
  return (
    <div>
        <PointOfSaleNavbar/>
         <div className="pages-container">
         <BoxFlex>
              <Box className='boxItem green-box-user'>
                    <div><Shop2Outlined/></div>
                    <Block >
                        <h3>0</h3>
                        <span>Cátegorias</span>
                    </Block>
              </Box>
              <Box className='mrb-2 boxItem gold-box-user'>
                    <div><Inventory2Outlined/> </div>
                    <Block>
                        <h3>0</h3>
                        <span>Produtos</span>
                    </Block>
              </Box>
              <Box className='boxItem purple-box-user'>
                    <div><SellOutlined/> </div>
                    <Block>
                        <h3>0</h3>
                        <span>Estoque</span>
                    </Block>
              </Box>
              <Box className='boxItem blue-box-user'>
                    <div><AttachMoney/></div>
                    <Block>
                        <h3 className='ed-flex'>0 <h5 className="ml-2 text-green">(190.000 AOA)</h5> </h3>
                        <span>Total vendas</span>
                    </Block>
              </Box>
           </BoxFlex> 
             <div className="ed-wrap ed-space">
                    <TableBox>
                        <MostSelledProducts/>
                    </TableBox>
                    <TableBox>
                        <LatestSelledProducts/>
                    </TableBox>
             </div>
             <div className="mt-4">
                <ChartBox>
                    <div className="title">Vendas Mensais</div>
                    <Chart_salles_per_month/>
                </ChartBox>
             </div>
         </div>
    </div>
  )
}


const TableBox = styled.div`
   width:49%;

   @media screen and (max-width:1290px){
       width:100%;
       min-width:auto; 
   }
`;

const BoxFlex = styled.div`
    display:flex; 
    width:100%;
    flex-wrap:wrap; 
    justify-content:space-between;
`;

const Box = styled.div`
   width:24%;
   min-width:200px;
   border-radius:6px; 
   height:150px;
   margin-bottom:21px !important;
   background:var(--ed-white);  
   box-shadow:var(--ed-shadow-df);
   display:flex;
   align-items:center;
   justify-content:space-between;
   padding:20px;
   position: relative;
   color:var(--ed-white);

   .icon{
      font-size:60px;
      font-weight:600;
   }

   svg{
       width:45px;
       height:45px;
       fill:var(--ed-white);
   }

   h3{
       text-transform:capitalize;
       font-size:27px;
       font-weight:600;
   }

   span{
       font-size:15px;
       font-weight:500;
   }
`;


const Block = styled.div`
   display:block;
   text-align:center;
`;


const ChartBox = styled.div` 
    width:auto; 
    border-radius:6px;   
    padding:20px;
    min-height:500px;
    background:var(--ed-white);  
    box-shadow:var(--ed-shadow-df);

    .title{
        text-transform:capitalize;
        font-size:18px;
        font-weight:500;
    } 
`;

export default Main