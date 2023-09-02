import React from 'react'

function ReduceTextLength(props) {

  const Reduce = (e)=>{
    return (e.length <= props.length ? e : e.substring(0, props.length)+  (props.nodot ? "" : " ..."));
  }

  return (
    <>{Reduce(props.text)}</>
  )
}

export default ReduceTextLength