// get the IP of the serverIP @ lan, if possible (Linux Server should work fine) avaible on http://server/getIP
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
    // connect to the server :)
    var socket = io.connect('http://'+getIP());
    // functions functions functions, simply to emit "events"
    var prev = function(){
        socket.emit('control', 'prev');
    }
    // dito
    var next = function(){ 
        socket.emit('control', 'next'); 
    }
    // jump to a chosen slide
    var jump = function(){
        socket.emit('control', 'jump '+ document.getElementById("jump").value );
    }
    // this is the "start the magic shit button" (:
    var init = function(){
        socket.emit('control', 'init');
    }
    // for debug the presentation (prrogramming or creating sliedes)...
    var reload = function(){
        socket.emit('control', 'reload');
        document.getElementById("jump").value = "1";
    }   
    // get the document notes back, it's a bit confusing but, better to recive the notes always, 'cause you must edit one file
    socket.on('slide', function(data){
        document.getElementById('slide').innerHTML = data;
        try{
            document.getElementById('slide').innerHTML = document.getElementsByClassName('note')[0].innerHTML;
        }
        catch(e){
            console.warn("No notes defined in step.");
        }
    });