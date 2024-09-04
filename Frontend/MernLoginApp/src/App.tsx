import { Routes,Route } from 'react-router-dom'
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import PageNotFound from './pages/PageNotFound';
import Password from './components/Password';
import Recovery from './components/Recovery';
import './index.css'
import ResetPassword from './components/ResetPassword';

function App() {

  return (
     <>
     <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/password" element={<Password />} />
      <Route path="/recovery" element={<Recovery />} />
      <Route path="/reset" element={<ResetPassword />} />
      <Route path="*" element={<PageNotFound />} />
     </Routes>
     </>
  );
}

export default App
