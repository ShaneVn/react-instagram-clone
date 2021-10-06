import React,{useEffect, useState, useContext} from "react";
import { Link, useHistory } from "react-router-dom";
import * as ROUTES from "../constant/routes";
import FirebaseContext from '../context/firebase'

export default function Login() {

  useEffect(()=>{
    document.title = "Login - Instagram"
  },[])

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const {app} = useContext(FirebaseContext)
  const isInValid = email === "" || password === ""
  const history = useHistory()

  const handleSignin = async(e) =>{
    
    e.preventDefault();

    try{
      await app.auth().signInWithEmailAndPassword(email, password)
      
      history.push(ROUTES.DASHBOARD)
      
        }
      catch(error){
        setEmail("");
        setPassword("");
        setError(error.message)
      }
  };

  return (
    <div className="container flex mx-auto max-w-screen-md items-center h-screen">
      <div className="flex w-3/5">
        <img
          src="/images/iphone-with-profile.jpg"
          alt="iPhone with Instagram app"
        />
      </div>
      <div className="flex flex-col w-2/5">
        <div className="flex flex-col items-center bg-white p-4 border mb-4">
          <h1 className="flex justify-center w-full">
            <img
              src="/images/logo.png"
              alt="Instagram"
              className="mt-2 w-6/12 mb-4"
            />
          </h1>
          {error && <p className="mb-4 text-xs text-red-500">{error}</p>}

          <form onSubmit = {handleSignin} method="POST">
            <input
              aria-label="Enter your email address"
              className="text-sm w-full mr-3 py-5 px-4 h-2 border rounded mb-2"
              type="text"
              placeholder="Email address"
              value = {email}
              onChange = {({target}) =>{setEmail(target.value)}}
            />
            <input
              aria-label="Enter your password"
              className="text-sm w-full mr-3 py-5 px-4 h-2 border rounded mb-2"
              type="password"
              placeholder="Password"
              value = {password}
              onChange = {({target}) =>{setPassword(target.value)}}
            />
            <button

              type="submit"
              className={`bg-blue-500 text-white w-full rounded h-8 font-bold      
              ${isInValid && 'cursor-not-allowed opacity-50'}
              `
            }
              disabled = {isInValid}
            >
              Log In
            </button>
          </form>
        </div>
        <div className="flex justify-center items-center flex-col w-full bg-white p-4 border">
          <p className="text-sm">
            Don't have an account?{" "}
            <Link to={ROUTES.SIGN_UP} className="font-bold">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
