import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [fname, setFname] = useState("");
  const [email, setEmail] = useState("");
  const [lname, setLname] = useState("");
  const [phone,SetPhone] = useState("");
  const [password,SetPassword] = useState("");
const navigate = useNavigate();
const bRef = useRef();

  

const handleClick = (e) => {
  e.preventDefault();

  const userData = { fname,lname, phone, email, password};

  fetch('http://localhost:5000/users?email=' + email)
.then((response) => {return response.json()})
.then((data) => {
  if (data.length === 0) {
      
      if (fname=="" || lname=="" || phone=="" || password=="" || email=="") {

          // alert("Please fill all the details...!");

          // document.getElementById('err').innerHTML = " * Please fill in all fields";
          bRef.current.innerHTML = " * Please fill in all fields";

      }
      else {

          fetch("http://localhost:5000/users", {
              method: 'post',
              headers: { 'content-type': 'application/json' },
              body: JSON.stringify(userData)
          })
          .then((res) => {return res.json()})
          .then((data) => {console.log(data)})
          .catch((e)=>{console.log(e.message)})
          navigate('/login');
      }



    } else {
      alert('Email already exists. Please choose a different email.');
    }
  })

  
};
   return (
    <div className="bg-gray-100 h-fit flex items-center justify-center pt-5">
      <div className="bg-white p-8 rounded shadow-md w-96">
      <b ref={bRef} id="err" className="text-danger"></b>
        <h2 className="text-2xl font-semibold mb-4">Register</h2>
        <form onSubmit={handleClick}>
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-medium mb-2">
              First Name
            </label>
            <input
              type="text"
              value={fname}
              onChange={(e)=>{setFname(e.target.value)}}
              id="firstname"
              name="firstname"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
             {fname.length == 0 &&  <span className="text-danger">* Enter firstname</span> }
            
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-medium mb-2">
              Last Name
            </label>
            <input
              type="text"
              value={lname}
              onChange={(e)=>{setLname(e.target.value)}}
              id="lastname"
              name="lastname"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
            {lname.length === 0 && <span className="text-danger">*Enter lastname</span>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-medium mb-2">
              Phone Number
            </label>
            <input
              type="number"
              value={phone}
              onChange={(e)=>{SetPhone(e.target.value)}}
              id="phonenumber"
              name="phonenumber"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
            {phone.length === 0 && <span className="text-danger">*Enter Phone Number</span>}
            
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e)=>{setEmail(e.target.value)}}
              id="email"
              name="email"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
            {email.length===0 && <span className="text-danger">*Enter Email</span>}
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-600 text-sm font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e)=>{SetPassword(e.target.value)}}
              name="password"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
            {password.length ===0 && <span className="text-danger">*Enter Password</span>}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
