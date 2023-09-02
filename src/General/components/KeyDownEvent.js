

export default  function  KeyDownEvent(props){
    let i = 0;
    const tagName = document.activeElement.tagName.toLowerCase();
    document.addEventListener("keydown",(e)=>{ 
        if(tagName === "input" || tagName === "textarea" || tagName === "select") return false;
         props(e.key, i++) 
    });
}