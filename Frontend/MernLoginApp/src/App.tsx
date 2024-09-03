import { Routes,Route } from 'react-router-dom'
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import PageNotFound from './pages/PageNotFound';
import Password from './components/Password';
import Recovery from './components/Recovery';
import Reset from './components/Reset';
import './index.css'

function App() {

  return (
     <>
     <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/password" element={<Password />} />
      <Route path="/recovery" element={<Recovery />} />
      <Route path="/reset" element={<Reset />} />
      <Route path="*" element={<PageNotFound />} />
     </Routes>
     </>
  );
}

export default App
