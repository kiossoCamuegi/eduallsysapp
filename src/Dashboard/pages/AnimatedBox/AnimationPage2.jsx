
import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import AnimationPage from '../../../General/AnimationPage';

function AnimationPage2() {
  return (
     <Container>
     <AnimationPage> 
           <h1>Ola mundo 2</h1>
           <p>
                Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC,
                making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more 
                obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, 
                discovered the undoubtable source.   
            </p><br />
           <div className="ed-flex">
               <Link to='/page1'><button className="btn bg-black">click here to go to page 1</button></Link>
           </div> 
     </AnimationPage>
     </Container>
  )
}

const Container = styled.div`
    height:100vh;
    width:100%;
    padding:20px;
    display:flex;
    align-items:center;
    justify-content:center;
    color:var(--ed-white);
    flex-direction:column;
    background:var(--ed-orange);
    text-align:center;
    overflow:hidden;

    p{
        max-width:600px;
    }
`;


export default AnimationPage2