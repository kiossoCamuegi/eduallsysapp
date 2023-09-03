import React from 'react'
import Table from './Table'

const TaskHead = [
    'Nº',
    'Titulo',
    'Prazo',
    'Emição',
    'Nivel'
];

const TaskBody = [
    ['1','Controlar prova de biologia', '15 de Maio', '12 de Maio', 'Urgente'],
    ['2','Controlar prova de biologia', '15 de Maio', '12 de Maio', 'Media'],
    ['3','Controlar prova de biologia', '15 de Maio', '12 de Maio', 'Normal'],
    ['4','Controlar prova de biologia', '15 de Maio', '12 de Maio', 'Urgente'],
    ['5','Controlar prova de biologia', '15 de Maio', '12 de Maio', 'Media'],
    ['6','Controlar prova de biologia', '15 de Maio', '12 de Maio', 'Urgente']
];

const TaskOptions = {
   filterType : 'checkbox' 
}

function TodayTask() {
  return (
   <Table
       TableBody={TaskBody}
       TableHead={TaskHead}
       TableOptions={TaskOptions}
       TableTitle = 'Tarefas do dia'
   />
  )
}

export default TodayTask