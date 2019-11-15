//REST API
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { User, Trip } = require('./mochilero');


const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

const PORT = process.env.PORT || 4000;

app.get('/',(request,response)=>{
    response.send({message:'Server on'})
});

app.post('/create/user',(request, response) => {
    const { 
        name,
        email,
        cel,
        trip 
    } = request.body;

    const newUser = User({
        name,
        email,
        cel,
        trip 
    })

    newUser.save((err, user)=>{
        if(!err){
            response.status(201).send({message:'Se ha creado el usuario exitosamente.', user:user})
        }else{
            response.status(409).send({message:'Error al crear usuario.',error:err})
        }
    });
});

app.get('/user/:id', (req,res) => {
    const { id } = req.params;

    User.findById(id)
    .populate('trip')
    .exec()
    .then(user => res.status(200).send(user))
    .catch(error => res.status(409).send(error))
})

app.get('/all/users',(req,res)=>{
    User.find()
    .populate('trip')
    .exec()
    .then(users => res.status(200).send(users))
    .catch(error => res.status(409).send(error))
});

app.patch('/asignar/trip/:tripId/user/:userId',(req,res)=>{
    const { tripId, userId } = req.params;

    User.findByIdAndUpdate(userId,{$push:{trip:tripId}},{new:true})
    .exec()
    .then(user => res.status(200).send({message:'Se ha generado nuevo usuario',user:user}))
    .catch(error => res.status(409).send(error))
});
//------------------------------------------------------
app.post('/create/trip',(req,res)=>{
    const {
        origin,
        destiny,
        cost,
        starDate,
        endDate
    } = req.body;

    const newTrip = Trip({
        origin,
        destiny,
        cost,
        starDate,
        endDate
    })

    newTrip.save((err,trip)=>{
        !err
        ? res.status(201).send({message:'Trip creado con éxito', trip:trip})
        : res.status(409).send({message:'Hubo un error al crear el trip',error:err})
    });
});

app.get('/all/trip',(req,res)=>{
    Trip.find()
    .exec()
    .then(trip => res.status(200).send(trip))
    .catch(error => res.status(409).send(error))
});



app.listen(PORT,() => {
    console.log(`Server has been initialized on port:${PORT}`)
});


