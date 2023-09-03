import { LocalPrintshopOutlined } from '@mui/icons-material';
import React from 'react'
import { Link } from 'react-router-dom';
const studentsList = [
    {
     Student_code: "#S2KLSOS",
     Student_name:'paulo mateus', 
     Student_picture: '../../Assets/images/avatars/kids/1.jpg',
     Student_class:'JSH8', 
     Student_course: 'Informatica', 
     Student_level: '12º',
     Student_mark: '15.7'
    }, 
    {
        Student_code: "#S2KLSOS",
        Student_name:'paulo mateus', 
        Student_picture: '../../Assets/images/avatars/kids/2.jpg',
        Student_class:'JSH8', 
        Student_course: 'Informatica', 
        Student_level: '12º',
        Student_mark: '15.7'
       },  
       {
        Student_code: "#S2KLSOS",
        Student_name:'paulo mateus', 
        Student_picture: '../../Assets/images/avatars/kids/3.jpg',
        Student_class:'JSH8', 
        Student_course: 'Informatica', 
        Student_level: '12º',
        Student_mark: '15.7'
       }, 
       {
        Student_code: "#S2KLSOS",
        Student_name:'paulo mateus', 
        Student_picture: '../../Assets/images/avatars/kids/4.jpg',
        Student_class:'JSH8', 
        Student_course: 'Informatica', 
        Student_level: '12º',
        Student_mark: '15.7'
       },  
       {
        Student_code: "#S2KLSOS",
        Student_name:'paulo mateus', 
        Student_picture: '../../Assets/images/avatars/kids/5.jpg',
        Student_class:'JSH8', 
        Student_course: 'Informatica', 
        Student_level: '12º',
        Student_mark: '15.7'
       }, 
       {
        Student_code: "#S2KLSOS",
        Student_name:'paulo mateus', 
        Student_picture: '../../Assets/images/avatars/kids/6.png',
        Student_class:'JSH8', 
        Student_course: 'Informatica', 
        Student_level: '12º',
        Student_mark: '15.7'
       }, 
       {
        Student_code: "#S2KLSOS",
        Student_name:'paulo mateus', 
        Student_picture: '../../Assets/images/avatars/kids/7.jpg',
        Student_class:'JSH8', 
        Student_course: 'Informatica', 
        Student_level: '12º',
        Student_mark: '15.7'
       }, 
       {
        Student_code: "#S2KLSOS",
        Student_name:'paulo mateus', 
        Student_picture: '../../Assets/images/avatars/kids/8.jpg',
        Student_class:'JSH8', 
        Student_course: 'Informatica', 
        Student_level: '12º',
        Student_mark: '15.7'
       }, 
  ];

function HonorBoardGrid() {
  return (
    <div className="honor-board-list">
       {
         studentsList.map((item, index)=>(
            <article className="honor-board-box" key={index}>
            <div className="box">
                <div className="center">
                   <img loading="lazy" role="presentation" src={item.Student_picture} alt={item.Student_name} />
                </div>
                <div className="block"> 
                    <Link to={'/StudentInfo?student_code='+item.Student_code}>
                          <h2>Name : <span>{item.Student_name} </span></h2>
                    </Link> 
                    <h2>Turma : <span>{item.Student_class} </span></h2>
                    <h2>Curso : <span>{item.Student_course} </span></h2>
                    <h2>Nivel academico  : <span>{item.Student_level} </span></h2>
                    <div className="mark bg-light text-success">
                        <h1>{item.Student_mark}</h1>
                    </div> 
                </div>
                <div className="over">
                    <Link to={"/PrintHonorBoard?student_code="+item.Student_code}><LocalPrintshopOutlined/></Link>
                </div>
            </div>
        </article>
         ))
       }
    </div>
  )
}

export default HonorBoardGrid