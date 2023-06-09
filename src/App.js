import React from 'react';
import './App.css';
import Registerform from './pages/Registerform';
import Profile from './pages/profile';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/header';
import Listemp from './pages/listemp';
import Update from './pages/userupdate';

/* import 'bootstrap/dist/css/bootstrap.min.css'; */

function App() {
  return (
        <Router>
          <Header />
            <Routes>
              <Route exact path="/" element={<Registerform/>}/> 
              <Route path="/listemp" element={<Listemp/>}/>
              <Route path="/Profile" element={<Profile/>}/>
              <Route path="/Update" element={<Update/>}/>

              {/* <Route path="/edit/:id" component={EditUser} exact />
              <Route component={NotFound} /> */}
            </Routes>
        </Router>
  );
}

export default App;
