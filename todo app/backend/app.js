const express = require('express');
const app = express();
const cors = require('cors');
require('./conn/conn');
app.use(express.json());
app.get('/', (req, res) => {
  res.send('Hello World');
});

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use("/api/auth", require('./routes/auth'));
app.use("/api/task", require('./routes/list'));

app.listen(PORT, () => {
  console.log('Server is running on port ' + PORT);
});


