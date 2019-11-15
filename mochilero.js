const mongoose = require('mongoose');

const URL_MONGO = "mongodb+srv://cyn2903:1234567.@cluster0-iqsf0.mongodb.net/test?retryWrites=true&w=majority"

mongoose.connect(URL_MONGO,{ useNewUrlParser:true },(err) => {
    if(!err){ 
        console.log('Conexión exitosa en MongoDB')
    }else{
        console.log(err)
    };
    
});

const Schema = mongoose.Schema;


const userSchema = new Schema({
    name:String,
    email:String,
    cel:Number,
    trip:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Trip'
        }
    ]
},{ timestamps:true });


const tripSchema = new Schema({
    origin:{
        type:String,
        enum:['Ciudad de México']
    },
    destiny:{
        type:String,
        enum:['Cuernavaca','Tepoztlán',"Querétaro","Pachuca","Teotihuacan","Puebla"]
    },
    cost:Number,
    starDate:Number,
    endDate:Number
},{ timestamps: true});

const User = mongoose.model( 'User', userSchema );

const Trip = mongoose.model( 'Trip', tripSchema);

module.exports = {
    User,
    Trip
}