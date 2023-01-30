import { useState } from "react";
import { Routes, Route} from "react-router-dom";
import AlertMessage from "./components/AlertMessage";
import CreatePost from "./components/CreatePost";
import Home from "./components/Home";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import SignUp from "./components/SignUp";

function App() {
    const [message, setMessage] = useState(null);
    const [category, setCategory] = useState(null);

    const now = new Date();
    const [loggedIn, setLoggedIn] = useState((localStorage.getItem('token') && new Date(localStorage.getItem('tokenExp'))> now));

    function flashMessage(message, category){
        setMessage(message);
        setCategory(category);
    }

    function logUserIn(){
        setLoggedIn(true);
    }

    function logUserOut(){
        setLoggedIn(false);
        localStorage.removeItem('token');
        localStorage.removeItem('tokenExp');
        flashMessage('You have logged out', 'warning')
    }

  return (
    <>
        <Navbar loggedIn={loggedIn} logUserOut={logUserOut} />
        <div className ="container">
            {message ? <AlertMessage message={message} category={category} flashMessage={flashMessage} /> : null}
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/signup' element={<SignUp flashMessage={flashMessage} />} />
                <Route path='/login' element={<Login flashMessage={flashMessage} logUserIn={logUserIn} />} />
                <Route path='/create' element={<CreatePost loggedIn={loggedIn} flashMessage={flashMessage} />}/>
            </Routes>
        </div>
    </>
  );
}

export default App;
