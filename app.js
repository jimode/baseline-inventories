var express = require('express');
var app = express();

app.set('view engine', 'ejs');
app.set('views', __dirname + '/src/views');
// app.use(express.static('src')); //serves the index.html as the static file

app.get('/', function(req, res) {
   res.render('default', {title: 'Home'}); 
});

// app.get('/', function(req, res) {
//     res.render('default'); 
//  });

app.get('/yemi', function (req, res) {
    res.send('<h1>Hello Yemi<h1>')
});

app.get('/who/:name?', function (req, res) {
    var name = req.params.name;
    res.send(name + ' was here')
});

var server = app.listen(3001, function() {
    console.log('Listening on port 3001');
});