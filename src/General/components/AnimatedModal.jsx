import React from 'react';
import {Animated} from 'react-animated-css'

function AnimatedModal(props){
  return (
     <Animated animationIn="bounceInLeft" animationOut="fadeOut" isVisible={true}>
         {props.content ? props.content : <></>}
     </Animated>
  )
}
export default AnimatedModal
