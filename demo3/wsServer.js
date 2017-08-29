
var ws = require("nodejs-websocket");
var PORT= 3000;
var clientCount=0;
//用户计数

// Scream server example: "hi" -> "HI!!!"
var server = ws.createServer(function (conn) {
    console.log("New connection");
    clientCount++;
    conn.nickname='user'+clientCount;
    //一个用户进入聊天室时广播所有客户端
    broadcast(conn.nickname+'进入聊天室');
    conn.on("text", function (str) {
        console.log("Received "+str);
        //把一个用户说的话广播到所有客户端
        broadcast(conn.nickname+'say:'+str);
    })
    conn.on("close", function (code, reason) {
        console.log("Connection closed");
        broadcast(conn.nickname+'已经离开聊天室')
    })
    conn.on("error",function (err) {
        console.log("handle error");
        console.log(err);
    })
}).listen(PORT);
console.log('websocket server listening on port'+PORT);

//用于把信息发送到所有的客户端
function broadcast(str) {
    server.connections.forEach(function (connection) {
        connection.sendText(str);
    })
}