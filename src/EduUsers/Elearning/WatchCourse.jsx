import React from 'react'
import ElearningNavbar from './Components/ElearningNavbar'
import { styled } from 'styled-components'
import ContentPlaylist from './Components/ContentPlaylist';
import PlayerContainer from './Components/PlayerContainer';

function WatchCourse() {
  document.title = "Assistir - "
  return (
    <div>
        <ElearningNavbar/>
        <Container>
            <ContentPlaylist/>
               <div className="course-content-area">
                    <PlayerContainer/>
                    <div className="course-content-area-tabs">
                      <br /><br /><br />
                       {[1,2,3,4,5,6,7,7,9,10,1,1,1,1,1,1,1,1,1,1,1].map((item)=>{
                          return  <p> 
                            <br />
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus odit quod fuga amet? Vel 
                                debitis mollitia, veniam, distinctio reiciendis eveniet similique cupiditate, odio ducimus 
                                quo aspernatur suscipit veritatis sed. Maiores sed dignissimos ex quos, voluptates animi ipsam
                                 earum amet eligendi velit cupiditate praesentium, minus iure eos saepe debitis rerum iusto.
                                 <br />
                          </p>
                       })
                       }
                    </div>
               </div>
        </Container>
    </div>
  )
}

const Container = styled.div`
    width:100%;
    display:flex;
    height:100vh; 
    background:var(--ed-background-color); 

    .course-content-area{
         width:100%; 
         max-height:100vh;
         overflow-y:auto;
    }
`;

export default WatchCourse
