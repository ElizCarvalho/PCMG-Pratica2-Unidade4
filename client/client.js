window.onload = function(){

    var form = document.getElementById("message-form");
    var messageField = document.getElementById("message");
    var messagesList = document.getElementById("messages");
    var socketStatus = document.getElementById("status");
    var closeBtn = document.getElementById("close");

    var pathServerWS = "ws://localhost:9898"


    //Create a new Socket
    var socket = new WebSocket(pathServerWS);

    //Function to handle errors that may occur
    socket.onerror = function(error){
        console.log("WebSocket Error: " + error);
    };

    //Function called when connecting the client to the server
    socket.onopen = function(event){
        socketStatus.innerHTML = "Connected to the server: " + event.currentTarget.url;
        socketStatus.className = "open";
    };

    //Function called when connecting the client to the server
    socket.onmessage = function (event){
        var message = event.data;
        messagesList.innerHTML +=
            '<li class="received"><span>Received:</span>' + message + '</li>';
    };

    //Function called when disconnecting the server with the client
    socket.onclose = function(event){
        socketStatus.innerHTML = "Websocket disconnected.";
        socketStatus.className = "closed";
    };

    //Function that sends messages to the server through the websocket connection
    form.onsubmit = function(e){
        e.preventDefault();

        //Get the message typed in the message field on the form
        var message = messageField.value;

        //Send the message via the websocket
        socket.send(message);

        //Adds the message sent on the screen
        messagesList.innerHTML +=
            '<li class="sent"><span>Sent:</span>' + message + '</li>';

        //Clear the message field
        messageField.value = "";
        return false;
    };

    //Function that closes the websocket connection
    closeBtn.onclick = function(e){
        e.preventDefault();
        socket.close();
        return false;
    };
};