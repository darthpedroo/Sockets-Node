const express = require('express')
const app = express()
const http = require('http')
const cors = require('cors')

app.use(cors())

const { Server } = require('socket.io')

const server = http.createServer(app)

const io = new Server(server, {
    cors:{
        origin:"*",
        methods: ['GET', 'POST']
    },

})

io.on("connection", (socket) => {

    socket.join(socket.id)


    socket.on("join_room", (roomCode) => {
        socket.join(roomCode)
    })

    socket.on("send_message", (data) => {
        console.log("ESTA ES DATA DOT ROOM: ", data.room)
        socket.to(data.room).emit("receive_message", data)
    })

    socket.on("send_cards", (userId) => {
        socket.to(userId).emit("test", "PUTOOOOOOOO")
    })

    
})

server.listen(3001, () =>{ 
    console.log("Server is running, yeahhhh ! ")
})