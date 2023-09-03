 import React from 'react'
import AuditoryTable from '../components/Table/AuditoryTable';
 
 function Auditory() {
  document.title = "Auditoria  -(visualize as ações feitas na sua instituição)"; 
  return (
     <div>
         <AuditoryTable/>
     </div>
   )
 }
 
 export default Auditory