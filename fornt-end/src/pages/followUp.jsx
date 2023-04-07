import './followUp.css'
import { useState } from 'react';
import {  Link, useNavigate, useParams } from "react-router-dom";
import fetchingFun from '../customs/fetchingFun';
import switching from '../customs/switchingTostring';
const FollowUp = (props)=>{
    
    const nav = useNavigate()
    const params = useParams()
    const [level , setLevel] = useState(0)
    const selectios = [
        {value:'0' , title:'select services level' ,},
        {value:'1' , title:'New orders' , },
        {value:'2' , title:'Reviewed & under study' , },
        {value:'3' , title:'Technical study finish & under payment' , },
        {value:'4' , title:'Payment Done & under Processing' , },
        {value:'5' , title:'closed and done' ,},
        {value:'6' , title:'Absolutely rejected'}
    ]
    const  title =params.title ; 
    const  uri=`/followup/${title}/${level}`  ; 
   
    console.log( 'title',title) ; 
    console.log('levl',level)
    console.log("current user is " , props.currentUser)
    /////////////////////////////////
    const [pendding, setPendding] = useState(null)
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)
   
    ///////////////////////////////
    const handelClick = ()=>{
       console.log(props.currentUser)
        setData(null)
        setError(null)
        setPendding(null)
        console.log('getting data from server')
        fetchingFun(uri, setPendding, setData, setError)
    }
    ///////////////////////////////
    const handelChange = (e)=>{setLevel(e.target.value)}
    /////////////////////////////////
    console.log(data?data:'')
    const  {lastUpdate , serviceTitle}=switching(data)
    /////////////////////////////////
    if (data&&data.auth===false)nav('/home')
    else return <div className="main_section">
       <h1 className='heading'>Follow up</h1>

       {props.currentUser.level===1?
       <div className='s1'><Link className="link2" to={`/neworder/${title}`}>apply on new order</Link></div>
       :
       <div className='s1'> 
        <select name="serviceLevel" id="" className='select' onChange={handelChange}>
            {selectios.map(ele=>
            <option key={ele.value} value={ele.value} className='select' >{ele.title}</option>)}
        </select>
      
        </div>}
        <hr />
       <div className='s1'>
        </div>
       <div className='s1'> 
        <Link className="link2" onClick={handelClick}>Get Orders </Link>
        <h1 className='heading'> {selectios.value==="0"?'All order status':level.title}</h1>
        </div>
        {pendding&&<div className='loading'><h2>loading pllease wait ...</h2></div>}
        
        {<div className='display-ele'>
        {data&&
        data.map(ele=><Link className='ele-comp' rel={"noopener"}  to={`/orderinfo/${ele._id}`} key={ele.id }>
            <h2>{ele.ownerName}</h2>
            <h2>{ele.adress}</h2>
            <h2>{ele.phone}</h2>
            </Link>)}
            {!data&&<h1 className='loading'>data will display here</h1>}
             </div>}
        {(data&&data===[]&&data.leght===0)&&<h1>No orders founded </h1>}
        {error&&<h1>Error happend please call admin</h1>}
    </div>

}



export default FollowUp ; 