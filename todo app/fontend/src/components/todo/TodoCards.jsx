import React from "react";
import { AiFillDelete } from "react-icons/ai";
import { GrDocumentUpdate } from "react-icons/gr";

const TodoCards = ({ title, body, id, delid ,display,updateId ,toBeUpdate}) => {
  return (
    <div
      className="p3"
      style={{
        border: "2px solid black",
        borderRadius: "0px",
        padding: "10px",
      }}
    >
      <h4>{title}</h4>
      <p
        style={{
          textAlign: "justify",
          textJustify: "inter-word",
        }}
      >
        {body.split("", 20)}...
      </p>
      <div
        className="d-flex justify-content-between "
        style={{ cursor: "pointer" }}
      >
        <div className="p-1 rounded" style={{ boxShadow: "0 0 10px black" }}>
          <div
          onClick={() => {
            display("block");
            toBeUpdate(updateId);
          }} 
          >
          <GrDocumentUpdate /> Update
          </div>
        </div>
        <div
          className="p-1 rounded"
          style={{ boxShadow: "0 0 10px black" }}
          onClick={() => {
            delid(id);
          }}
        >
          <AiFillDelete className="text-danger fs-5" /> Delete
        </div>
      </div>
    </div>
  );
};

export default TodoCards;
