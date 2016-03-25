var express = require('express');
var app = express();

var config = require('./config_bartapi.js');

var bart = require('bay-area-rapid-transit');
var client = new bart(config.bart.client);

var bodyParser = require('body-parser');

var logger = require('morgan');
app.use(logger('dev')); // dev format (:method :url :status :response-time ms - :res[content-length])

/*
//app.use(favicon(__dirname + '/public/img/favicon.ico'));

app.set('views', path.join(__dirname,'views'));
app.set('view engine','jade');

var index = require('./routes/index');

app.use('/',index);
*/

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

//app.use(express.static(__dirname + 'public'));
app.use(express.static('public'));

app.get('/',function(req, res){
    console.log('get /');
    
    /*
    bart.advisories('station');
    
    bart.realTimeEstimates({
        'cmd':'etd','orig':'RICH'
    });
    */
    
    res.send( 'BART api website is running. \n BART API data = \n'  + JSON.stringify( bart.realTimeEstimates( {'cmd':'etd','orig':'RICH','key':config.bart.client} ) ) );
    
});

app.post('/post_this',function(req,res){
    res.send('BART api "post_this"');
});

app.delete('/delete_this',function(req,res){
    res.send('BART api "delete_this"');
});

app.put('/put_this',function(req,res){
    res.send('BART api "put_this"');
});

var server = app.listen(3000, function(){
    var host = server.address().address;
    var port = server.address().port;
    
    console.log("app.listen on port 3000, http://%s%s", host, port);
});