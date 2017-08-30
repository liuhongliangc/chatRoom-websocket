
var ws = require("nodejs-websocket");
var PORT= 3000;
//用户计数
var clientCount=0;


// Scream server example: "hi" -> "HI!!!"
var server = ws.createServer(function (conn) {
    console.log("New connection");
    clientCount++;
    conn.nickname='user'+clientCount;
    var mes={};
    mes.type="enter";
    mes.data=conn.nickname+'进入聊天室'
    //一个用户进入聊天室时广播所有客户端
    broadcast(JSON.stringify(mes));
    conn.on("text", function (str) {
        console.log("Received "+str);
        var mes={};
        mes.type="message";
        mes.data=str;
        //一个用户说的话广播所有客户端
        broadcast(JSON.stringify(mes));
    })
    conn.on("close", function (code, reason) {
        console.log("Connection closed");
        var mes={};
        mes.type="leave";
        mes.data=conn.nickname+'离开聊天室'
        //一个用户离开聊天室时广播所有客户端
        broadcast(JSON.stringify(mes));
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