import React,{useState,useEffect,useContext} from 'react'

import {Link} from 'react-router-dom'


import {AuthContext} from "../context/AuthContext"

import {useNavigate} from 'react-router-dom'

const Dashboard = () => {

    const navigate = useNavigate()
	const {user,dispatch} = useContext(AuthContext)

   
   const logoutHandler = () => {



  localStorage.removeItem('user')
  navigate("/")


   }
    



   return(

       <>

          <div className="container">

             <h2 style={{marginTop:'10px'}}>Admin Dashboard</h2>


        <div className="main" style={{marginTop:'30px'}}>

              <p>
             <span style={{marginRight:'20px'}}>User Id :</span><span>{user._id}</span>
            </p>

            <p>
             <span style={{marginRight:'20px'}}>User Name :</span><span>{user.name}</span>
            </p>

             <p>
             <span style={{marginRight:'20px'}}>User Email :</span><span>{user.email}</span>
            </p>
       </div>



       <span><Link style={{textDecoration:'none'}} to="/password-change">Change Password</Link></span>


      <span style={{marginLeft:'80px',fontWeight:'bold'}} onClick={logoutHandler}>Logout</span>
      
          </div>

       </>

   	)



}


export default Dashboard