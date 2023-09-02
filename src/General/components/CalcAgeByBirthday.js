
 
export default  function  CalcAgeByBirthday(e){
    let y = new Date().getFullYear()
    let age = y -  Math.floor(e.split("-")[0]);
    return age;
}
  