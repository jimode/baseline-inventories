var express = require('express');
var app = express();

app.set('port', process.env.PORT || 4000);
app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'));
// app.set('views', __dirname + 'views');

app.use(express.static('public')); //serves the index.html as the static file
// app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
   res.render('index', {title: 'Home'}); 
});

// app.get('/', function(req, res) {
//     res.render('default'); 
//  });

app.get('/yemi', function (req, res) {
    res.send('<h1>Hello Yemi<h1>');
});

app.get('/who/:name?', function (req, res) {
    var name = req.params.name;
    res.send(name + ' was here');
});

var server = app.listen(app.get('port'), function() {
    console.log('Listening on port ' + app.get('port'));
});