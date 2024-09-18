const port = 3000; 

const express = require('express');
const dotenv = require('dotenv');
const morgan=require('morgan');
const cors = require('cors');

dotenv.config({ path: 'config.env'});

const dbConnection = require('./config/database');
const taskRoute = require('./routes/taskRoute')

dbConnection();

const app = express();

app.use(express.json());

app.use(cors());

app.use(
  cors({
    origin: ["*"], // Replace with your frontend URL
    credentials: true, // Allow sending cookies with the request
  })
);

if(process.env.Node_ENV=='development'){
  app.use(morgan('dev'));
  console.log(`mode:${process.env.Node_ENV}`)
}

app.use('/api/v1/tasks', taskRoute);

app.get('/',(req,res)=>{
    res.send('Our API')
})

const PORT = process.env.PORT||3000;
app.listen(PORT,()=>{
  console.log(process.env.DB_URI)
  console.log(`App running on port ${port}`)
});
