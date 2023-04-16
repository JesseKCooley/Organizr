require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const todoRoutes = require('./routes/todosRouter');
const userRoutes = require('./routes/usersRouter');


const app = express();

app.use(express.json());

app.use((req,res,next)=>{

    console.log(req.path,req.method);
    next();

});

app.use('/api/todos', todoRoutes);
app.use('/api/users', userRoutes);
//connect to db
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    app.listen(process.env.PORT, ()=> {
        console.log("Connected to db, Listening on port "+process.env.PORT);
    });
})
.catch( (error)=>{console.log(error)});



