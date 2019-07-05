const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const apiKey ='12da85c0f25967072f341fc82fbfbc54';

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.get('/', (req, res)=>{
    res.render('index');  
});


app.use(bodyParser.urlencoded({extended:true}));

app.post('/',(req, res)=>{
// res.render('index'); 
let city = req.body.city;
let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
request(url, function (err, response, body) {
  if(err){
    res.render('index', {weather: null, error: 'Error, please try again'});
  } else {
    let weather = JSON.parse(body)
    if(weather.main == undefined){
      res.render('index', {weather: null, error: 'Error, please try again'});
    } else {
      let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
      res.render('index', {weather: weatherText, error: null});
    }
}
  }); 
});
app.listen(port, ()=>{
console.log(`app is listening to port ${port}!`)
});