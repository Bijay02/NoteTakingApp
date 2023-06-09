import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import {format} from 'timeago.js';
import axios from 'axios';

const Home = () => {
    const [notes, setNotes] = useState([])
    const[token, setToken] = useState('');

    const getNotes = async(token) =>{
        const res= await axios.get('/api/notes',{
            headers:{Authorization: token}
        })
        console.log(res.data)
        setNotes(res.data)
    }

    useEffect(()=>{
        const token = localStorage.getItem('tokenStore')
        setToken(token)
        if(token){
            getNotes(token)
        }
    },[])

    const deleteNote = async(id)=>{
        try{
            if(token){
                await axios.delete(`/api/notes/${id}`,{
                    headers:{Authorization: token}
                })
                getNotes(token)
            }
        }catch(error){
            window.location.herf ='/'
        }
    }
  return (
    <div className='note-wrapper'>
        {
            notes.map(note =>(
                <div className="card" key={note._id}>
                <h4 title={note.title}>{note.title}</h4>
                <div className="text-wrapper">
                <p>{note.content}</p>
                </div>

                <div className="date">{format(note.date)}</div>
                <div className="card-footer">
                {note.name}
                <Link to={`edit/${note._id}`}>Edit</Link>
                </div>
                <button className='delete' onClick={()=>deleteNote(note._id)}>X</button>
                </div>
            ))
        }
       
    </div>
  )
}

export default Home