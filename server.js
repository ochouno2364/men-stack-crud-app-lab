//DEPENDENCIES 
const express = require('express');
const app = express();

const dotenv = require('dotenv');
dotenv.config();

const ejs = require('ejs');


const mongoose = require('mongoose');
const morgan = require('morgan');
const methodOverride = require('method-override');





//MIDDLEWARE
mongoose.connect(process.env.MONGODB_URI); //connected to mongodb using the connection string
mongoose.connection.on('connected', ()=> {
    console.log(`Connected to MongoDB ${mongoose.connection.name}`) //logging the connection by its name property
})

// Import Planet Model

const Planet = require('./models/planet.js')

app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(morgan('dev'));


//ROUTES
// GET // TEST ROUTE
app.get('/', async (req, res)=> {
    res.render('index.ejs');
});


// (I)NDEX ROUTE 
app.get('/planets', async (req, res) => {
const allPlanets = await Planet.find();
res.render('planets/index.ejs', {planets: allPlanets});
})

// (N)EW ROUTE
app.get('/planets/new', async(req, res)=> {
    res.render('planets/new.ejs');
});

// (D)ELETE ROUTE
app.delete('/planets/:planetId', async (req, res) => {
await Planet.findByIdAndDelete(req.params.planetId);
res.redirect('/planets');
})

// (U)PDATE ROUTE
app.put('/planets/:planetId', async (req, res)=> {
    
if (req.body.hasWater === 'on') {
    req.body.hasWater = true;
} else {
    req.body.hasWater = false;
}
await Planet.findByIdAndUpdate(req.params.planetId, req.body);
res.redirect(`/planets/${req.params.planetId}`)
});


// (C)REATE ROUTE
app.post('/planets', async (req, res) => {
    if (req.body.hasWater === 'on') {
        req.body.hasWater = true;
    } else {
        req.body.hasWater = false;
    }
    await Planet.create(req.body);

    res.redirect('/planets')
});

// (E)DIT ROUTE
app.get('/planets/:planetId/edit', async (req, res)=> {
    const foundPlanets = await Planet.findById(req.params.planetId);
    res.render('planets/edit.ejs', {planet: foundPlanets})
});

// (S)HOW ROUTE
app.get('/planets/:planetId', async (req, res)=> {
    const findPlanets = await Planet.findById(req.params.planetId);
    res.render('planets/show.ejs', {planet: findPlanets});
});






//LISTENER
app.listen(5000, ()=> {
    console.log('Listening on port 5000')
})