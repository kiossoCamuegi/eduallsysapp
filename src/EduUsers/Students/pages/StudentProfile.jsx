import React from 'react'
import NavbarStudent from '../Components/NavbarStudent'
import styled from 'styled-components'

function StudentProfile() {
  return (
    <div>
       <NavbarStudent/>
        <StudentProfileBox>

        </StudentProfileBox>
    </div>
  )
}

const StudentProfileBox = styled.section`
    min-height:40vh;
    background:var(--ed-dark);
    padding:20px;
    padding-top:80px;
`;


export default StudentProfile