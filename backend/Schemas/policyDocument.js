const mongoose = require('mongoose')

const policySchema= new mongoose.Schema({
    policyDoc:[]
})


const Policy= mongoose.model('Policy', policySchema)

module.exports=Policy;