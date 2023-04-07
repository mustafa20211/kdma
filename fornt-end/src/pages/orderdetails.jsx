import { useEffect, useState ,useRef } from "react";
import {Link, useParams  } from "react-router-dom";
import fetchingFun from "../customs/fetchingFun";
import switching from "../customs/switchingTostring";
import posting from "../customs/posting";
const OrderDetails = (props)=>{
    const [comment , setComment] = useState('') ; 
    const requirments = [
        {name:'Req0' , 
        values:
        [{head:'Choose Req0' , value:0 } ,
        {head:'1' ,value:1},
        {head:'2' ,value:2} ]} ,
        {name:'Req1' , 
        values:[
        {head:'Choose Req1'  , value:0} ,
        {head:'1' ,value:1},
        {head:'2' ,value:2} ]} 
         ,
         {name:'Req2' , 
        values:[{head:'Choose Req2' ,value:0} ,
        {head:'1' ,value:1},
        {head:'2' ,value:2} ]} 
         ] 
        const [reqs , setReqs] = useState({req0:0 , req1:0,req2:0 , techStudy:''})
    const params = useParams(); 
    const id =params.id ; 
    const currentUser = props.currentUser ; 
    const uri = '/followup/'+id; 
    const Puri = '/update/'+id ; 
    const [data  , setData]=useState(null)
    const[pendding , setPendding]=useState(null)
    const [error , setError] = useState(null)
    const [pdata  , psetData]=useState(null)
    const[ppendding , psetPendding]=useState(null)
    const [perror , psetError] = useState(null)
    const [switchview,setShowing] = useState('sub-sec showing')
    const [imageStyle , setImageStyle]=useState('img-container')
    const controlStyle=(e)=>{
        if (e.target.name==='swithview')
        setShowing(pre=>{
            const newState = pre==="sub-sec showing"? "sub-sec":"sub-sec showing" 
            return newState ; 
        })
        else setImageStyle(pre=>{
            const newState = pre==='img-container'?'img-container-full-screen':'img-container'
            return newState ; 
        })
    }
    const handelChange =(e)=>{
       const  name = e.target.name ; 
        const value = e.target.value ; 
        setReqs((pre)=>{return{...pre,[name]:value}})

    }
    const handelSending = (e)=>{

        const sData = new FormData()
        let updateTo ; 
        const confirmation = e.target.value ; 
        console.log('confirm is ',confirmation , typeof(confirmation))
        console.log('handel sending to server')
        if (data.lastUpdate===2&&confirmation==='1'){
            updateTo =data.lastUpdate+1
            sData.append('req0' ,reqs.Req0||0)
            sData.append('req1' ,reqs.Req1||0)
            sData.append('req2' ,reqs.Req2||0)
            sData.append('techStudy' , reqs.techStudy||'')
        }else if (confirmation==='0') updateTo=6 ;
        else updateTo = data.lastUpdate+1
        console.log(reqs.Req0 , reqs.Req1 , reqs.Req2)
        console.log('update to is ',updateTo)
          sData.append('lastUpdate' ,updateTo)
          sData.append('from' ,data.lastUpdate)
          sData.append('comment' ,comment)
        const {pdata , ppendding , perror}=posting(Puri , sData,psetPendding
             , psetData , psetError , ) 

        if (pdata&&pdata.update)console.log('updated' , pdata.result )
     
    }
    useEffect(()=>{
        const abrt = new AbortController() ; 
        fetchingFun(uri,setPendding ,setData , setError)
        return ()=>abrt.abort() ; 
    } , [uri , pdata])
    const  {lastUpdateString , serviceTitle}=switching(data ) 
        console.log(lastUpdateString ,serviceTitle)
    console.log(data)
return(<div className="wrapper">
    <div className="container">
    <h1 className="heading">order details</h1>
    {data&&!data.auth&&!pdata&&<>
        <div>
            <div className="sub-sec">
            {(currentUser.level>1&&(data.lastUpdate!==5&&data.lastUpdate!==6))?<button className="btn" name="swithview" onClick={controlStyle}>{'update'}</button>:<h2>{'order status'}</h2>}
            <h2>{lastUpdateString}</h2>
            </div>
        <div className={switchview}>
            <button className="btn" onClick={handelSending} value={1}>{'confirm order details'}</button>
            <button className="btn" onClick={handelSending} value={0}>{'Refuse order details'}</button>
           { data.lastUpdate!==2&&<input type="text" 
           onChange={(e)=>setComment(e.target.value)} placeholder="comment" value={comment||''}/> }
           {
            (data&&data.lastUpdate===2)&&requirments.map(
                ele=><select className="select" name={ele.name} onChange={handelChange} value={reqs.name}>{ele.values.map
                    (ele=><option value={ele.value}>{ele.head}</option>)}</select>)
            }
            {data.lastUpdate===2 && <textarea  name="techStudy" onChange={handelChange} value={reqs.techStudy||''} className="seeing" placeholder="inspection result"/>}
        </div>
        </div>
        <div>
            <h1 className="heading">Service Info</h1>
        <div className="sub-sec">
            <h3>{'type'}</h3>
            <h3>{'place'}</h3>  
            <h3>{serviceTitle}</h3>
            <h3>{data.adress}</h3>  
        </div>
        </div>
        <div>
        <h1 className="heading">Customer Info</h1>
        <div className="sub-sec">
        <h3>{'Owner Name'}</h3>
            <h3>{'National ID'}</h3> 
            <h3>{data.ownerName}</h3>
            <h3>{data.ownerId}</h3>
            <h3>{'Phone'}</h3>
            <h3>{''}</h3>
            <h3>{data.phone}</h3>
        </div>
        </div>
        <div className="">
        <h1 className="heading">{'Documnets'}</h1>
            <div className="sub-sec">
                <h2>DOC1</h2>
                <h2>DOC2</h2>
                <div className={imageStyle} onClick={controlStyle}>
                    {data&&<img src={data.doc1} alt="Not found" />}
                </div>
                <div className={imageStyle} onClick={controlStyle}>
                {data&&<img src={data.doc2} alt="Not found" />}
                </div>
            </div>
            {data&&data.coastEst>=0&&<div className="sub-sec">
                <h3>{'Total Coast'}</h3>
                <h3>{data.coastEst +'$'}</h3>  
            </div>}
            {data&&data.technicalStudy&&<div className="sub-sec">
            <h3>{'Technical Study '}</h3>
            <h3></h3>
            <p>{data.technicalStudy }</p>  
            </div>}
        </div>
    </>}
    {pendding&&<div className="loading"> <h2>LODING please wait ...</h2> </div>}
    {error&&<div className="loading"> <h1>Network Connection Error</h1> </div>}
    {(pdata&&pdata.update)&&<div className="loading"><h2>updated go to </h2><Link className="btn" to={'/home'}>Home</Link></div>}
    {(pdata&&!pdata.update)&&<div className="loading"><h2>Error in upgrade </h2><Link className="btn" to={'/home'}> Home</Link></div>}
    {perror&&<div className="loading"><h2>CHeck your Network</h2></div>}
    {ppendding&&<div className="loading"><h2>Loading Please wait ...</h2></div>}
    </div> 
</div>)}
export default OrderDetails ; 