const express  = require('express');

const app = express();

const PORT = 4532;


app.get('/',(request, response)=>{
    response.send({message:'Pingüino'})
});

app.get('/home',(request,response)=>{
    response.send({message:'Desde home'});
});

app.get('/user/z',(req,res)=>{
    const {parametro} = req.params

    res.send({message:`El usuario con el id:${parametro} fue buscado`})
});


app.get('/gato/search',(req,res)=>{
    const queries = req.query
    res.send({queries:queries})
});

app.listen(PORT,()=>{
    console.log(`Se ha inicializado el servidor en el puerto ${PORT}`)
});
