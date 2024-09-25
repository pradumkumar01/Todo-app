import React, { useState } from "react";
import "./SignUp.css";
import axios from "axios";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useNavigate} from "react-router-dom";


export const SignUp = () => {
  const history = useNavigate();
  const [Inputs, setInputs] = useState({email:"",username:"",password:""});
  const change = (e) => {
    const { name, value } = e.target;
    setInputs({...Inputs,[name]:value});
  };
  const submit = async (e) => {
    e.preventDefault();
    await axios.post(`http://localhost:5000/api/auth/register`,Inputs).then((response) => {
      if(response.data.message==="User already exists"){
        return toast(response.data.message);
      }
      toast(response.data.message);
      setInputs({email:"",username:"",password:""});
      history("/signin");

    }).catch((err) => {
      console.log(err);
    });
  }

  return (
    <div className="signup">
      <ToastContainer />
      <div className="container">
        <div className="row">
          <div className="col-lg-8 column d-flex justify-content-center align-items-center ">
            <div className="d-flex  flex-column gap-3  w-100 p-3">
              <input
                className="p-2 "
                name="email"
                type="email"
                placeholder="Enter your Email"
                onChange={change}
                value={Inputs.email}

              />
              <input
                className="p-2"
                name="username"
                type="username"
                placeholder="Enter your Username"
                onChange={change}
                value={Inputs.username}
              />
              <input
                className="p-2"
                name="password"
                type="password"
                placeholder="Enter your Password"
                onChange={change}
                value={Inputs.password}
              />
              <button className="btn btn-primary" onClick={submit}>Sign Up</button>
            </div>
          </div>
          <div className="col-lg-4 column  d-flex justify-content-center align-items-center  ">
            <h1 className="text-center sign-up">
              Sign <br /> Up
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};
