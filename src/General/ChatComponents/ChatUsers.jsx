import React from 'react'
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import { BiCheck, BiPlusCircle, BiSearch } from 'react-icons/bi';
import { HiOutlineDocumentDuplicate} from "react-icons/hi";

function ChatUsers(props){
  return (
    <div className='chat-users-area'>
        <div className="top-chat-users">
            <div className="block-title">
                <div><h1>Trabalho de fisica</h1></div> 
            </div>
           <div className="ed-space">
            <div><span>entertenimento</span></div>
            <div className="total-users">
                <div className="count">32+</div>
                <AvatarGroup max={3} sx={{ '& .MuiAvatar-root': { width: 35, height: 35, fontSize: 13 }}}>
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                    <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                    <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                    <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
                    <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
                </AvatarGroup>
                <div className="options-dropdown">
                       
                </div>
            </div> 
           </div>
        </div>
        <div className="search-form">
            <form>
                <input type="text" placeholder='pesquisar...' className="form-control" />
                 <button><BiSearch/></button>
            </form>
        </div>
        <ul className="user-list">
            <li className='active'>
              <div className="user-info"> 
               <div className="avatar-box">
                    <div className="status"></div>
                    <Avatar alt="Trevor Henderson" sx={{width:60,height:60}}  src="/static/images/avatar/5.jpg" />
                </div> 
                <div className="block-info">
                     <div className="bx">
                        <div> <h2>Laney Gray</h2></div>
                       <div className="time"><small>5:17 PM</small></div> 
                     </div>
                    <div className="ed-space">
                        <div><span className="msg">Nova tarefa atribuida</span></div>
                        <div className="pr"><div className="icon"><HiOutlineDocumentDuplicate/> Nova tarefa</div> </div>
                    </div>
                </div>
               </div> 
            </li>  
            <li className='active'>
              <div className="user-info"> 
               <div className="avatar-box">
                    <div className="status"></div>
                    <Avatar alt="Trevor Henderson" sx={{width:60,height:60}}  src="/static/images/avatar/5.jpg" />
                </div> 
                <div className="block-info">
                     <div className="bx">
                        <div> <h2>Laney Gray</h2></div>
                       <div className="time"><small>5:17 PM</small></div> 
                     </div>
                    <div className="ed-space">
                        <div><span className="msg">Nova tarefa atribuida</span></div>
                        <div className="pr"><div className="icon"><HiOutlineDocumentDuplicate/> Nova tarefa</div> </div>
                    </div>
                </div>
               </div> 
            </li>  
            <li>
              <div className="user-info"> 
               <div className="avatar-box">
                    <div className="status"></div>
                    <Avatar alt="Trevor Henderson" sx={{width:60,height:60}}  src="/static/images/avatar/5.jpg" />
                </div> 
                <div className="block-info">
                     <div className="bx">
                        <div> <h2>Laney Gray</h2></div>
                       <div className="time"><small>5:17 PM</small></div> 
                     </div>
                    <div className="ed-space">
                        <div><span className="msg">Nova tarefa atribuida</span></div>
                    </div>
                </div>
               </div> 
            </li>  
            <li className='active'>
              <div className="user-info"> 
               <div className="avatar-box">
                    <div className="status"></div>
                    <Avatar alt="Trevor Henderson" sx={{width:60,height:60}}  src="/static/images/avatar/5.jpg" />
                </div> 
                <div className="block-info">
                     <div className="bx">
                        <div> <h2>Laney Gray</h2></div>
                       <div className="time"><small>5:17 PM</small></div> 
                     </div>
                    <div className="ed-space">
                        <div><span className="msg">Nova tarefa atribuida</span></div>
                        <div className="pr"><div className="icon"><HiOutlineDocumentDuplicate/> Nova tarefa</div> </div>
                    </div>
                </div>
               </div> 
            </li>  
            <div className="ed-center"><div className="loading">Carregando mais ...</div></div>
        </ul> 
        <section className='chat-user-projects'>
            <h1 className="title">Projetos de equipe</h1>
            <hr />
             <ul>
               {[1,2].map((project, index)=>{
                   return(
                    <li className='pr-item' key={index}>
                    <div className="ed-title-section">
                       <div className="ed-flex">
                           <div className="count">{index+1}</div> 
                           <div className="ed-block">
                               <h3>sample project name</h3> 
                                <small className="date">data de finalização - 20 de 2022</small>  
                           </div>  
                       </div>  
                       <div className="add-icon">
                          <BiPlusCircle />
                       </div>
                    </div>  
                    <div className="block-total-section">
                        <div className="avatars">
                         <AvatarGroup max={3} sx={{ '& .MuiAvatar-root': { width: 35, height: 35, fontSize: 13 }}}>
                              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                              <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                              <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                              <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
                              <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
                          </AvatarGroup>
                        </div>
                        <div><strong>120 tarefas / 10 concluidas</strong></div>
                    </div>
                    <ol className="latest-tasks">
                         <li className="ed-space">
                            <div className="ed-flex"><BiCheck />1 Tarefa - Dez 2020</div>
                            <div className="ed-flex status">concluido</div>
                         </li>
                         <li className="ed-space">
                            <div className="ed-flex"><BiCheck />1 Tarefa - Nov 2020</div>
                            <div className="ed-flex status">concluido</div>
                         </li>
                    </ol>
                    <ol className="files-section">
                        <li className="img"><img src="https://i.scdn.co/image/b11d5fd01fa04f4af39bf1f2879acc0034d34fd9" alt="" /></li>
                        <li className="img"><img src="https://i.scdn.co/image/b11d5fd01fa04f4af39bf1f2879acc0034d34fd9" alt="" /></li>
                        <li className="img"><img src="https://i.scdn.co/image/b11d5fd01fa04f4af39bf1f2879acc0034d34fd9" alt="" /></li>
                        <li className="doc">DOC</li>
                        <li className="more">+23</li>
                    </ol>
                </li>)
               })}
             </ul>
        </section>
    </div>
  )
}

export default ChatUsers
