import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import posting from "../customs/posting";
import { loginSchema, validateFun } from "../customs/validation";


const Login = (props)=> {
    const sendingdata = new FormData()
    const [client , setClient ] = useState('customer')
    const [form  , setForm] = useState({}) 
    const [pendding, setPendding] = useState(null)
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)
    const [formFaild , setFormFaild]=useState(null)
   const navigate = useNavigate()
   const clientSelect = (e)=>{
    setClient(e.target.value)
   }
  const handelChange = (e)=>{
    const name = e.target.name ; 
    const value = e.target.value ; 
    setForm(pre=>{ return {...pre , [name]:value}}) }  
  const handelClick = ()=>{
    console.log('clicked')
    setData(null)
    setPendding(null)
    setError(null)
    setFormFaild(null)
    setClient('customer')
    const {error} =validateFun(form ,loginSchema)
    console.log(form)
    if (!error)
    {
        sendingdata.append('userName' , form.userName)
        sendingdata.append('password' , form.password)

        posting(`login/${client}` ,
         sendingdata ,setPendding , setData , setError , )}
   else {
    setData(null)
    setFormFaild(true)}
  }
  console.log('client is ' , client)
 console.log(data  , pendding , error)
 useEffect(()=>{
  const abrt = new AbortController()
  if (data&&data.user){

  props.parentFun(data , 'home')
   navigate('/home')
   }
return abrt.abort()
 },[data])
 

    return(<>{(!pendding&&!error)&&<div className="form">
          <h1 className="heading">login page </h1>
          <select className="select" name="type" id="" onChange={clientSelect}>         
            <option value="customer">customer</option>
            <option value="employee">Employee</option>
          </select>
        <input name='userName' value={form.userName||''} onChange={handelChange} type="text"  placeholder="userName"/>
        <input name='password' value={form.password||''} onChange={handelChange}  type="password" placeholder="Password"/>
        <button className="btn" onClick={handelClick}>Login</button>
        {(data&&data.notUser)&&<h3>you dont have an account</h3>}
        {formFaild&&<h3>you not enter user name or password</h3>}
        
    </div>}
    {pendding&&<div className="loading"><h2>loading please wait ... </h2></div>}
    {error&&<div className="loading"><h1>NetWork Connection Error</h1></div>}
    
    </>)
}

export default Login ; 


