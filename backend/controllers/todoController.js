const mongoose = require('mongoose');

const Todo = require('../models/TodoModel.js');

//get all todos
const getAllTodos = async(req,res)=>{
    const user_id = req.user._id;
    const allTodos = await Todo.find({user_id }).sort({createdAt: -1});
    res.status(200).json(allTodos);
}   


//get single todo
const getTodo = async(req,res)=>{
    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No todo found'});
    }
    const todo = await Todo.findById(id);

    if (!todo){
        return res.status(404).json({error:"No todo found"});
    }

    res.status(200).json(todo);

}


//create todo
const createTodo = async(req,res)=>{
    const {title,items, index} = req.body

    // add doc to db
    try {
      const user_id = req.user._id
      const todo = await Todo.create({title,items,index, user_id})
      res.status(200).json(todo)
    } catch (error) {
      res.status(400).json({error: error.message})
    }
}
//update todo
const updateTodo = async(req,res)=>{
    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No todo found'});
    }
    const todo = await Todo.findOneAndUpdate({_id: id}, {...req.body});

    if (!todo){
        return res.status(404).json({error:"No todo found"});
    }
    res.status(200).json(todo);

}


//delete todo
const deleteTodo = async(req,res) => {
    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No todo found'});
    }
    const todo = await Todo.findOneAndDelete({_id: id});

    if (!todo){
        return res.status(404).json({error:"No todo found"});
    }
    res.status(200).json(todo);
}


//return
module.exports = {
    getAllTodos,
    getTodo,
    createTodo,
    updateTodo,
    deleteTodo
}