import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'

const Update = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const bookId = location.pathname.split("/")[2];
    const[newBook, setNewBook] = useState({
        title: "",
        desc: "",
        price: null,
        cover: "",
    })
    const [book, setBook] = useState([])
    useEffect(() =>{
      const fetchBook = async ()=>{
          try {
              const res = await axios.get("http://localhost:8080/books/"+bookId)
              setBook(res.data)
          } catch (error) {
              console.log(error)
          }
      }
      fetchBook()
    }, [bookId])
    const handleChange = (e) => {
        setNewBook((prev)=>({...prev, [e.target.name]: e.target.value}))
    }

    const handleClick = async (e) => {
        e.preventDefault();
    
        try {
          await axios.put(`http://localhost:8080/books/${bookId}`, newBook);
          navigate("/");
        } catch (err) {
          console.log(err);
        }
      };
    
  return (
    <div className='form'>
        <h1>Update book</h1>
        <input type="text" placeholder={book.title} onChange={handleChange} name="title" />
        <input type="text" placeholder={book.desc} onChange={handleChange} name="desc" />
        <input type="number" placeholder={book.price} onChange={handleChange} name="price" />
        <input type="text" placeholder={book.cover} onChange={handleChange} name="cover" />
        <button onClick={handleClick}>Update</button>
        <Link to="/">See all books</Link>
    </div>
  )
}

export default Update
 