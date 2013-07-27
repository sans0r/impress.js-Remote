// get the IP of the serverIP @ lan, if possible (Linux Server should work fine)
function getIP() {
    var xmlhttp = null;
    var serverIP;
    // Mozilla
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    }
    // IE
    else if (window.ActiveXObject) {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function(){
        serverIP = this.responseText;
    }
    xmlhttp.open("GET", 'getIP', true);
    xmlhttp.send(null);
    return serverIP;
}
// connect to the server with the own ip (localhost is also possible, but on this way it is modular :D)
var socket = io.connect('http://'+getIP());

// define input event reactions for 'control's
socket.on('control', function(data){
    switch(data){
        // in all sorted cases it's equals: do something and send the return to remotecontrol
        case 'init':
            impress().init();
            // needed because init() send no return from the first step
            socket.emit('slide', impress().goto(0).innerHTML);
            break;
        case 'next':
            socket.emit("slide", impress().next().innerHTML);
            break;
        case 'prev':
            socket.emit("slide", impress().prev().innerHTML);
            break;
        case 'reload':
            // clear clients notesfield
            socket.emit('slide', '');
            // pretty? :)
            window.location = "http://"+window.location.host;
            break;
        default:
            // for step jumps 
            if(data.substr(0,4) == "jump"){
                // remove 'jump' from the control string
                var jumpTarget = data.substr(5);
                socket.emit("slide", impress().goto(parseInt(jumpTarget)-1).innerHTML);
                break;
            }
            // DEBUG
            console.log('aehm...');
    }
});