import React from 'react'
const recipes = [
   {
    id:1,
    title:"Banana juice",
    image:'',
    description:["1","2", "3", "4"]
   }
]


function Mapa() {
  return (
    <div>
        {recipes.map((recipe)=>{
            return <div key={recipe.id}>
                <h1>{recipe.title}</h1>
                {recipe.description.map((desc, index)=>{
                    return <span key={index}>{desc}</span>
                })}
            </div>
        })}
    </div>
  )
}

export default Mapa