const path = require('path');
const express = require('express');

const publicPath = path.join(__dirname, '/../public') ;

//console.log(__dirname + '/../public');
//console.log(publicPath);

const port = process.env.PORT || 3000;

var app = express();

// Middleware
app.use(express.static(publicPath));

app.get('/', (req, res) => {
    //res.send(publicPath + '/index.html');
    res.render('index.html');
})

app.listen(port, () => {
    console.log(`Started on port ${port}`);
});

module.exports = {app};