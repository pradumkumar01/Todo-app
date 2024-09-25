const mongoose = require('mongoose');

const conn = async () => {
  try {
    await mongoose.connect("mongodb+srv://pradumkumar7929:iI0fCCQPjey0iiii@cluster0.xyfcg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(() => {
      console.log("Database connected successfully");

    }).catch((err) => { 
      console.log("Error in connecting to database", err);

    });
  }
  catch (error) {
    res.status(500).send({message : error.message});
  }
}

conn();




