import React from 'react'
import { Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import PublicationModal from './PublicationModal'
import Hoot from '../../General/components/Hoot'
import { Avatar } from '@mui/material'
import {ImageOutlined , YouTube} from '@material-ui/icons';
import { styled } from 'styled-components'

function PostForm({userdata}) {
 
    let lettername = userdata.user_Information.ed_user_account_name.split(' ')[0].split('')[0].toUpperCase()+
    userdata.user_Information.ed_user_account_name.split(' ')[userdata.user_Information.ed_user_account_name.split(' ').length -1].split('')[0].toUpperCase()
  


  return (
    <div className="post-form">
    <Form>
      <div className="ed-flex">
      <Link to="/profile">
      <Avatar src={Hoot()+userdata.user_Information.ed_user_account_picture}  
         sx={{width:40, height:40, bgcolor:userdata.user_Information.ed_user_account_detAvatarColor}}>
             {lettername}
         </Avatar>
      </Link>
        <PublicationModal picture={Hoot()+userdata.user_Information.ed_user_account_picture} toggle_btn={ <div className="form-post-box">
          <span>Partilhe os seus pensamentos ...</span>
      </div>
      } />
  </div>
     <Container>
        <section>
        <div className="ed-block">
          <div className='ed-flex'>
            <label htmlFor="post-images">
              <ImageOutlined style={{fill:'var(--ed-orange-light)'}} /> imagens
            </label>
            <input type="file" multiple id='post-images' hidden />
            <label htmlFor="post-video">
              <YouTube style={{fill:'var(--ed-red-light)'}} /> YouTube video
            </label>
            <input type="url" id='post-video' hidden />
          </div>
        </div>
        </section>
     </Container>
    </Form>
  </div> 
  )
}


const Container = styled.div`
    display:block;
`;

export default PostForm
