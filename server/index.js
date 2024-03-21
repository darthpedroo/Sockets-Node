const express = require('express')
const app = express()
const http = require('http')
const cors = require('cors')

app.use(cors())
const trucoDeck = [
    // Espadas (Swords)
    "1 de Espadas", "2 de Espadas", "3 de Espadas", "4 de Espadas", "5 de Espadas",
    "6 de Espadas", "7 de Espadas", "10 de Espadas", "11 de Espadas", "12 de Espadas",
    // Oros (Gold)
    "1 de Oros", "2 de Oros", "3 de Oros", "4 de Oros", "5 de Oros",
    "6 de Oros", "7 de Oros", "10 de Oros", "11 de Oros", "12 de Oros",
    // Copas (Cups)
    "1 de Copas", "2 de Copas", "3 de Copas", "4 de Copas", "5 de Copas",
    "6 de Copas", "7 de Copas", "10 de Copas", "11 de Copas", "12 de Copas",
    // Bastos (Clubs)
    "1 de Bastos", "2 de Bastos", "3 de Bastos", "4 de Bastos", "5 de Bastos",
    "6 de Bastos", "7 de Bastos", "10 de Bastos", "11 de Bastos", "12 de Bastos"
];

const { Server } = require('socket.io')

const server = http.createServer(app)

const io = new Server(server, {
    cors:{
        origin:"*",
        methods: ['GET', 'POST']
    },

})

const handleCards = () => {
    // Initialize an array to hold the player's cards
    const playerCards = [];

    // Generate three random cards for the player
    for (let i = 0; i < 3; i++) {
        const randomIndex = Math.floor(Math.random() * trucoDeck.length);
        const randomCard = trucoDeck[randomIndex]; // Copy the card from the deck without removing it
        playerCards.push(randomCard); // Add the card to the player's hand
    }

    // Return the player's cards
    return playerCards;
};


io.on("connection", (socket) => {

    //socket.join(socket.id)
    console.log("EL PAPU: ", handleCards())
    //console.log("booot")
    socket.emit("initial_cards", handleCards());


    socket.on("join_room", (roomCode) => {
        console.log("JOINED:3", roomCode)
        socket.join(roomCode)
    })

    socket.on("send_message", (data) => {
        console.log("ESTA ES DATA DOT ROOM: ", data.room)
        socket.to(data.room).emit("receive_message", data)
    })

    socket.on("send_cards", (userId) => {
        console.log("HOLII: ", userId)
        socket.to(userId).emit("test", ["7 DE ESPADA ","10 DE ORO", "3 DE COPA"])
    })

})

server.listen(3001, () =>{ 
    console.log("Server is running, yeahhhh ! ")
})