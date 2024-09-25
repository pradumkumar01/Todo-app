const mongoose = require('mongoose');

const conn = async () => {
  try {
    await mongoose.connect("Add your mongoose url").then(() => {
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




