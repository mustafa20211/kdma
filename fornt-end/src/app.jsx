
import {BrowserRouter as Router , Route  , Routes} from 'react-router-dom'
import Header from './mainSections/Header'
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import FollowUp from './pages/followUp'
import NewOrder from './pages/newOrder'
import './app.css'
import {useState } from 'react'
import OrderDetails from './pages/orderdetails'
import Footer from './mainSections/footer'


const App =()=>{

    const [currentUser,setCurrentUser] = useState(JSON.parse(sessionStorage.getItem('user')))
    const childToP = (childData , routeTo)=>{    
        setCurrentUser( childData)
        sessionStorage.setItem("user" , JSON.stringify(childData) )
    }
    console.log('app current user',currentUser)

return <Router>
    <Header parentFun = {childToP} currentUser= {currentUser}/>
    <Routes>
    <Route path='/' element={<Home   currentUser= {currentUser}/>}/>
    <Route path='home' element={<Home   currentUser= {currentUser}/>}/>
    <Route path='followup/:title'  element={<FollowUp currentUser= {currentUser}/>}/>
    <Route path='/orderinfo/:id'  element={<OrderDetails currentUser= {currentUser}/>}/>
    <Route path='login' element={<Login parentFun = {childToP}/>}/>
    <Route path='signup' element={<SignUp/>}/>
    <Route path='neworder/:title' element={<NewOrder/>}/>
    </Routes>
    <Footer/>
</Router>
}



export default App ; 