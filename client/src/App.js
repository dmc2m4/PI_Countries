import './App.css';
import React from 'react';
import Cards from './components/Cards/Cards';
import { Routes, Route, useLocation } from 'react-router-dom';
import Introduction from './components/Introduction/Introduction';
import CountryDetail from './components/CountryDetail/CountryDetail';
import Form from './components/Form/Form';
import NavBar from './components/NavBar/NavBar';
import ActivityCards from './components/ActivityCards/ActivityCards';

function App() {

  const location = useLocation()
  console.log(location);

  return (
    <div className="App">
        {location.pathname !== '/' && <NavBar />}
        <Routes>
          <Route path='/' element={<Introduction/>} />
          <Route path='/Home' element={<Cards/>} />
          <Route path="/country/:id" element={<CountryDetail/>} />
          <Route path="/newActivity" element={<Form/>} />
          <Route path="/activities" element={<ActivityCards/>} />
        </Routes>
      </div>
  );
}

export default App;
