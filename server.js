const port = 3000; 

const express = require('express');
const dotenv = require('dotenv');
const morgan=require('morgan');

dotenv.config({ path: 'config.env'});

const dbConnection = require('./config/database');
const taskRoute = require('./routes/taskRoute')

dbConnection();

const app = express();

app.use(express.json());

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
