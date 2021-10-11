import React,{useEffect, useState, useContext} from "react";
import { Link, useHistory } from "react-router-dom";
import * as ROUTES from "../constant/routes";
import FirebaseContext from '../context/firebase'
import {doesUsernameExist} from "../services/firebase"

export default function Login() {

  useEffect(()=>{
    document.title = "Sign Up - Instagram"
  },[])

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [userName, setUserName] = useState('')
  const [fullName, setFullName] = useState('')
  const [error, setError] = useState('')
  const {app} = useContext(FirebaseContext)
  const isInValid = email === "" || fullName ==="" || userName ==="" || password === ""
  const history = useHistory()


  

  const handleSignin = async(e) =>{
    
    e.preventDefault();
    const usernameExist = await doesUsernameExist(userName)

    if(!usernameExist.length){

    try{
      const createdUserResult = await app.auth().createUserWithEmailAndPassword(email, password)

      await createdUserResult.user.updateProfile({
          displayName: userName
      })
      
      await app.firestore().collection('users').add({userId: createdUserResult.user.uid,
        username: userName,
        fullName,
        emailAdress : email.toLowerCase(),
        following :[],
        followers: [],
        dateCreated: Date.now()
      })
     
      history.push(ROUTES.DASHBOARD)
      
        } 
      catch(error){
        setEmail('')
        setError(error.message)
      }}

      else{
        setUserName('');
        setFullName('');
        setEmail('');
        setPassword('');
        setError('That username is already taken, please try another!')
      }
  };

  return (
    <div className="container flex mx-auto max-w-xs items-center h-screen">
     
      <div className="flex flex-col">
        <div className="flex flex-col items-center bg-white p-4 border mb-4">
          
            
        <img src="/images/logo.png" alt="Instagram" className="mt-2 w-6/12 mb-4" />


          {error && <p className="mb-4 text-xs text-red-500">{error}</p>}

         

          <form onSubmit = {handleSignin} method="POST">

          <input
              aria-label="Enter your username"
              className="text-sm w-full mr-3 py-5 px-4 h-2 border rounded mb-2"
              type="text"
              placeholder="Username"
              value = {userName}
              onChange = {({target}) =>{setUserName(target.value)}}
            />

            <input
              aria-label="Enter your fullname"
              className="text-sm w-full mr-3 py-5 px-4 h-2 border rounded mb-2"
              type="text"
              placeholder="FullName"
              value = {fullName}
              onChange = {({target}) =>{setFullName(target.value)}}
            />


            <input
              aria-label="Enter your email address"
              className="text-sm w-full mr-3 py-5 px-4 h-2 border rounded mb-2"
              type="text"
              placeholder="Email address"
              value = {email}
              onChange = {({target}) =>{setEmail(target.value.toLowerCase())}}
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
              Sign Up
            </button>
          </form>
        </div>
        <div className="flex justify-center items-center flex-col w-full bg-white p-4 border">
          <p className="text-sm">
            Have an account?{" "}
            <Link to={ROUTES.LOGIN} className="font-bold">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
