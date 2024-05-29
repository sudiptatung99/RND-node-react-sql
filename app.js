const express = require('express')
const app = express()
require('dotenv').config();
require('./db/db')



//call all model
const user = require('./router/UserRoute');
const department = require('./router/DepartmentRoute');


app.use(express.json());

app.use("/user",user);
app.use("/department",department);

app.listen(process.env.PORT||8000, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})