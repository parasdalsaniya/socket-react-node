// IMPORT AND INITIALIZE EXPRESS
var express = require ('express');
const axios = require('axios');
const socketIo = require('socket.io');
var cors = require('cors')
var port = 9000;
var app = express();

app.use(cors())
app.options('*', cors());

// app.all('/*', function(req, res, next) {
//    res.header("Access-Control-Allow-Origin", "*");
//    res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
//    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//    next();
// });

const server = app.listen(port);

const io = require('socket.io')(server, { origins: '*:*'});

io.on('connection', (socket) =>{		
   axios.get('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson')

   .then(resp => resp.json())

   .then((json) => {
      socket.emit('latest_quakes', json);
   })
}); 

console.log(`Server listening in on port ${port}`);