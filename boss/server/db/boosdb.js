const mongoose = require('mongoose'); 
const { Schema } = mongoose ; 



const employeeSchema = new Schema({
    name : String , 
    position : String , 
    salary : Number , 
    note : String ,
    createdat : {
        type : Date , 
        default : Date.now 
    }
}); 


module.exports = mongoose.model('Employee',employeeSchema); 