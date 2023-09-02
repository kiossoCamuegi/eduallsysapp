
export default function KeyShortcut(x,y,z){
    const tagName = document.activeElement.tagName.toLowerCase();
    if(tagName === "input" || tagName === "textarea" || tagName === "select") return false;
    let status = false;

    let KeysFunctions = [
        {key:'a', use:""},
        {key:'b', use:""},
        {key:'c', use:""},
        {key:'d', use:""},
        {key:'e', use:""},
        {key:'f', use:""},
        {key:'g', use:""},
        {key:'h', use:""},
        {key:'i', use:""},
        {key:'j', use:""},
        {key:'k', use:""},
        {key:'l', use:""},
        {key:'m', use:""},
        {key:'n', use:""},
        {key:'o', use:""},
        {key:'p', use:"feepayments"},
        {key:'q', use:""},
        {key:'r', use:""},
        {key:'s', use:""},
        {key:'t', use:"themecolorpanel"},
        {key:'u', use:"userpanel"},
        {key:'v', use:""},
        {key:'w', use:""},
        {key:'x', use:""},
        {key:'y', use:""},
        {key:'z', use:""} 
    ];


    let KeysCombinations = [
        {key_1:'', key_2:'', use:''},
        {key_1:'', key_2:'', use:''},
        {key_1:'', key_2:'', use:''},
        {key_1:'', key_2:'', use:''},
        {key_1:'', key_2:'', use:''},
        {key_1:'', key_2:'', use:''},
        {key_1:'', key_2:'', use:''},
        {key_1:'', key_2:'', use:''},
        {key_1:'', key_2:'', use:''},
        {key_1:'', key_2:'', use:''},
        {key_1:'', key_2:'', use:''},
        {key_1:'', key_2:'', use:''},
        {key_1:'', key_2:'', use:''},
        {key_1:'', key_2:'', use:''},
        {key_1:'', key_2:'', use:''},
        {key_1:'', key_2:'', use:''},
    ];


    if(x !== null && y === null){
        for(let i = 0; i < KeysFunctions.length; i++){ 
             if (KeysFunctions[i].key.toLowerCase()  ===  x.toLowerCase()){ 
                  if (z.toLowerCase() === KeysFunctions[i].use.toLowerCase()){ 
                     status = true;
                  }else{
                   if(status !== true) status = false;
                  } 
             }else{
                if(status !== true) status = false;
             }
       }
    }else{
        if(status !== true) status = false;
    } 


   return status;
}