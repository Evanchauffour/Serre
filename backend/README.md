# Server Side

This directory contains the server side code for our Arduino-React application.

## Getting Started

To get started, you need to install the necessary dependencies. Run the following command in your terminal:

```bash
npm install
```

## Running the Server

To start the server, run the following command in your terminal:

```bash
npm start
```

The server will start running on `localhost` with the port specified in your `.env` file (default is 5000).

## Structure

The main file in this directory is `index.js`. This file sets up an Express server that communicates with both the Arduino and the React application.

## Communication

The server communicates with the Arduino through a serial connection. The specific port and baud rate used for this connection should be specified in your `.env` file.

The server communicates with the React application through a WebSocket connection. The server listens for connections on a specific path and broadcasts data received from the Arduino to all connected clients.

## Environment Variables

The server uses the following environment variables:

- `PORT`: The port the server listens on.
- `ARDUINO_PORT`: The port the Arduino is connected to.
- `ARDUINO_BAUD_RATE`: The baud rate for the serial connection with the Arduino.

These variables should be specified in a `.env` file in this directory.