import React,{useState,useEffect,useContext} from 'react'

import {Link} from 'react-router-dom'

import axios from 'axios'

import {useNavigate} from 'react-router-dom'


import {AuthContext} from "../context/AuthContext"

const Login = () => {


const navigate = useNavigate()


  const {dispatch} = useContext(AuthContext)

	//const [email,setEmail] = useState('');
  //  const [password,setPassword] = useState('');
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState(false);

    const [alluser,Setalluser] = useState([]);



  const [credentials,setCredentials] = useState({


      email:undefined,
      password:undefined,


  })


const handleChange = (e) => {
     
     setCredentials(prev=>({...prev,[e.target.id]:e.target.value}))

}







const handleClick = async (e) => {

   e.preventDefault();
   

     dispatch({type:"LOGIN_START"})
  
   try{

   const res = await axios.post('/api/auth/login',credentials);

    dispatch({type:"LOGIN_SUCCESS",payload:res.data})   

       if(res.data == "User Does Not Exist"){

        setError(res.data)

       }else if(res.data == "Invalid Email or Password"){


         setError(res.data)

       }else{

      navigate("/dashboard")

     }



  console.log(res.data)
   }catch(error){


    dispatch({type:"LOGIN_FAILURE",payload:error.response.data})
    
     console.log(error)


   }

}




//const handleClick = async (e) => {

//   e.preventDefault();
   
  
//   try{

//   const res = await axios.post('/api/auth/login',credentials);

//   if(res.data == "User Does Not Exist"){

//        setError(res.data)

//   }else if(res.data == "Invalid Email or Password"){


//        setError(res.data)

 //  }else{

//      navigate("/dashboard")

//   }

 //  }catch(error){

    
 //    console.log(error)


 //  }

//}























   return(

       <>
       

          <div className="login-section">

               <div className="loginform" style={{width:'35%',margin:'10px auto',marginTop:'150px'}}>



                    <div className="card" style={{padding:'10px 10px 10px 10px'}}>
                          

                          
                          <h3 style={{width:'90px',margin:'10px auto',fontWeight:'bold'}}>Login</h3>

                     
              

                        {error && 
                       <center>
                      <p className="bg-danger" style={{padding:'0px 0px 0px 0px',color:'white'}}>{error}</p>
                       </center>


                    }

                    <div className="myform" style={{marginTop:'20px'}}>

                       <div className="mb-3">
                        <label for="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control"  aria-describedby="emailHelp" placeholder="Enter Email" 

                         id="email" onChange={handleChange} required
                        
                        />
                      </div>

                       <div className="mb-3">
                        <label for="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control"  placeholder="Enter Password" 
                         id="password" onChange={handleChange} required


                        />
                  
                      </div>

                      
                      <span>



                      <button onClick={handleClick} className="btn btn-primary" style={{marginRight:'250px'}}>Login</button>



                      <span><Link to="/register" style={{textDecoration:'none'}}>Create a new account</Link></span>
                      </span>

                       <p style={{marginTop:'20px'}}><Link to="/forgate-password" style={{textDecoration:'none'}}>Forgate Password ?</Link></p>
                           
                  </div>
                          
                     

                    </div>







               </div>
        
     
          </div>

















       </>

   	)



}


export default Login