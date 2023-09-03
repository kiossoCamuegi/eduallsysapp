function ReduceTextLength(string, length) { 
   if (string.length <= length) {
      return string
   } else {
    return (string.substring(0, length) + " ...");
   }
}
export default ReduceTextLength