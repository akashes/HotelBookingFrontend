import { Routes,Route } from 'react-router-dom';
import './App.css';
import IndexPage from './Pages/IndexPage';
import LoginPage from './Pages/LoginPage';
import Header from './Components/Header';
import Layout from './Layout/Layout';
import RegisterPage from './Pages/RegisterPage';
import axios from 'axios';
import Account from './Pages/AccountPage';

axios.defaults.baseURL = 'http://localhost:4000';
axios.defaults.withCredentials=true

function App() {
  return (
    <>
    
    <Routes>
      <Route path='/' element={<Layout/>} >
      <Route path='/' element={<IndexPage/>} />
      <Route path='/login' element={<LoginPage/>} />
      <Route path='/register' element={<RegisterPage/>} />
      <Route path='/account/:subpage' element={<Account/>} />
     

        
      </Route>
    
     
    </Routes>

    </>
  );
}

export default App;
