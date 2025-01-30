//models/planet.js

// Import mongoose
const mongoose = require('mongoose'); 

// Define The Planet Schema
const planetSchema = new mongoose.Schema({
    name: {type: String, required: true },
    description: {type: String, required: true},
    size: {type: Number, required: true},
    hasWater: {type: Boolean},
    image: String,

});


// Create the Planet  Model 
const Planet = mongoose.model('Planet', planetSchema);

// Export Planet Model
module.exports = Planet;  // must import into server.js