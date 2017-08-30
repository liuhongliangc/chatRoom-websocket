var app = require('http').createServer();
var io = require('socket.io')(app);//通过socket.io模块把app包装成io的类型

var PORT=3000;
app.listen(PORT);
//用户计数
var clientCount=0;

io.on('connection',function (socket) {
    clientCount++;
    socket.nickname='user'+clientCount;
    io.emit('enter',socket.nickname+'进入聊天室');
    socket.on('message',function (str) {
        io.emit('message',socket.nickname+'say：'+str);
    });
    socket.on('disconnect',function () {
        io.emit('leave',socket.nickname+'离开聊天室');
    });

    
})

console.log('websocket server listening on port'+PORT);
