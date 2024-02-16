
import Home from "./pages/home.jsx"
import { Route , Routes } from "react-router-dom"
import Signup from "./pages/signup.jsx";
import Login from './pages/Login.jsx';
import PasswordC from "./pages/password.jsx";
function App() {

  return (
     <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/changepass" element={<PasswordC/>}/>
     </Routes>
  )
}

export default App
