export default function FloorNumber(e){
    const values = e.toString();
    let result = 0;
    let DecimalValue = null;
    if(values.split(".").length > 1){
         DecimalValue = values.split(".")[1].toString();
         if(DecimalValue.split("").length > 1){ 
             result =  ((DecimalValue.split("")[0]*1) >= 6) ? ((values.split(".")[0]*1)+1) : (values.split(".")[0]*1)
         }else{
          result =  ((DecimalValue*1 >= 6) ? ((values.split(".")[0]*1)+1) : (values.split(".")[0]*1))
         }
    }else{
     result = values*1
    }
   return result;
}