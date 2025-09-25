import React from 'react';
import { Link, Route, Routes } from 'react-router-dom'
console.log('#app.tsx');

//import Home from './client/Home';
import About from './client/about';
import Sort from './client/Sort';

function App() {
  return (
    <Routes>
      <Route path="/about" element={<About />} />
      <Route path="/" element={<Sort />} />
      
    </Routes>
  );
}
// <Route path='/' element={<Home />} />

export default App;
