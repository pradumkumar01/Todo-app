import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Update = ({ display, update }) => {
  useEffect(() => {
    setInputs({
      title: update.title,
      body: update.body,
    });
  }, [update]);

  const [Inputs, setInputs] = useState({
    title: "",
    body: "",
  });
  const change = (e) => {
    const { name, value } = e.target;
    setInputs({ ...Inputs, [name]: value });
  };
  const submit = async () => {
    await axios
      .put(`http://localhost:5000/api/task/updateTask/${update._id}`, Inputs)
      .then(() => {
        toast.success("Your task is updated !");
      });
    display("none");
  };
  return (
    <div>
      <h1
        className="fs-4 mx-5 
       my-4"
      >
        Update Your Task
      </h1>
      <div className="d-flex flex-column px-5 gap-3">
        <input
          type="text"
          value={Inputs.title}
          onChange={change}
          name="title"
        />
        <textarea
          type="text"
          value={Inputs.body}
          onChange={change}
          name="body"
        />
      </div>
      <div>
        <button className="btn btn-primary my-3 ms-5" onClick={submit}>
          Update
        </button>
        <button
          className="btn btn-danger my-3 ms-1 "
          onClick={() => {
            display("none");
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Update;
