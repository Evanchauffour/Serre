const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');

const port = process.env.PORT || 4001;
const index = require('./routes/index');

const app = express();
app.use(index);

const server = http.createServer(app);

const io = socketIo(server);

const arduinoComPort = "/dev/ttyACM0"; // replace with your Arduino port
const arduinoSerialPort = new SerialPort(arduinoComPort, { baudRate: 9600 });
const parser = new Readline();
arduinoSerialPort.pipe(parser);

io.on("connection", socket => {
  console.log("New client connected");

  parser.on('data', data =>{
    console.log(data);
    socket.emit("FromAPI", data); 
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

server.listen(port, () => console.log(`Listening on port ${port}`));