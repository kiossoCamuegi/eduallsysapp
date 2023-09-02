import { Search } from '@mui/icons-material';
import { AgGridReact } from 'ag-grid-react';
import React, { useCallback, useEffect, useRef, useState } from 'react'
import {FaRegFileExcel} from "react-icons/fa"; 
import {BsFiletypeCsv} from "react-icons/bs"; 

///import 'ag-grid-enterprise';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';


function TableGrid(props) { 
  const [rowData] = useState(props.TableBody ? props.TableBody : []);
  const [columnDefs] = useState(props.TableHead ? props.TableHead : []);
  const [TableComponents] = useState(props.TableComponents ? props.TableComponents : []);
  
let CurrentHeight = props.TableBody.length <= 7 ? 500 : 900; 
 if(props.TableHeight){
     CurrentHeight = props.TableHeight;
 }

  const gridRef = useRef();

  const onFilterTextBoxChanged = useCallback(() => {
    gridRef.current.api.setQuickFilter(
      document.getElementById(`${props.TableInputCode ?  'filter-text-box-'+props.TableInputCode : 'filter-text-box'}`).value
    );
  }, []);


  const onBtExportToExcel = useCallback(() => {
     gridRef.current.api.exportDataAsExcel();
  }, []);

  const onBtnExportToCSV = useCallback(() => {
    gridRef.current.api.exportDataAsCsv();
  }, []);

  useEffect(()=>{
   setTimeout(() => {
     let Tab =  document.querySelectorAll(".ag-center-cols-container");
     for (let i = 0; i < Tab.length; i++) { 
       Tab[i].classList.add("tab");
     } 
   }, 1000);
  },[]);


 
     




  return (
    <>
     <div className="custom-table">
       <div className="ag-theme-alpine" style={{height:CurrentHeight, width:'100%'}}>
       <div className="ed-space">
            <div className="title"><h1>{props.TableTitle ? props.TableTitle : ''}</h1></div>
            <div className='ed-flex'> 
               <button className='mr-2 btn table-btn-small btn-export btn-excel' onClick={onBtExportToExcel} ><FaRegFileExcel/></button> 
                <button className='mr-2 btn table-btn-small btn-export btn-csv'  onClick={onBtnExportToCSV} ><BsFiletypeCsv/></button> 
            
              <div className="search-table-form">
                 <Search/>
                 <input  type="text"  id={`${props.TableInputCode ?  'filter-text-box-'+props.TableInputCode : 'filter-text-box'}`} className='form-control'  placeholder="Pesquisar ..."  onInput={onFilterTextBoxChanged}  />
              </div>
              {props.TableBtn ? props.TableBtn : <></> } 
            </div>
        </div> 
          <AgGridReact
              rowData={rowData}
              columnDefs={columnDefs}
              suppressRowClickSelection={true}
              groupSelectsChildren={true}
              ref={gridRef}
              rowSelection={'multiple'}
              rowGroupPanelShow={'always'}
              pivotPanelShow={'always'}
              pagination={true} 
              >
          </AgGridReact>
      </div>
     </div>
     <br /><br /><br />
    </>
  );  
}

export default TableGrid
