import React, { useContext, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { control } from './App';

const Login = ({setLog}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { userData,  setUserFound } = useContext(control);
  const nav = useNavigate();
  const div = useRef();

  const submitHandler = (e) => {
    e.preventDefault();
  
    if (email !== '') {
      const inputElements = document.querySelectorAll('.input');
  
      if (inputElements.length > 0) {
        inputElements[0].style.borderColor = '';
      }
  
      if (Array.isArray(userData)) {  // Check if userData is an array
        console.log(userData)
        const userEmail = userData.find((item) => item.email === email);
  
        if (userEmail) {
          if (password !== '') {
            // Check if the entered password matches the user's password
            if (userEmail.password === password) {
              setUserFound(userEmail);
              setLog(true);
              nav('/');
            } else {
              div.current.innerHTML = 'Password incorrect';
              setTimeout(() => {
                div.current.innerHTML = '';
              }, 2000);
            }
          } else {
            inputElements[1].style.borderColor = 'red';
          }
        } else {
          div.current.innerHTML = 'Account not found. Please create your account.';
        
          setTimeout(() => {
            div.current.innerHTML = '';
          }, 2000);
        }
      } else {
        // Handle the case where userData is not an array (e.g., show an error message)
        div.current.innerHTML = 'Invalid user data.';
        setTimeout(() => {
          div.current.innerHTML = '';
        }, 4000);
      }
    } else {
      document.querySelectorAll('.input')[0].style.borderColor='red';
    }
  };

  return (
    <div className="bg-gray-100 h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h3 className="text-2xl font-semibold mb-4">Login</h3>
        <form onSubmit={submitHandler}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-600 text-sm font-medium mb-2">
              Username
            </label>
            <input
              type="email"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
       className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 input"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-600 text-sm font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 input"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
          >
            Login
          </button>
          <Link to='/register' className=" ms-8 mr-3 underline text-red-400" >Don't have an account</Link>
        </form>
        <div ref={div} className="text-red-500 mt-2"></div>
      </div>
    </div>
  );
};

export default Login;