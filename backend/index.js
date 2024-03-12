// server.js
const express = require('express');
const http = require('http');
const { Server } = require("socket.io");

const app = express();
const cors = require('cors');
const server = http.createServer(app);


const mqtt = require('mqtt');


const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  }
});


const protocol = 'mqtt'
const host = 'eu1.cloud.thethings.network'
const port = '1883'
const clientId = `mqtt_${Math.random().toString(16).slice(3)}`

const connectUrl = `${protocol}://${host}:${port}`

const topicUp = 'v3/aquarium-mmi@ttn/devices/eui-70b3d57ed0063101/up'
const topicDown = 'v3/aquarium-mmi@ttn/devices/eui-70b3d57ed0063101/down/push'

let dataValue = '';

// Création du client MQTT
const client = mqtt.connect(connectUrl, {
  clientId,
  clean: true,
  connectTimeout: 4000,
  username: 'aquarium-mmi@ttn',
  password: 'NNSXS.4FVXSSMEICRRIWYA2M43N7YB5NMKXCMVGW3JFUQ.BYLR3LGE7437GPDNLSJNZ34IYHGAXJRUNGOBEKGSFJ5IBK72VGBQ',
  reconnectPeriod: 1000,
})


io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected')
  })

  socket.on('publish', (data) => {
    client.publish(topicDown, `{"downlinks": [{"f_port": 15, "frm_payload":"${data}", "priority": "NORMAL"}]}`, () => {
      console.log(`Publish to topic '${topicDown}': ${data}`);
    });
  });

  socket.on('publishPompe1', (data) => {
    client.publish(topicDown, `{"downlinks": [{"f_port": 15, "frm_payload":"${data}", "priority": "NORMAL"}]}`, () => {
      console.log(`Publish to topic '${topicDown}': ${data}`);
    });
  });
})



client.on('connect', () => {
  console.log('Connected');
  client.subscribe([topicUp], () => {
    console.log(`Subscribe to topic '${topicUp}'`)
  })
})

client.on('error', (error) => {
  console.error('Erreur de connexion :', error);
});
  
client.on('message', (topic, payload) => {
  const data = JSON.parse(payload.toString()).uplink_message.decoded_payload.bytes;
  dataValue = String.fromCharCode(...data);
  console.log(data);

  io.emit('data', data);
})

client.on('reconnect', () => {
  console.log('Reconnecting...');
});

client.on('offline', () => {
  console.log('Client offline');
});


app.get('/', (req, res) => {
  res.send('Hello World!');
});

server.listen(4000, () => {
  console.log('Serveur Socket.io écoutant sur le port 4000');
});
