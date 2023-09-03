import React , {useState, useEffect} from 'react'
import { Avatar } from '@mui/material'; 
import { Link } from 'react-router-dom';
import Table from './Table';
import axios from 'axios';
import { Delete, Description, Edit, PreviewOutlined} from '@mui/icons-material';
import Hoot from '../../../General/components/Hoot'; 
import NewProductModal from '../modal/NewProductModal';
import DeleteModal from '../elements/DeleteModal';
const TABLEURL = Hoot()+"eduallproductsapi/get/";
 

const ProductsHead = [
    'Nome do produto', 
    'Fornecedor', 
    'Valor de compra',
    'Valor de venda', 
    'Quantidade no stock',
    'Quantidade vendidada', 
    'Ação'
];


const ProductsOptions = {
    filterType: 'checkbox'
}

function ProductsTable() {
  
    const [data, setData] = useState([]);
  
    async function loadData(){
        const response = await axios.get(TABLEURL);
        setData(response.data);
    }
  
    useEffect(()=>{
        loadData();
    });
  
    const ProductsBody = [];
    data.map((item, index)=>{
        if(item != null){ 
             ProductsBody.push([ 
                <div><img loading="lazy" role="presentation" src={item.ed_product_picture != "" ? Hoot()+item.ed_product_picture : "#"} alt="#" className='tableImg' />{item.ed_product_name}</div> ,
                item.ed_product_provider, 
                item.ed_product_purchase_price,
                item.ed_product_sale_price,
                item.ed_product_stock_amount,
                item.ed_product_purchase_amount, 
                <div className="ed-flex">
                    <NewProductModal  title='Atualizar ' update='true' get={Hoot()+`eduallsingleclassapi/get/${item.ed_class_id}`}  
                    url={Hoot()+`eduallclassupdateapi/update/${item.ed_class_id}`}  toggle_btn={
                    <button class_code={item.ed_class_id} className="btn-circle bg-success text-light">
                        <Edit/>
                    </button> 
                    } />
                    <DeleteModal title='Turma' url={Hoot()+`eduallclassdeleteapi/delete/${item.ed_class_id}`} 
                    message='Turma deletada com sucesso' toggle_btn={
                    <button class_code={item.ed_class_id} className="btn-circle bg-danger ml-2 text-light">
                        <Delete/>
                    </button>
                    }/> 
                </div>
            ])
        }
    });
  
  
    return (
      <Table
         TableHead={ProductsHead}
         TableBody={ProductsBody}
         TableOptions={ProductsOptions}
         TableTitle='Produtos no stock'
      />
    )
}

export default ProductsTable