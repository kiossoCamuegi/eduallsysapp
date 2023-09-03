import React from 'react'
import { Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function SetupCompany() {
  return (
    <div className="setup-company"> 
        <div className="box"> 
        <h2>Configure a sua instituição</h2>
           <div className="inputs-box">
              <Form> 
                 <Form.Group>   
                    <div className="wrapper-box">
                     <div className="input-flex">
                           <Form.Control  type="text"   placeholder="Nome da instituição" required  />  
                      </div>
                     <div className="input-block"> 
                             <Form.Control  type="text"    placeholder="NIF"  /> 
                         </div> 
                         <div className="input-block"> 
                             <Form.Select  Select>
                                  <option selected disabled>Tipo de instituição</option>
                                  <option value="yearly">Anual</option>
                                  <option value="bymonth">Por mês</option>
                                  <option value="halfyear">Metade do ano</option>
                                  <option value="monthly">Mensalmente</option> 
                            </Form.Select> 
                       </div> 
                       <div className="input-block"> 
                             <Form.Control  type="text"   placeholder=""  /> 
                         </div> 
                         <div className="input-block"> 
                             <Form.Select  Select>
                                  <option value="yearly">Anual</option>
                                  <option value="bymonth">Por mês</option>
                                  <option value="halfyear">Metade do ano</option>
                                  <option value="monthly">Mensalmente</option> 
                            </Form.Select> 
                       </div> 
                       <div className="input-flex">
                           <Form.Control  type="text"   placeholder="Nome da instituição" required  />  
                      </div>
                     <div className="input-block"> 
                             <Form.Control  type="text"    placeholder="NIF"  /> 
                         </div> 
                         <div className="input-block"> 
                             <Form.Select  Select>
                                  <option selected disabled>Tipo de instituição</option>
                                  <option value="yearly">Anual</option>
                                  <option value="bymonth">Por mês</option>
                                  <option value="halfyear">Metade do ano</option>
                                  <option value="monthly">Mensalmente</option> 
                            </Form.Select> 
                       </div> 
                       <div className="input-block"> 
                             <Form.Control  type="text"   placeholder=""  /> 
                         </div> 
                         <div className="input-block"> 
                             <Form.Select  Select>
                                  <option value="yearly">Anual</option>
                                  <option value="bymonth">Por mês</option>
                                  <option value="halfyear">Metade do ano</option>
                                  <option value="monthly">Mensalmente</option> 
                            </Form.Select> 
                       </div> 
                       <div className="input-flex">
                           <Form.Control  type="text"   placeholder="Nome da instituição" required  />  
                      </div>
                     <div className="input-block"> 
                             <Form.Control  type="text"    placeholder="NIF"  /> 
                         </div> 
                         <div className="input-block"> 
                             <Form.Select  Select>
                                  <option selected disabled>Tipo de instituição</option>
                                  <option value="yearly">Anual</option>
                                  <option value="bymonth">Por mês</option>
                                  <option value="halfyear">Metade do ano</option>
                                  <option value="monthly">Mensalmente</option> 
                            </Form.Select> 
                       </div> 
                       <div className="input-block"> 
                             <Form.Control  type="text"   placeholder=""  /> 
                         </div> 
                         <div className="input-block"> 
                             <Form.Select  Select>
                                  <option value="yearly">Anual</option>
                                  <option value="bymonth">Por mês</option>
                                  <option value="halfyear">Metade do ano</option>
                                  <option value="monthly">Mensalmente</option> 
                            </Form.Select> 
                       </div> 
                       <div className="input-flex">
                           <Form.Control  type="text"   placeholder="Nome da instituição" required  />  
                      </div>
                     <div className="input-block"> 
                             <Form.Control  type="text"    placeholder="NIF"  /> 
                         </div> 
                         <div className="input-block"> 
                             <Form.Select  Select>
                                  <option selected disabled>Tipo de instituição</option>
                                  <option value="yearly">Anual</option>
                                  <option value="bymonth">Por mês</option>
                                  <option value="halfyear">Metade do ano</option>
                                  <option value="monthly">Mensalmente</option> 
                            </Form.Select> 
                       </div> 
                       <div className="input-block"> 
                             <Form.Control  type="text"   placeholder=""  /> 
                         </div> 
                         <div className="input-block"> 
                             <Form.Select  Select>
                                  <option value="yearly">Anual</option>
                                  <option value="bymonth">Por mês</option>
                                  <option value="halfyear">Metade do ano</option>
                                  <option value="monthly">Mensalmente</option> 
                            </Form.Select> 
                       </div> 
                    </div> 
                  </Form.Group>   
               </Form>
            </div>
           <div className="end-buttons">
              <button className='btn bg-dark-light text-light'>Anterior</button>
              <Link to='/dashboard'><button className='bg-main btn text-light ml-2'>Proximo</button></Link>
           </div> 
        </div>
    </div>
  )
}

export default SetupCompany