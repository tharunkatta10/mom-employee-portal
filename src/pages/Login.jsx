import { jwtDecode } from 'jwt-decode'
import React, { useContext, useEffect, useState  , useRef} from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext'

const Login = () => {

  const navigate = useNavigate()

  if(localStorage.getItem("jwt_token")){
    const jwtToken = localStorage.getItem("jwt_token")
    const decoded = jwtDecode(jwtToken)
             if(decoded.isAdmin){
               navigate('/admin')
             }else{
               navigate('/user')
             }
  }

  const loginRef = useRef(null)

    const [username  , setUsername] = useState("")
    const [password  , setPassword] = useState("")
    const [errorMsg , setErrorMsg] = useState(false)
    const [loginError, setLoginError] = useState(false)



    const {setLogin} = useContext(UserContext)

  const loginUser = async ()=>{
    loginRef.current.textContent = "Loading..."
    loginRef.current.disabled = true
      const options = {
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({username , password})
      }

      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/login` , options)
      if(response.ok){
        setLoginError(false)
        const data = await response.json()
        console.log(data.jwtToken)
        const decoded = jwtDecode(data.jwtToken)
        // console.log("this is details after decodec",decoded)
        setLogin(data.jwtToken , decoded)
             if(decoded.isAdmin){
               navigate('/admin')
             }else{
               navigate('/user')
             }
      }else{
        loginRef.current.textContent = "Login"
        loginRef.current.disabled = false
        setLoginError(true)
      }
    }
    

    const handleLogin = (e)=>{
      e.preventDefault()
      
      if(!username || !password){
        setErrorMsg(true)
      }else{
        loginUser()
      }
    }

  return (
    <div>
      <div className='flex flex-col h-screen w-full  items-center bg-gray-200'>
        <h1 className='font-bold text-2xl mt-[100px]  md:text-2xl'>Welcome to Mom Employment Portal</h1>
        <div className='mt-10 p-10 bg-white'>
            <form onSubmit={handleLogin}>
                <div>
                    <label htmlFor="username" className='font-semibold'>Username</label> <br />
                    <input type="text" className='border-2 border-gray-200 mt-1 p-1 w-[250px] rounded-md outline-none' id='username' name='username' value={username} onChange={(e)=>{setUsername(e.target.value)}} />
                </div>
                <div className='mt-5'>
                    <label htmlFor="password" className='font-semibold'>Passowrd</label> <br />
                    <input type="password" id='password' className='border-2 border-gray-200 mt-1 p-1 w-[250px] rounded-md outline-none' name='password' value={password} onChange={(e)=>{setPassword(e.target.value)}} />
                </div>
                <div>
                 {errorMsg && <p className='text-red-500 mt-3 '>All Fields are mandatory</p>} 
                 {loginError && <p className='text-red-500 mt-3 '>Invalid Credientials</p>} 
                    <button ref={loginRef} className='mt-6 w-full bg-[#00a99d] py-1 px-2 rounded-md' type='submit'>Login</button>
                </div>
            </form>
        </div>
      </div>
    </div>
  )
}

export default Login
