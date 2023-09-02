
export default  function CRcontent(e){
    let content =  document.querySelectorAll(e).length >= 1 ?  document.querySelectorAll(e)[0].innerHTML  : '';
    return content;
}
 