
import { Star } from '@material-ui/icons'
import { StarHalf } from '@mui/icons-material'
import { Avatar } from '@mui/material'
import React ,{useState} from 'react'
import { Link } from 'react-router-dom'
import Pagination from '@mui/material/Pagination';
   

function UserBooksGrid() {
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
    ])
  return (
     <>
     <div className='ed-wrap library-books-grid'>
        {
            Books.map((item , index)=>{
                 return(
                    <Link to=''>
                    <div className="book-card">
                        <img loading="lazy" role="presentation" src={item.image} alt="" />
                        <h3>Harry pottere a pedra filosofal</h3> 
                        <div className="ed-flex mt-2 classification">
                            <Star/><Star/><Star/><Star/><StarHalf/>
                            <span>4.5</span>
                        </div>
                        <h4 className="text-main-light">13<small>$</small> </h4>
                    </div>
                </Link>
                 )
            })
        }
    </div>
    <div className="ed-space">
        <div></div>
        <div className='mr-2'>
           <Pagination color='primary' count={10} />
        </div>
    </div>
     </>
  )
}

 

export default UserBooksGrid