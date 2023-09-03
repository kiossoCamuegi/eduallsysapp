 import * as React from 'react';
import MUIDataTable from "mui-datatables";  

const Table = props =>{
  const Actions = props.TableActions ? props.TableActions  : [{icon:'delete'}]
   
  return (
    <>
       <div className='eduall-table-box'>
       {
           props.TableBody && props.TableTitle ?(
            props.TableHead && props.TableOptions ? ( 
                 <MUIDataTable
                    title={props.TableTitle}
                    data={props.TableBody}
                    columns={props.TableHead}
                    options={props.TableOptions}
                    actions={Actions}
                    onSelectionChange={(rows)=>console.log(rows)}
               /> 
            ):''
           ): ''
       }
    </div> 
    </>
  )
}

export default Table



