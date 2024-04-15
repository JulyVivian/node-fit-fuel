const mongoose = require('mongoose')

let ConsumptionSchema = new mongoose.Schema({
    consumption_name: String,
    type: String,
    time: String,
    content: String,
    fuel_variety: String,
    calories: String,
    remarks: String
})

let ConsumptionModel = mongoose.model('consumptions', ConsumptionSchema)

module.exports = ConsumptionModel