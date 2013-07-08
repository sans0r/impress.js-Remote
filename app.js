// init webserver
var app = require('http').createServer(serveStaticIndex).listen(8080);
// load socket.io
var io = require('socket.io').listen(app).set('log level', 2);
// require fs for deliver index.html and our impress.js files :)
var fs = require('fs');
// for network IP detection
var os = require('os');

// deliver all the files, i know not smart, but ok...
function serveStaticIndex(req, res) {
  console.log("GET " + req.url);
  switch(req.url){
    case "/":
      var fileStream = fs.createReadStream(__dirname + '/presi-files' + '/index.html');
      res.writeHead(200);
      fileStream.pipe(res);
      break;
    case "/remote":
      var fileStream = fs.createReadStream(__dirname + '/presi-files' + '/remote.html');
      res.writeHead(200);
      fileStream.pipe(res);
      break;
    case "/impress.js":
      var fileStream = fs.createReadStream(__dirname + '/files' + '/impress.js');
      res.writeHead(200);
      fileStream.pipe(res);
      break;
    case "/style.css":
      var fileStream = fs.createReadStream(__dirname + '/presi-files' + '/style.css');
      res.writeHead(200);
      fileStream.pipe(res);
      break;
    case "/mobile.css":
      var fileStream = fs.createReadStream(__dirname + '/presi-files' + '/mobile.css');
      res.writeHead(200);
      fileStream.pipe(res);
      break;
    case "/left.png":
      var fileStream = fs.createReadStream(__dirname + '/files' + '/left.png');
      res.writeHead(200);
      fileStream.pipe(res);
      break;
    case "/right.png":
      var fileStream = fs.createReadStream(__dirname + '/files' + '/right.png');
      res.writeHead(200);
      fileStream.pipe(res);
      break;
    case "/play.png":
      var fileStream = fs.createReadStream(__dirname + '/files' + '/play.png');
      res.writeHead(200);
      fileStream.pipe(res);
      break;
    case "/background.png":
      var fileStream = fs.createReadStream(__dirname + '/files' + '/background.png');
      res.writeHead(200);
      fileStream.pipe(res);
      break;
    case "/getIP":
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end(getlocalIP());
      break;
    default: 
    res.writeHead(404);
    res.end("Not found: "+req.url);
    };
};
 
// Get local IP
function getlocalIP(){
  var interfaces = os.networkInterfaces();
  var addresses = [];
  for (k in interfaces) {
      for (k2 in interfaces[k]) {
          var address = interfaces[k][k2];
          if (address.family == 'IPv4' && !address.internal) {
              addresses.push(address.address)
          }
      }
  }
  return addresses[0];
}

// Socket.io events
// simple: receive and broadcast...
io.sockets.on('connection', function (socket) {
  socket.on('control', function(data){
    if(data == "reload") {
      process.stdout.write('\u001B[2J\u001B[0;0f');
      setTimeout(function(){console.log("\n\n\n")}, 1000)
    }
    socket.broadcast.emit('control', data);
  });
  socket.on('slide', function(data){
    socket.broadcast.emit('slide', data);
  });
});

