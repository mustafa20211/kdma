import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import posting from "../customs/posting";
import { newOrderShema, validateFun } from "../customs/validation";

const NewOrder = (props)=> {
    const params = useParams()
    const title = params.title ; 
    const uri = '/apply' ; 
    
    const sendingdata = new FormData();
    const [pendding, setPendding] = useState(null)
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)
    const [form  , setForm] = useState({})
    const [errors , setErrors] = useState({})
    const [doc1 , setDoc1]= useState(null)
    const [doc2 , setDoc2]= useState(null)
    const handelChange = (e)=>{
        const name = e.target.name ; 
        const value = e.target.value ;
        if (name==='doc1'){
            let file =e.target.files[0];
            setDoc1(file)
        }else if (name==='doc2'){
            let file =e.target.files[0];
            setDoc2(file)
        }
        setForm(pre=>{ return{...pre , [name]:value}})
    }

    const handelClick=()=>{
        console.log(form)
        const {error} = validateFun(form , newOrderShema)
        if (error)
        {
            setErrors({})
            for (let x of error.details){
                setErrors(pre=>{return {...pre ,[ x.path[0]]:true}})
            }  
       }
        else{
            for (let  x of Object.entries(form)){
                if (x[0]==='doc1'||x[0]==='doc2')continue;
                sendingdata.append(x[0] , x[1]);
            }

            sendingdata.append("owner" ,JSON.parse(sessionStorage.getItem("user")).id)
            sendingdata.append("title" , title)
            sendingdata.append("doc1" , doc1)
            sendingdata.append("doc2" , doc2)
            console.log('sending to server')
            console.log('form ' ,  sendingdata)
            posting(uri , sendingdata ,setPendding , setData , setError ,)
        } 
    }   
    console.log('data is now ' , data)

    return<div className="form">
        {(!data&&!pendding)&&<>
        <h1 className="heading">Customer New Order page </h1>

        <input type="text" onChange={handelChange} placeholder="owner name" name="ownerName" value={form.ownerName||''}/>
        {errors.ownerName&& <h2> owner name error </h2>}

        <input type="text" onChange={handelChange}  placeholder="National ID of owner" name="ownerId" value={form.ownerId||''}/>  
        {errors.ownerId&& <h2>ID IS error </h2>}

        <input type="text" onChange={handelChange}  placeholder="Phone of owner" name="phone" value={form.phone||''}/>
        {errors.phone&& <h2>PHONE IS error </h2>}

        <input type="text" onChange={handelChange}  placeholder="installation adress" name="adress" value={form.adress||''} />
        {errors.adress&& <h2>ADRESS error </h2>}

        <input type="file" onChange={handelChange}  name="doc1" value={form.doc1||''}/>
        {errors.doc1&& <h2>doc1 error </h2>}
        <input type="file" onChange={handelChange} name="doc2" value={form.doc2||''}/>
        {errors.doc2&& <h2>doc2 error </h2>}
        <button className="btn" onClick={handelClick}>NewOrder</button>
        </> }
        {pendding&&<div className="loading"><h2>loading please wait ...</h2> </div>}
        {(data&&data.created)&&<div className="loading"><h2>your service is created {data.id}</h2>  <Link className="btn" to={'/home'}>Home page  </Link> </div>}
        {(data&&!data.created)&&<div className="loading"><h2>Db error call Admin</h2> <Link className="btn" to={'/home'}>Try Again  </Link> </div>}
        {(error)&&<div className="loading"><h2>Network connection Error</h2></div>}
    </div>
}

export default NewOrder ; 





