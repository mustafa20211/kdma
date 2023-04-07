import {Link } from 'react-router-dom'
import './home.css'
const Home = (props)=>{


    const services = [
        {id:0 , name:'Apply to installation dev', desc: 'easy apply to install device where you are' , title:'0'} , 
    {id:2, name:'maintain of exisiting dev', desc: 'full maintaining service ' ,  title:'1'} ]
    return <div className='home-container'>
                  <h1 className='heading'> All available Services</h1> 
                 {services.map(ele=><Link target={''} rel='' className='service' state={{title:ele.title}} key={ele.id} to={props.currentUser?`/followup/${ele.title}`:'/login'}>
                    <h1>{ele.name}</h1>
                    <p>{ele.desc}</p>
                 </Link>)
                 }

            </div>
}



export default Home  ; 