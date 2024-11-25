import Login from "./Components/Login/login"
import Navbar from "./Components/Navbar/Navbar";
import HomePage from "./Components/HomePage/HomePage";


import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Empolye from "./Components/Epolye_list/empolye"


function App() {

  return (
    <>

 
    
     
    <Router>
      
<Loaction></Loaction>


    <Routes>


    <Route path="/" element={<Login></Login>}></Route>

    <Route path="/HomePage" element={<HomePage></HomePage>}></Route>

    <Route path="/EmpolyeeList" element={<Empolye></Empolye>} ></Route>


    </Routes>

    </Router>




    </>
  )


  function Loaction(){
    const location = useLocation();
    if(location.pathname!=='/'){
      return <Navbar></Navbar>
    }else{
      return null
    }

  }



}

export default App
