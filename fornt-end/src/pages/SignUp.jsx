
import { Link } from "react-router-dom";
import { useState } from "react";
import posting from "../customs/posting";
import { signUpSchema, validateFun } from "../customs/validation";
import { set } from "mongoose";

const SignUp = ()=> {
    let uri = 'signup/customer'
    const sendingdata = new FormData()
    const [pendding, setPendding] = useState(null)
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)
    const [form  , setForm]= useState({})
    const [formError ,setFormError] = useState({})
    const handelChange= (e)=>{
        const name  = e.target.name ; 
        const value  = e.target.value ;
        setForm(pre=>{return {...pre , [name]:value}})
    }
 
    const handelClick = ()=>{
        const {error} = validateFun(form , signUpSchema)
        if (error){
            setFormError({})
            for(let x of error.details){
                setFormError(pre=>{return {...pre , [x.path[0]]:true}})
            }

        }else{
            console.log('posting to server')
            
            for (let x of Object.entries(form)){
                if (x[0]==="repassword"){continue}
                sendingdata.append(x[0] , x[1])
            }
            
            posting(uri , sendingdata ,setPendding , setData , setError)
        }
  
    }

    console.log(data)
    return<div className="form">
            <h1 className="heading">Customer SignUp page </h1>
            {(!pendding&&!data)&&<>
            <input type="text" onChange={handelChange}  placeholder="Name" name="name" value={form.name||''}/>
            {formError.name&&<h3>Enter Valid name</h3>}
            <input type="text" onChange={handelChange}  placeholder="National ID" name="natId" value={form.natId||''}/>  
            {formError.natId&&<h3>Enter Valid ID Number</h3>}
            <input type="text" onChange={handelChange}  placeholder="Phone" name="phone" value={form.phone||''}/>
            {formError.phone&&<h3>Enter Valid phone Number</h3>}
            <input type="text" onChange={handelChange}  placeholder="userName" name="userName" value={form.userName||''}/>
            {formError.userName&&<h3>Enter valid user name</h3>}
            <input type="password" onChange={handelChange}  placeholder="Password" name="password" value={form.password||''}/>
            {formError.password&&<h3>Enter Valid Password</h3>}
            <input type="password" onChange={handelChange}  placeholder="re-enter password" name="repassword" value={form.repassword||''}/>
            {formError.repassword&&<h3>password confirmation error</h3>}
            <button className="btn" onClick={handelClick}>SignUp</button>
            </>}
            {error&&<div className="loading"><h2>Error happend</h2> </div>}
            {pendding&&<div>loading </div>}
            {(data&&data.formValidationFaild)&&
            <div className="loading">
                <h2>Form Validation Error </h2>
                <Link className="btn" onClick={e=>{
                    setData(null)
                    setForm({})
                    setFormError({})
                    }}>try again</Link></div>}
            {(data&&data.created)&&<div className="loading"><h3>created sucessfully</h3> <Link className="btn" to={'/login'}>please go to login</Link></div>}
    </div>
}

export default SignUp ; 

