import React, { useEffect, useState, } from "react";
import { ToastContainer, toast } from "react-toastify"; // Import the ToastContainer component
import TodoCards from "./TodoCards";
import "react-toastify/dist/ReactToastify.css"; // Import the Toastify CSS
import "./Todo.css";
import Update from "./Update";
// import { useSelector } from "react-redux";
// import { useDispatch } from "react-redux";
// import { authActions } from "../store";
import axios from "axios";

let id = sessionStorage.getItem("id");
let toUpdateArray = [];

const Todo = () => {
  const [Inputs, setInputs] = useState({ title: "", body: "" });
  const [Array, setArray] = useState([]);

  const show = () => {
    document.getElementById("textarea").style.display = "block";
  };

  const change = (e) => {
    const { name, value } = e.target;
    setInputs({ ...Inputs, [name]: value }); // spread operator;
  };

  const submit = async () => {
    if (Inputs.title === "" || Inputs.body === "") {
      toast.error("Please fill in both title and body"); // Display an error toast if input fields are empty
    } else {
      if (id) {
        await axios
          .post(`http://localhost:5000/api/task/addTask`, {
            title: Inputs.title,
            body: Inputs.body,
            id: id,
          })
          .then((response) => {
            console.log(response);
          });
        setInputs({ title: "", body: "" });
        toast.success("Your Task is Added"); // Display the toast notification
      } else {
        setInputs({ title: "", body: "" });
        toast.success("Your Task is Added"); // Display the toast notification
        toast.error("Your task is not added ! please sign up first"); // Display an error toast notification
      }
    }
  };

  const del = async (Cardid) => {
    if(id){
      await axios
      .delete(`http://localhost:5000/api/task/deleteTask/${Cardid}`, {
        data: { id: id },
      })
      .then(() => {
        toast.success("Your Task is Deleted"); // Display a toast notification when task
      });
    }
    else{
      toast.error("Your task is not deleted ! please sign up first"); // Display an error toast notification
    }
   
  };

  const dis = (value) => {
    console.log(value);
    document.getElementById("todoupdate").style.display = value;
  };


  const update = (value)=>{
    toUpdateArray = Array[value];
  }

  useEffect(() => {
    if(id){
      const fetch = async () => {
        await axios
          .get(`http://localhost:5000/api/task/getTasks/${id}`)
          .then((response) => {
            setArray(response.data.list);
          });
      };
      fetch();
    }
    else{
      toast.error("Your task is not fetched ! please sign up first"); // Display an error toast notification
    }
  }, [submit]);



  return (
    <>
      <div className="todo">
        <ToastContainer /> {/* Ensure ToastContainer is used here */}
        <div className="todo-main container d-flex justify-content-center align-items-center my-3 flex-column">
          <div
            className="d-flex flex-column gap-3 w-50 rounded p-4"
            style={{ border: "1px solid white", boxShadow: "0 0 10px black" }}
          >
            {/* input title */}
            <input
              name="title"
              value={Inputs.title}
              type="text"
              placeholder="TITLE"
              onClick={show}
              onChange={change}
              style={{ border: "none", outline: "none" }}
            />
            <textarea
              value={Inputs.body}
              className="ps-0"
              name="body"
              id="textarea"
              type="text"
              placeholder="BODY"
              onChange={change}
              style={{ display: "none", border: "none", outline: "none" }}
            />
          </div>
          <div className="w-50 d-flex justify-content-end my-3">
            <button className="btn btn-primary px-2 py-1" onClick={submit}>
              ADD
            </button>
          </div>
        </div>
        <div className="todo-body">
          <div className="container-fluid">
            <div className="row">
              {Array &&
                Array.map((item, index) => (
                  <div className="col-lg-3 col-10 mx-5 my-2 " key={index}>
                    <TodoCards
                      title={item.title}
                      body={item.body}
                      id={item._id}
                      delid={del}
                      display={dis}
                      updateId={index}
                      toBeUpdate={update}

                    />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>

      <div className="todoupdate" id="todoupdate">
        <Update display={dis}  update = {toUpdateArray} />
      </div>
    </>
  );
};

export default Todo;
