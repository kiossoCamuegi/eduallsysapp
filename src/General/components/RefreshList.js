  
export default function RefreshList(e){
    let btn = document.querySelectorAll(".el-refresh-list");
    for (let i = 0; i < btn.length; i++) {
        btn[i].click();
    } 
    if(document.querySelectorAll(e).length === 1){
         document.querySelector(e).click(); 
    }
}