const calculator = require("module-basic-calculator");
const express = require("express");
const http = require("http");
const WebSocket = require("ws");

const app = express();

//Makes the client also accessible by getting the root path /
app.use(express.static("./client"));

//Initializes an Express orchestrated HTTP server
const server = http.createServer(app);

//Boot a websocker server instance from the http server
const wss = new WebSocket.Server({ server });

//Function responsible for handling the websocket connection
wss.on("connection", (ws) => {
    //Function that handles messages received by the server
    ws.on("message", (message) => {
        console.log("Message received: ", message);
        ws.send(ResolveEquation(message));
    });
});

//Initializes the server
server.listen(process.env.PORT || 9898, () => {
    console.log("Server connected to the port:", server.address().port);
})

//Solve the equation by calling the npm package developed in the practical activity 1
function ResolveEquation(message){

    var equation = message.split(" ");
    var isValid = IsValidEquation(equation);
    if(isValid != "OK")
        return isValid;
    else {
        switch(equation[1]){
            case "+":
                return calculator.add(equation[0], equation[2]);
            case "-":
                return calculator.sub(equation[0], equation[2]);
            case "*":
                return calculator.mul(equation[0], equation[2]);
            case "/":
                return calculator.div(equation[0], equation[2]);
            default:
                return "ERROR: Only accepts + (addition), - (subtraction), * (multiplication) and / (division) operators."
        }
    }

}

//Validates the equation received by message
function IsValidEquation(equation){
    if(equation.length < 3)
        return "ERROR: Use spaces to separate operators from operand.";
    else if(equation.length > 3)
        return "ERROR: Calculate only two operands.";
    else
        return "OK";  
}