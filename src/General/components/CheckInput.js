

export default function CheckInput(e){
    if(e === "" || e === " "){
        return null
    }else if(e === null || e === undefined){
       return null
    } 
    return e;
  }
