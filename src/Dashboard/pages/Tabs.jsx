import React , {useState} from 'react'

function Tabs() {

const [ToggleState, setToggleState] = useState(1);
const toggleTab = (index)=>{
   setToggleState(index);
}




/** 923168840 */

  return (
    <div>
        <div className="container-tabs">
            <div className="tab-header">
                <li className={ToggleState === 1 ? "active" : ''}  onClick={()=> toggleTab(1)}>iNFO 1</li>
                <li className={ToggleState === 2 ? "active" : ''}  onClick={()=> toggleTab(2)}>iNFO 2</li>
                <li className={ToggleState === 3 ? "active" : ''}  onClick={()=> toggleTab(3)}>iNFO 3</li>
            </div>
            <div className="tab-body">
                <aside className={ToggleState === 1 ? "active" : ''}>
                    <h2>1</h2>
                </aside>
                <aside className={ToggleState === 2 ? "active" : ''}>
                    <h2>2</h2>
                </aside>
                <aside className={ToggleState === 3 ? "active" : ''}>
                    <h2>3</h2>
                </aside>
            </div>
        </div>
    </div>
  )
}

export default Tabs