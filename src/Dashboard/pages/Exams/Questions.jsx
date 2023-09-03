import React from 'react'
import { Badge } from 'react-bootstrap';
import NewQuestion from '../../components/modal/NewQuestion'


const CurrentExamQuestion = [
    {
        Code: 1,
        Description : `O quebra-cabeça da Torre de Hanói foi inventado pelo matemático francês Edouard Lucas em 1883. 
        Ele foi inspirado por uma lenda que fala de um templo hindu onde o quebra-cabeça foi apresentado a jovens sacerdotes.
        No início dos tempos, os sacerdotes receberam três varas e uma pilha de 64 discos de ouro, cada disco um pouco menor
        do que o abaixo dele. A tarefa deles era transferir todos os 64 discos de um dos três pólos para outro, com duas
        restrições importantes. Eles só podiam mover um disco de cada vez e nunca poderiam colocar um disco maior em 
        cima de um menor. Os sacerdotes trabalhavam com muita eficiência, dia e noite, movendo um disco a cada segundo. 
        Quando eles terminassem seu trabalho, dizia a lenda, o templo se transformaria em pó e o mundo desapareceria.`,
        Groups:[
            [{
                title: "Responda as seguintes questões :",
                questionType: "TF",
                qestions:[
                    "Mova uma torre de altura 1 para um poste intermediário, usando o poste final.",
                    "Mova o disco restante para o pólo final.",
                    "Mova a torre de altura-1 do poste intermediário para o poste final usando o poste original."
                ],
                images:[
                    "https://wl-brightside.cf.tsp.li/resize/728x/jpg/1a7/33c/4e423a5d4993879bd5234b364e.jpg"
                ]
            }],
            [{
                title: "Responda as seguintes questões :",
                questionType: "FILL",
                qestions:[
                    "Mova uma torre de altura 1 para um poste intermediário, usando o poste final.",
                    "Mova o disco restante para o pólo final.",
                    "Mova a torre de altura-1 do poste intermediário para o poste final usando o poste original."
                ],
                images:[]
            }]
        ]
    },
    {
        Code: 2,
        Description : `O quebra-cabeça da Torre de Hanói foi inventado pelo matemático francês Edouard Lucas em 1883. 
        Ele foi inspirado por uma lenda que fala de um templo hindu onde o quebra-cabeça foi apresentado a jovens sacerdotes.
        No início dos tempos, os sacerdotes receberam três varas e uma pilha de 64 discos de ouro, cada disco um pouco menor
        do que o abaixo dele. A tarefa deles era transferir todos os 64 discos de um dos três pólos para outro, com duas
        restrições importantes. Eles só podiam mover um disco de cada vez e nunca poderiam colocar um disco maior em 
        cima de um menor. Os sacerdotes trabalhavam com muita eficiência, dia e noite, movendo um disco a cada segundo. 
        Quando eles terminassem seu trabalho, dizia a lenda, o templo se transformaria em pó e o mundo desapareceria.`,
        Groups:[
            [{
                title: "Responda as seguintes questões :",
                questionType: "TF",
                qestions:[
                    "Mova uma torre de altura 1 para um poste intermediário, usando o poste final.",
                    "Mova o disco restante para o pólo final.",
                    "Mova a torre de altura-1 do poste intermediário para o poste final usando o poste original."
                ],
                images:[
                    "https://www.math-only-math.com/images/partial-fraction.jpg"
                ]
            }],
            [{
                title: "Responda as seguintes questões :",
                questionType: "FILL",
                qestions:[
                    "Mova uma torre de altura 1 para um poste intermediário, usando o poste final.",
                    "Mova o disco restante para o pólo final.",
                    "Mova a torre de altura-1 do poste intermediário para o poste final usando o poste original."
                ],
                images:[]
            }]
        ]
    }
];

function Questions() {
const outuput = "";
for (let i = 0; i < CurrentExamQuestion.length; i++) {
     
}
console.table(CurrentExamQuestion)




  return ( 
     <div>
        <div className="ed-space">
            <div>
                <h2 className="title">Adicionar questões</h2>
            </div>
            <div className="ed-flex">
                  <Badge className='bg-dark text-light mr-2'>123 questões</Badge>
                  <NewQuestion/>
            </div>
        </div>
        <div className="ed-quiz-questions">
            <div className="ed-quiz-question-list">
                {
                    CurrentExamQuestion.map((exam, index)=>(
                        <article key={index} className="qz-box-container qz-group">
                            <div class="ed-space mb-4 mt-4">
                            <div class="count"> {index+1} </div>
                                <div class="line"></div>
                                <div class="ed-flex">
                                    <button class="bg-info text-light mr-3 badge">Editar</button>
                                    <button class="bg-danger badge">Deletar</button>
                                </div>
                            </div>
                            <div className="qz-content">
                                <div className="custom-text">{exam.Description}</div>
                                <div className="qz-group-questions">
                                    {
                                        exam.Groups.map((group, groupIndex)=>(
                                            <div className="block">
                                                 <p>{group.title}</p> 
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </article>
                    ))
                }
            </div> 
        </div>
  </div> 
  )
}

export default Questions