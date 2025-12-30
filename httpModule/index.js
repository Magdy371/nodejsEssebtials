const http = require('http');
const today = require('./today');
//Defime thr rquest listner function
const requestListner = function(req, res){
    res.writeHead(200);
    let dateVal = today.getDate(); // Get the current date from the 'today' module
    // Determine the appropriate greeting based on the current time
    let greeting = "It is still not morning";
    if (dateVal.getHours() > 6 && dateVal.getHours() < 12) {
        greeting = "Good morning!";
    } else if (dateVal.getHours() >= 12 && dateVal.getHours() < 18) {
        greeting = "Good afternoon!";
    } else if (dateVal.getHours() >= 18 && dateVal.getHours() < 21) {
        greeting = "Good evening!";
    } else if (dateVal.getHours() >= 21 && dateVal.getHours() < 24) {
        greeting = "Good night!";
    }
    // Send the response with the appropriate greeting
    res.end(`Hello, ${greeting}`);
}

//define port number
const port = 8080;

//create the http server
const server = http.createServer(requestListner);
server.listen(port);
console.log(`server listen on port ${port}`);