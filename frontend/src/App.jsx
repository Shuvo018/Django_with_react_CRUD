import { useState, useEffect } from 'react'
import './App.css'
import ShowBook from './components/ShowBook';
import AddBook from './components/AddBook';
import UpdateBook from './components/UpdateBook';
import { BrowserRouter as Router, Routes, Route } from "react-router";

function App() {
  
  return (
    <>
      <Router>
        <Routes>
          <Route path='' element={<ShowBook/>} />
          <Route path='/add' element={<AddBook/>} />
          <Route path='/update/:id' element={<UpdateBook/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
