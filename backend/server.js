const express = require('express');
const mongoose = require('mongoose');
const url = 'mongodb://localhost/AlonsChatDB'
const http = require('http');
const { Server } = require('socket.io')
const cors = require('cors')
const app = express()
app.use(cors());
app.use(express.json())
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
    },
});


io.on("connection", (socket) => {
    console.log(socket.id)
    //broadcast when a user connects
    socket.on("join-room", (room, user) => {
        socket.join(room)
        socket.to(room).emit('message', {
            user: 'ChatBot',
            room: room,
            message: `${user} has entered the chat`,
            time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes() + ":" + new Date(Date.now()).getSeconds(),
        })

        
        //runs when client dissconnects
        socket.on('disconnect', () => {
            console.log('disconnect')
            socket.to(room).emit('message',{
                user: 'ChatBot',
            room: room,
            message: `${user} has left the chat`,
            time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes() + ":" + new Date(Date.now()).getSeconds(),
            })
        })
    })

    socket.on('send-message', (data) => {
        socket.to(data.room).emit('message', data);
    })



})
//connect to mongo
mongoose.connect(url, { useNewUrlParser: true })
const con = mongoose.connection;

con.on('error', (error) => console.error(error))
//check connection
con.once('open', () => {
    console.log('connection succesful!')
})

const userRouter = require('./routes/users')
app.use('/users', userRouter)




//starting the server to listen
server.listen(3001, () => {
    console.log('Server Online')
})