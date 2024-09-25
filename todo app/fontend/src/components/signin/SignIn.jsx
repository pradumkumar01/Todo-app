import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import { authActions } from "../store";
import "react-toastify/dist/ReactToastify.css";

const SignIn = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const [Inputs, setInputs] = useState({email:"",password:""});
  const change = (e) => {
    const { name, value } = e.target;
    setInputs({...Inputs,[name]:value});
  };
  const submit = async (e) => {
    e.preventDefault();
    await axios.post(`http://localhost:5000/api/auth/login`,Inputs).then((response) => {
     
      sessionStorage.setItem("id",response.data.others._id);
      dispatch(authActions.login(response.data.others._id));

      toast(response.data.others._id);
      setInputs({email:"",password:""});
      history("/todo");
      

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
                name="password"
                type="password"
                placeholder="Enter your Password"
                value={Inputs.password}
                onChange={change}

              />
              <button className="btn btn-primary" onClick={submit}>Sign In</button>
            </div>
          </div>
          <div className="col-lg-4 column  d-flex justify-content-center align-items-center  ">
            <h1 className="text-center sign-up">
              Sign <br /> In
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
