import React from 'react';
//import { Route, Routes } from 'react-router';
import { Link, Route, Routes } from 'react-router-dom'
console.log('#app.tsx');

import Home from './client/Home';
import About from './client/about';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path="/about" element={<About />} />
      
    </Routes>
  );
}

export default App;
