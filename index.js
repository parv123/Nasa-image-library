console.log("Listening to the port 3000...")
var express  = require('express')//var variable_name = require('package_name')
var app = express();
var cors = require('cors');
var request = require('request')
app.use(cors({origin:true}))
app.get('/',function(req,res)
{
    res.send("CONNECTED TO LOCAL HOST SERVER");//IMPLEMENTATION
})


app.get('/:location',(req,res,next) => {
    var options = {
        url: `https://images-api.nasa.gov/search?q=${req.params.location}`
        ,
        headers:{
            'User-Agent':'My web server',
            'content-type':'application/json'
        }
    }
    function callback(error, response, body){
       try{if(!error && response.statusCode === 200)
       {
           res.send(JSON.parse(body))
           return;
       }

       else if(response.statusCode === 404)
       {
           res.send({message:"your keyword is not appropriate"})
           return;
       }
       //console.log(response.coord.lon);
       res.status(response.statusCode).send(response)
 }
catch(err)
{
res.send("NOTHING FOUND.");
}      
    }
    request(options, callback);
})

app.listen(3000);
