import React from 'react'
import { styled } from 'styled-components'

function PlayerContainer() {
  return (
    <PlayerArea>
        <iframe src="https://www.youtube.com/embed/6LFjVC3cHjI" title="YouTube video player" frameborder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
    </PlayerArea>
  )
}

const PlayerArea = styled.div`
   background:var(--black);
   width:100%;
   min-height:86vh;
   max-height:86vh;
   padding-top:70px; 


      iframe{
          width:100%;
          height:100%;
          min-height:86vh;
          max-height:86vh;
      }
`;

export default PlayerContainer
