
import { useEffect, useState } from "react";
import { Link   } from "react-router-dom"
import fetchingFun from "../customs/fetchingFun";
import client from "../img/client.png"
import kdma from "../img/kdma.png"
import './header.css'
const Header = (props)=>{
const [pendding, setPendding] = useState(null)
const [data, setData] = useState(null)
const [error, setError] = useState(null)
let header1  , direction1 , header2 , direction2; 
let uri = '/logout'
 const handelClick = ()=>{
    if (props.currentUser){
        console.log('request logout ')
        fetchingFun(uri, setPendding, setData, setError )

    }

 } 
 console.log('fetching data' , data)
    if(data&&data.logout===true){
        props.parentFun(null) ; 
        setData(null)

    }
 
   if(props.currentUser){
    header1 = 'logout' ; 
    direction1 = '/home' ; 
    header2 =<img className="client-img" src={client} alt='' title={props.currentUser.user} />          //'Welcome '+   ;
    //direction2 = '' 
   }else {
    header1 = 'login';
    direction1 = '/login' ; 
    header2 = 'New Acount' ;
    direction2 = 'signup'
}
     
    
    
    return <div className="header">
        <Link className="link" to={'home'}><img src={kdma} alt='' className="client-img"></img> </Link>
        <Link className="link" to={direction1} onClick={handelClick}>{header1} </Link>
        <Link className="link"  to={direction2}>{header2}</Link>
    </div>
}


export default Header ;


