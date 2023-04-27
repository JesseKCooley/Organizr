const mongoose = require('mongoose');

const Schema = mongoose.Schema
/*
items: list of strings that are the individual to-dos of the list 
index: for sorting the todo, 0 will be the topmost todo in a given list

*/
const todoSchema = new Schema(
    {
    title : {
        type: String,
        required: true
    },
    items: {
        type: Array,
        default: [],
        required: true
    },
    index: {
        type: Number,
        required: true
    } ,
     user_id: {
        type: String,
        required: true
    } ,
     color: {
        type: String,
        required: true
     }
    },
    {timestamps:true}

 );

 module.exports = mongoose.model('Todo', todoSchema);