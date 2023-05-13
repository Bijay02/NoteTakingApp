import React from 'react';
import Nav from './notes/Nav';
import Home from './notes/Home';
import CreateNote from './notes/CreateNote';
import EditNote from './notes/EditNote';
import {BrowserRouter as Router,Routes, Route} from 'react-router-dom';

export const Notes = ({setIsLogin}) => {
  return ( 
    <Router>
    <div className='notes-page'>
        <Nav setIsLogin={setIsLogin} />
        <section>
        <Routes>
        
            <Route path='/' Component={Home} />
            <Route path='/create' Component={CreateNote} />
            <Route path='/edit/:id' Component={EditNote} />
        
        </Routes>
        </section>
    </div>
    </Router>
  )
}
