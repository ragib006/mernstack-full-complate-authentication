import React,{useState} from 'react'

import {Link} from 'react-router-dom'

import axios from "axios"


import {useNavigate} from 'react-router-dom'

const Forgatepassword = () => {


	//const [email,Setemail] = useSate("")


	    //const [error,setError] = useState(false);



const navigate = useNavigate()

 const [email,Setemail] = useState("")

 const [message,Setmessage] = useState("");

	const handleClick = async (e) => {

		 e.preventDefault();

		try{




   const res = await axios.post('/api/auth/user_forgate_password_link_send',{email});

   //console.log(res.data.message)



             if(res.data.message === "Forgate password link successfully send your email"){

                Setmessage(res.data.message)

                Setemail("")


            
             }else if(res.data.message === "User Not Found"){


                Setmessage(res.data.message)

                Setemail("")


             }else{


               
                Setmessage("Server Error")

             }

		}catch(error){

        
           console.log(error)
    

		}

      


	}

return(
        

          <>
       

          <div className="login-section">

               <div className="loginform" style={{width:'35%',margin:'10px auto',marginTop:'150px'}}>



                    <div className="card" style={{padding:'10px 10px 10px 10px'}}>
                          

                          
                          <h3 style={{width:'250px',margin:'10px auto',fontWeight:'bold'}}>Forgate Password</h3>

                     


                    <div className="myform" style={{marginTop:'20px'}}>



                     
                  {message && 

                       <center>
                      <p className="bg-danger" style={{padding:'0px 0px 0px 0px',color:'white'}}>{message}</p>
                       </center>


                    }





                       <div className="mb-3">
                        <label for="exampleInputEmail1" className="form-label">Enter Email Address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Email Address" 

                        value = {email}
                        onChange = {(e) => Setemail(e.target.value)}

                        />
                      </div>


                      
                      <span>
                      <button onClick={handleClick} className="btn btn-primary" style={{marginRight:'270px'}}>Send Email</button>
                      <span><Link to="/" style={{textDecoration:'none'}}>Login your account</Link></span>
                      </span>

                      
                  </div>
                          
                     

                    </div>







               </div>
        
     
          </div>

       </>
       

	)


}




export default Forgatepassword;