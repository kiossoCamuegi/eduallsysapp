import { useState } from 'react';
import ReactSimplyCarousel from 'react-simply-carousel';
import {FaAngleRight} from "react-icons/fa";

function SliderComponent(props) {
    const [activeSlideIndex, setActiveSlideIndex] = useState(0);


  return (
    <div>
      <ReactSimplyCarousel
        activeSlideIndex={activeSlideIndex}
        onRequestChange={setActiveSlideIndex}
        itemsToShow={3}
        itemsToScroll={3}
        forwardBtnProps={{
          //here you can also pass className, or any other button element attributes
          style: {
            alignSelf: 'center',
            background: 'var(--ed-white)',
            border: 'none',
            borderRadius: '50%',
            color: 'white',
            cursor: 'pointer',
            fontSize: '20px',
            height: 30,
            lineHeight: 1,
            textAlign: 'center', 
            marginTop:"6px",
            width:30,
          },
          children: <span className='text-main-light'><FaAngleRight/></span>,
        }}

        
        backwardBtnProps={{
          //here you can also pass className, or any other button element attributes
          style: {
            alignSelf: 'center',
            background: 'var(--ed-white)',
            border: 'none',
            display:"none",
            borderRadius: '50%', 
            cursor: 'pointer',
            fontSize: '20px',
            height: 30,
            lineHeight: 1,
            textAlign: 'center',
            width: 30,
            marginTop:"4px"
          },
          children: <span className='text-main-light'><FaAngleRight/></span>,
        }} 
        responsiveProps={[
          {
            itemsToShow:3,
            itemsToScroll:3,
            minWidth: 700,
          },
        ]}
        speed={400}>
           
         {props.children}

      </ReactSimplyCarousel>
    </div>
  )
}

export default SliderComponent