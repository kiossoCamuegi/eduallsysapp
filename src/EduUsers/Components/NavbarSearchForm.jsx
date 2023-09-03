import { Search } from '@material-ui/icons'
import React from 'react'
import {Form } from 'react-bootstrap'
import styled from 'styled-components'

function NavbarSearchForm() {
  return (
    <Container>
         <Form className='ml-2'>
            <Search/>
            <Form.Control placeholder='Encomtre maravilhas ...' />
        </Form>
    </Container>
  )
}

const Container = styled.div`
    form{
        display:flex;
        align-items:center;
        border-radius:6px;
        height:45px;
        min-width:200px;
        border:1px solid red;
        padding:4px 10px;
        background:var(--ed-background-color);  
        border:1px solid var(--ed-silver-light);

        input{
            background:var(--ed-background-color);  
            border:0px solid transparent !important;

            &:hover,
            &:focus{
                box-shadow: none !important;
                background: transparent !important;
                border: none !important;
            }
        }
    }
`;

export default NavbarSearchForm
