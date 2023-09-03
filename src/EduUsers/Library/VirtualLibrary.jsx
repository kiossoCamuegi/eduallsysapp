
import React, {useState} from 'react' 
import styled from 'styled-components'
import Slider from "react-slick";
import { Form } from 'react-bootstrap'; 
import { EmojiEmotionsOutlined, Search } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { EmojiEmotions, EmojiPeopleOutlined } from '@material-ui/icons';
import { Star } from '@material-ui/icons'
import { StarHalf } from '@mui/icons-material'
import { Avatar, Checkbox, FormControlLabel, FormGroup } from '@mui/material'
import UserBooksGrid from './Components/UserBooksGrid';
import UserNavbar from '../Components/UserNavbar';

const Images = [ 
        'https://assets.penguinrandomhouse.com/wp-content/uploads/2018/03/05105825/1200x628_instagrammable.jpg',    
];

function VirtualLibrary({userdata}) {
    const [Books, SetBooks] =  useState([
        {image: 'https://m.media-amazon.com/images/I/81ibfYk4qmL.jpg'},
        {image: 'https://www.designforwriters.com/wp-content/uploads/2017/10/design-for-writers-book-cover-tf-2-a-million-to-one.jpg'},
        {image: 'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/contemporary-fiction-night-time-book-cover-design-template-1be47835c3058eb42211574e0c4ed8bf_screen.jpg?ts=1637012564'},
        {image: 'https://cdn.vox-cdn.com/thumbor/p-gGrwlaU4rLikEAgYhupMUhIJc=/0x0:1650x2475/1200x0/filters:focal(0x0:1650x2475):no_upscale()/cdn.vox-cdn.com/uploads/chorus_asset/file/13757614/817BsplxI9L.jpg'},
        {image: 'https://cdn2.penguin.com.au/covers/original/9780718193911.jpg'},
        {image: 'https://images.template.net/2905/Simple-Children-s-Story-Book-Cover-Template-2x.jpg'},
        {image: 'https://begindot.com/wp-content/uploads/2018/10/Story-Book-Cover-Template-800x1022.jpg'},
        {image: 'https://cdna.artstation.com/p/assets/images/images/025/594/398/large/jenny-eickbush-polar-night-cover.jpg?1586292502'},
        {image: 'https://news.harvard.edu/wp-content/uploads/2022/07/20220727_books_invisibleman_2500-655x1024.jpg'},
        {image: 'https://sdg-migration-met.s3.amazonaws.com/wp-content/uploads/2021/07/12213629/165523a5bad8aa3df160b9bbf37d19f5-Wade2BGreenbergThe2BJungle8057.jpg'},
        {image:'https://lithub.com/wp-content/uploads/sites/3/2019/08/the-swallows-673x1024.jpg'},
        {image:'https://d4804za1f1gw.cloudfront.net/wp-content/uploads/sites/5/2021/11/97801437748531.jpg'}
    ])

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
      };

 


  return (
    <div>
        <UserNavbar data={userdata} />
        <Container>
            <div className="filter-container">
                <FormGroup>
                    <FormControlLabel control={<Checkbox defaultChecked />} label="Label" />
                    <FormControlLabel disabled control={<Checkbox />} label="Disabled" />
                </FormGroup>
                <FormGroup>
                    <FormControlLabel control={<Checkbox defaultChecked />} label="Label" />
                    <FormControlLabel disabled control={<Checkbox />} label="Disabled" />
                </FormGroup>
                <FormGroup>
                    <FormControlLabel control={<Checkbox defaultChecked />} label="Label" />
                    <FormControlLabel disabled control={<Checkbox />} label="Disabled" />
                </FormGroup>
                <FormGroup>
                    <FormControlLabel control={<Checkbox defaultChecked />} label="Label" />
                    <FormControlLabel disabled control={<Checkbox />} label="Disabled" />
                </FormGroup>
                <FormGroup>
                    <FormControlLabel control={<Checkbox defaultChecked />} label="Label" />
                    <FormControlLabel disabled control={<Checkbox />} label="Disabled" />
                </FormGroup>
                <FormGroup>
                    <FormControlLabel control={<Checkbox defaultChecked />} label="Label" />
                    <FormControlLabel disabled control={<Checkbox />} label="Disabled" />
                </FormGroup>
                <FormGroup>
                    <FormControlLabel control={<Checkbox defaultChecked />} label="Label" />
                    <FormControlLabel disabled control={<Checkbox />} label="Disabled" />
                </FormGroup>
                <FormGroup>
                    <FormControlLabel control={<Checkbox defaultChecked />} label="Label" />
                    <FormControlLabel disabled control={<Checkbox />} label="Disabled" />
                </FormGroup>
                <FormGroup>
                    <FormControlLabel control={<Checkbox defaultChecked />} label="Label" />
                    <FormControlLabel disabled control={<Checkbox />} label="Disabled" />
                </FormGroup>
                <FormGroup>
                    <FormControlLabel control={<Checkbox defaultChecked />} label="Label" />
                    <FormControlLabel disabled control={<Checkbox />} label="Disabled" />
                </FormGroup>
            </div>
            <div className="books-container">
                <Advertisement>
                    <div className="box">
                      <Slider {...settings}>
                           <Link>
                           <div className="book-slider">
                                <img loading="lazy" role="presentation" src={Images[0]} alt="" />
                                <div className="sponsored">Patrocinado</div>
                            </div> 
                           </Link>
                        </Slider>     
                    </div>    
                </Advertisement>
                 <UserBooksGrid/>
            </div>
        </Container> 
        <BooksList>

        </BooksList>
    </div>
  )
}

const Container = styled.div`
    display:flex;
    width:100%;
    padding:20px;  
    margin-top:100px;

    .filter-container{
        min-height:70vh;
        height:min-content;
        min-width:300px; 
        padding-right:20px;
    }


    .books-container{
         width:100%;
         display:block;
    }





 .library-books-grid{
        width:100%;
        margin:20px 0px;

        .book-card{
            width:220px; 
            min-height:430px;
            padding:10px;
            border-radius:6px; 
            margin:10px; 
            background-color: var(--ed-white);
            background-clip: border-box;  
            box-shadow:var(--ed-shadow-df);
            overflow: hidden; 
            list-style: none !important;

            img{
                border-radius:4px;
                height:260px;
                width:100%; 
                object-fit: fill;
            }
        
            
           h3{
                font-size:16px;
                margin-top:10px;
                line-height:25px;
                color:var(--ed-dark);
            }
            
           h5{
               font-size:15px; 
            }
            
            
           h5 span{
               color:var(--ed-green); 
             }
            
         svg{
                width:20px;
                height:20px;
                margin-right:7px;
                fill:var(--ed-yellow);
            }
    
        }
        
        
       
        



    }
    
 



`;

const Advertisement = styled.div`
       width:95%;
       height:290px;
       border-radius:20px; 
       border:1px solid var(--ed-silver-light);
       overflow:hidden;
       margin-bottom:20px;
       position:relative;

         .sponsored{
            position:absolute;
            top:20px;
            right:20px;
            padding:4px 20px;
            max-width:200px;
            font-size:16px;
            color:var(--ed-white);
            background:var(--ed-trp-4);
            border-radius:4px;
            box-shadow:var(--ed-shadow-df);
         }
`;



const BooksList = styled.div`
   
`;



export default VirtualLibrary